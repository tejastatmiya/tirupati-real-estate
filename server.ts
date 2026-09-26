import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadConfig, saveConfig } from './server/config.js';
import {
  initDb,
  getAvailability,
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  rescheduleAppointment,
  deleteAppointment,
  updateNotificationStatus,
} from './server/db.js';
import { notifyAllChannels, formatWhatsAppMessage } from './server/notifications.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

// Initialize data store
initDb();

app.use(express.json());

// API Routes
app.get('/api/config', (req, res) => {
  const config = loadConfig();
  res.json({
    success: true,
    data: config,
  });
});

app.put('/api/config', (req, res) => {
  try {
    const updated = saveConfig(req.body);
    res.json({
      success: true,
      data: updated,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/availability', (req, res) => {
  const { date } = req.query;
  if (!date || typeof date !== 'string') {
    return res.status(400).json({ success: false, error: 'Query parameter date (YYYY-MM-DD) is required.' });
  }

  const result = getAvailability(date);
  res.json({
    success: true,
    data: result,
  });
});

app.post('/api/appointments', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      preferredContactMethod,
      appointmentType,
      requirementType,
      propertyType,
      budget,
      customBudget,
      preferredLocation,
      specificRequirements,
      customNotes,
      bedrooms,
      plotSize,
      commercialType,
      propertyId,
      propertyName,
      interestedInProperty,
      date,
      time,
    } = req.body;

    // Validate mandatory fields
    if (!fullName || !phone || !appointmentType || !requirementType || !date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, phone, appointmentType, requirementType, date, and time are required.',
      });
    }

    // Phone validation
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit mobile number.',
      });
    }

    // Create appointment atomically with race-condition prevention
    const appointment = await createAppointment({
      fullName,
      phone: cleanPhone,
      email,
      preferredContactMethod,
      appointmentType,
      requirementType,
      propertyType: propertyType || 'General Property',
      budget: budget || 'Not specified',
      customBudget,
      preferredLocation: preferredLocation || 'Junagadh',
      specificRequirements,
      customNotes,
      bedrooms,
      plotSize,
      commercialType,
      propertyId,
      propertyName,
      interestedInProperty,
      date,
      time,
    });

    const config = loadConfig();

    // Trigger notifications in background without failing booking if notification service has issues
    notifyAllChannels(appointment, config)
      .then((notifResult) => {
        updateNotificationStatus(appointment.id, {
          emailStatus: notifResult.emailStatus,
          whatsappStatus: notifResult.whatsappStatus,
        });
      })
      .catch((err) => {
        console.error('Background notification dispatch error:', err);
      });

    // Provide pre-formatted WhatsApp link for customer instant confirmation
    const waText = formatWhatsAppMessage(appointment);
    const cleanAdminNum = config.adminWhatsApp.replace(/[^0-9]/g, '');
    const adminNumWithCountry = cleanAdminNum.startsWith('91') ? cleanAdminNum : `91${cleanAdminNum}`;
    const waUrl = `https://wa.me/${adminNumWithCountry}?text=${encodeURIComponent(waText)}`;

    res.status(201).json({
      success: true,
      message: 'Appointment request successfully created.',
      data: appointment,
      whatsAppShareUrl: waUrl,
    });
  } catch (err: any) {
    console.error('Appointment creation error:', err.message);
    const statusCode = err.message.includes('just booked') || err.message.includes('not available') ? 409 : 400;
    res.status(statusCode).json({
      success: false,
      error: err.message,
    });
  }
});

app.get('/api/appointments', (req, res) => {
  const { search, status, requirement, appointmentType, date } = req.query;
  const list = getAppointments({
    search: typeof search === 'string' ? search : undefined,
    status: typeof status === 'string' ? status : undefined,
    requirement: typeof requirement === 'string' ? requirement : undefined,
    appointmentType: typeof appointmentType === 'string' ? appointmentType : undefined,
    date: typeof date === 'string' ? date : undefined,
  });

  res.json({
    success: true,
    data: list,
  });
});

app.get('/api/stats', (req, res) => {
  const all = getAppointments({});
  const todayStr = new Date().toISOString().split('T')[0];

  const stats = {
    totalLeads: all.length,
    todayAppointments: all.filter((a) => a.date === todayStr && a.status !== 'CANCELLED').length,
    upcomingAppointments: all.filter((a) => a.date > todayStr && a.status !== 'CANCELLED').length,
    pendingLeads: all.filter((a) => a.status === 'PENDING').length,
    confirmedAppointments: all.filter((a) => a.status === 'CONFIRMED').length,
    cancelledAppointments: all.filter((a) => a.status === 'CANCELLED').length,
  };

  res.json({
    success: true,
    data: stats,
  });
});

app.get('/api/appointments/:id', (req, res) => {
  const appointment = getAppointmentById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ success: false, error: 'Appointment not found' });
  }
  res.json({ success: true, data: appointment });
});

app.patch('/api/appointments/:id/status', (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }
    const updated = updateAppointmentStatus(req.params.id, status, adminNotes);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/appointments/:id/reschedule', async (req, res) => {
  try {
    const { date, time } = req.body;
    if (!date || !time) {
      return res.status(400).json({ success: false, error: 'New date and time are required' });
    }
    const updated = await rescheduleAppointment(req.params.id, date, time);
    res.json({
      success: true,
      message: 'Appointment successfully rescheduled. Old time slot released.',
      data: updated,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete('/api/appointments/:id', (req, res) => {
  const success = deleteAppointment(req.params.id);
  if (!success) {
    return res.status(404).json({ success: false, error: 'Appointment not found' });
  }
  res.json({ success: true, message: 'Appointment deleted and slot released.' });
});

// Setup dev server with Vite middleware or static prod serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TIRUPATI REAL ESTATE Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
