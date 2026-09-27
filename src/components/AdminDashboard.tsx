import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  RotateCcw,
  Check,
  AlertCircle,
  Building2,
  Trash2,
  Settings,
  Lock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  RefreshCw,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/config';

interface AppointmentRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredContactMethod?: string;
  appointmentType: 'PROPERTY_VISIT' | 'MEETING_CONSULTATION';
  requirementType: 'BUY' | 'RENT' | 'SELL' | 'INVESTMENT' | 'PROPERTY_CONSULTATION';
  propertyType: string;
  budget: string;
  customBudget?: string;
  preferredLocation: string;
  specificRequirements?: string;
  customNotes?: string;
  bedrooms?: string;
  plotSize?: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  emailNotificationStatus?: 'sent' | 'failed' | 'not_configured';
  whatsappNotificationStatus?: 'sent' | 'failed' | 'not_configured';
  adminNotes?: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  // Authentication gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Active view: 'LEADS' | 'CALENDAR' | 'SETTINGS'
  const [activeTab, setActiveTab] = useState<'LEADS' | 'CALENDAR' | 'SETTINGS'>('LEADS');

  // Appointments data
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalLeads: 0,
    todayAppointments: 0,
    upcomingAppointments: 0,
    pendingLeads: 0,
    confirmedAppointments: 0,
    cancelledAppointments: 0,
  });

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [requirementFilter, setRequirementFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  // Detail Modal
  const [selectedLead, setSelectedLead] = useState<AppointmentRecord | null>(null);

  // Reschedule Modal
  const [rescheduleLead, setRescheduleLead] = useState<AppointmentRecord | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState<string>('');
  const [newRescheduleTime, setNewRescheduleTime] = useState<string>('');
  const [rescheduleSlots, setRescheduleSlots] = useState<{ time: string; status: 'available' | 'booked' }[]>([]);
  const [rescheduleLoading, setRescheduleLoading] = useState<boolean>(false);
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  // Configuration Form State
  const [configState, setConfigState] = useState<any>(null);
  const [configSavedNotice, setConfigSavedNotice] = useState<boolean>(false);

  // Calendar View month state
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date());

  // Load Data
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes, configRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/stats'),
        fetch('/api/config'),
      ]);
      const leadsData = await leadsRes.json();
      const statsData = await statsRes.json();
      const configData = await configRes.json();

      if (leadsData.success) setAppointments(leadsData.data);
      if (statsData.success) setStats(statsData.data);
      if (configData.success) setConfigState(configData.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchAppointments();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // Handle PIN Unlock
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.trim() === 'tirupati2026' || pinCode.trim() === '6356548117') {
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('Invalid passcode. (Hint: tirupati2026)');
    }
  };

  // Status Update Handler
  const handleUpdateStatus = async (id: string, status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') => {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAppointments();
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Delete Handler
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment? The booked time slot will be released.')) {
      return;
    }
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSelectedLead(null);
        fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to delete appointment:', err);
    }
  };

  // Open Reschedule Modal
  const openRescheduleModal = (lead: AppointmentRecord) => {
    setRescheduleLead(lead);
    setNewRescheduleDate(lead.date);
    setNewRescheduleTime(lead.time);
    setRescheduleError(null);
    // Fetch slots
    fetchSlotsForDate(lead.date);
  };

  const fetchSlotsForDate = (date: string) => {
    setRescheduleLoading(true);
    fetch(`/api/availability?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        setRescheduleLoading(false);
        if (data.success && data.data) {
          setRescheduleSlots(data.data.slots || []);
        }
      })
      .catch(() => setRescheduleLoading(false));
  };

  // Handle Reschedule Submit
  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleLead || !newRescheduleDate || !newRescheduleTime) return;

    setRescheduleLoading(true);
    setRescheduleError(null);

    try {
      const res = await fetch(`/api/appointments/${rescheduleLead.id}/reschedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newRescheduleDate,
          time: newRescheduleTime,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to reschedule.');
      }
      setRescheduleLead(null);
      fetchAppointments();
    } catch (err: any) {
      setRescheduleError(err.message);
    } finally {
      setRescheduleLoading(false);
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    if (statusFilter !== 'ALL' && apt.status !== statusFilter) return false;
    if (requirementFilter !== 'ALL' && apt.requirementType !== requirementFilter) return false;
    if (typeFilter !== 'ALL' && apt.appointmentType !== typeFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        apt.fullName.toLowerCase().includes(q) ||
        apt.phone.includes(q) ||
        (apt.email && apt.email.toLowerCase().includes(q)) ||
        apt.preferredLocation.toLowerCase().includes(q) ||
        apt.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F6] w-full max-w-7xl rounded-2xl border border-[#DDD8CC] shadow-2xl overflow-hidden flex flex-col min-h-[85vh] max-h-[92vh]">
        {/* Modal Top Header Bar */}
        <div className="bg-[#11110F] text-[#FAF9F6] px-6 py-4 flex items-center justify-between border-b border-[#B89A5A]/40 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B89A5A]" />
            <div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold tracking-wider">
                TIRUPATI REAL ESTATE — ADMIN PORTAL
              </h2>
              <p className="text-[10px] text-[#B89A5A] uppercase tracking-widest">
                Lead Management & Appointment Scheduling Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={fetchAppointments}
                disabled={loading}
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-[#DDD8CC] transition-colors"
                title="Refresh leads and slots"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------
            PIN AUTHENTICATION SCREEN
        ---------------------------------------------------- */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#FAF9F6]">
            <form onSubmit={handleUnlock} className="bg-[#F4F1EA] border border-[#DDD8CC] p-8 rounded-2xl max-w-md w-full text-center space-y-5 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-[#11110F] text-[#B89A5A] flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#11110F]">
                  Admin Passcode Required
                </h3>
                <p className="text-xs text-[#6D6A63] mt-1">
                  Enter authorized administrator key to access Junagadh leads and appointments.
                </p>
              </div>

              <div>
                <input
                  type="password"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="Enter Passcode..."
                  className="w-full bg-[#FAF9F6] text-center text-sm font-mono tracking-widest py-3 px-4 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A]"
                  autoFocus
                />
                {pinError && <p className="text-xs text-red-600 mt-2">{pinError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer"
              >
                Unlock Dashboard
              </button>
              <p className="text-[11px] text-[#6D6A63]">Default Key: <code className="bg-[#DDD8CC]/50 px-1 py-0.5 rounded">tirupati2026</code></p>
            </form>
          </div>
        ) : (
          /* ----------------------------------------------------
              AUTHENTICATED ADMIN WORKSPACE
          ---------------------------------------------------- */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#FAF9F6]">
            {/* KPI Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-4 bg-[#F4F1EA] border-b border-[#DDD8CC] shrink-0">
              <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#DDD8CC]">
                <span className="text-[10px] uppercase font-bold text-[#6D6A63] block">Total Leads</span>
                <span className="font-editorial text-2xl font-bold text-[#11110F]">{stats.totalLeads}</span>
              </div>
              <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#DDD8CC]">
                <span className="text-[10px] uppercase font-bold text-[#6D6A63] block">Today's Visits</span>
                <span className="font-editorial text-2xl font-bold text-[#8D713C]">{stats.todayAppointments}</span>
              </div>
              <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#DDD8CC]">
                <span className="text-[10px] uppercase font-bold text-[#6D6A63] block">Upcoming</span>
                <span className="font-editorial text-2xl font-bold text-[#11110F]">{stats.upcomingAppointments}</span>
              </div>
              <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#DDD8CC]">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Pending</span>
                <span className="font-editorial text-2xl font-bold text-amber-600">{stats.pendingLeads}</span>
              </div>
              <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#DDD8CC]">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Confirmed</span>
                <span className="font-editorial text-2xl font-bold text-emerald-600">{stats.confirmedAppointments}</span>
              </div>
              <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#DDD8CC]">
                <span className="text-[10px] uppercase font-bold text-red-700 block">Cancelled</span>
                <span className="font-editorial text-2xl font-bold text-red-600">{stats.cancelledAppointments}</span>
              </div>
            </div>

            {/* Navigation Tabs (Leads, Calendar, Settings) */}
            <div className="px-6 py-3 border-b border-[#DDD8CC] flex items-center justify-between shrink-0 bg-[#FAF9F6]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('LEADS')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'LEADS'
                      ? 'bg-[#11110F] text-white shadow-sm'
                      : 'bg-[#F4F1EA] text-[#6D6A63] hover:text-[#11110F]'
                  }`}
                >
                  All Leads ({appointments.length})
                </button>

                <button
                  onClick={() => setActiveTab('CALENDAR')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'CALENDAR'
                      ? 'bg-[#11110F] text-white shadow-sm'
                      : 'bg-[#F4F1EA] text-[#6D6A63] hover:text-[#11110F]'
                  }`}
                >
                  Calendar Schedule
                </button>

                <button
                  onClick={() => setActiveTab('SETTINGS')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'SETTINGS'
                      ? 'bg-[#11110F] text-white shadow-sm'
                      : 'bg-[#F4F1EA] text-[#6D6A63] hover:text-[#11110F]'
                  }`}
                >
                  Business Config
                </button>
              </div>

              {/* Admin Notification Status Pill */}
              <div className="hidden md:flex items-center gap-2 text-xs text-[#6D6A63]">
                <span>Admin Alerts:</span>
                <span className="font-mono text-[#11110F]">tejastatmiya19@gmail.com</span>
                <span>•</span>
                <span className="font-mono text-[#25D366] font-semibold">+91 63565 48117</span>
              </div>
            </div>

            {/* ----------------------------------------------------
                TAB 1: LEADS TABLE & FILTER CONTROLS
            ---------------------------------------------------- */}
            {activeTab === 'LEADS' && (
              <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6 space-y-4">
                {/* Search & Filter Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F4F1EA] p-3 rounded-xl border border-[#DDD8CC]">
                  <div className="flex items-center gap-2 flex-1 min-w-[220px]">
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search name, phone, area, reference ID..."
                        className="w-full bg-[#FAF9F6] text-xs py-2 px-3 pl-8 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A]"
                      />
                      <Search className="w-3.5 h-3.5 text-[#8D713C] absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-[#FAF9F6] text-xs py-1.5 px-2.5 rounded-lg border border-[#DDD8CC] focus:outline-none"
                    >
                      <option value="ALL">Status: All</option>
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>

                    {/* Requirement Filter */}
                    <select
                      value={requirementFilter}
                      onChange={(e) => setRequirementFilter(e.target.value)}
                      className="bg-[#FAF9F6] text-xs py-1.5 px-2.5 rounded-lg border border-[#DDD8CC] focus:outline-none"
                    >
                      <option value="ALL">Req: All</option>
                      <option value="BUY">Buy</option>
                      <option value="RENT">Rent</option>
                      <option value="SELL">Sell</option>
                      <option value="INVESTMENT">Investment</option>
                      <option value="PROPERTY_CONSULTATION">Consultation</option>
                    </select>

                    {/* Type Filter */}
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="bg-[#FAF9F6] text-xs py-1.5 px-2.5 rounded-lg border border-[#DDD8CC] focus:outline-none"
                    >
                      <option value="ALL">Mode: All</option>
                      <option value="PROPERTY_VISIT">Property Visit</option>
                      <option value="MEETING_CONSULTATION">Meeting</option>
                    </select>
                  </div>
                </div>

                {/* Table Container */}
                <div className="flex-1 overflow-auto rounded-xl border border-[#DDD8CC] bg-[#FAF9F6]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#11110F] text-[#FAF9F6] uppercase text-[10px] tracking-wider sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-3.5">Customer & Phone</th>
                        <th className="py-3 px-3.5">Requirement</th>
                        <th className="py-3 px-3.5">Type & Area</th>
                        <th className="py-3 px-3.5">Schedule</th>
                        <th className="py-3 px-3.5">Status</th>
                        <th className="py-3 px-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDD8CC]/70">
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((lead) => (
                          <tr key={lead.id} className="hover:bg-[#F4F1EA]/70 transition-colors">
                            <td className="py-3 px-3.5">
                              <p className="font-semibold text-[#11110F] text-xs sm:text-sm">{lead.fullName}</p>
                              <a
                                href={`tel:${lead.phone}`}
                                className="text-[#8D713C] hover:underline font-mono text-[11px]"
                              >
                                {lead.phone}
                              </a>
                              {lead.email && <p className="text-[10px] text-[#6D6A63] truncate">{lead.email}</p>}
                            </td>

                            <td className="py-3 px-3.5">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F4F1EA] text-[#8D713C] border border-[#DDD8CC]">
                                {lead.requirementType}
                              </span>
                              <p className="text-[11px] text-[#6D6A63] mt-0.5 font-medium">{lead.budget}</p>
                            </td>

                            <td className="py-3 px-3.5">
                              <p className="font-medium text-[#11110F]">{lead.propertyType}</p>
                              <p className="text-[11px] text-[#6D6A63] flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#8D713C]" />
                                {lead.preferredLocation}
                              </p>
                            </td>

                            <td className="py-3 px-3.5">
                              <p className="font-semibold text-[#11110F] flex items-center gap-1">
                                <CalendarIcon className="w-3 h-3 text-[#8D713C]" />
                                {lead.date}
                              </p>
                              <p className="text-[11px] text-[#8D713C] font-mono">{lead.time}</p>
                              <span className="text-[9px] uppercase tracking-wider text-[#6D6A63]">
                                {lead.appointmentType === 'PROPERTY_VISIT' ? 'Site Visit' : 'Consultation'}
                              </span>
                            </td>

                            <td className="py-3 px-3.5">
                              <span
                                className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  lead.status === 'CONFIRMED'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : lead.status === 'PENDING'
                                    ? 'bg-amber-100 text-amber-800'
                                    : lead.status === 'COMPLETED'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {lead.status}
                              </span>
                            </td>

                            <td className="py-3 px-3.5 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="px-2.5 py-1 rounded bg-[#F4F1EA] text-[#11110F] border border-[#DDD8CC] hover:bg-[#11110F] hover:text-white transition-colors"
                              >
                                View
                              </button>

                              {lead.status === 'PENDING' && (
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'CONFIRMED')}
                                  className="px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                                  title="Confirm Appointment"
                                >
                                  Confirm
                                </button>
                              )}

                              {lead.status !== 'CANCELLED' && (
                                <>
                                  <button
                                    onClick={() => openRescheduleModal(lead)}
                                    className="px-2 py-1 rounded bg-[#B89A5A] text-white hover:bg-[#8D713C] transition-colors"
                                    title="Reschedule Slot"
                                  >
                                    Reschedule
                                  </button>
                                  <button
                                    onClick={() => handleUpdateStatus(lead.id, 'CANCELLED')}
                                    className="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                    title="Cancel & Release Slot"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-[#6D6A63]">
                            No matching appointments or leads found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------
                TAB 2: CALENDAR SCHEDULE VIEW
            ---------------------------------------------------- */}
            {activeTab === 'CALENDAR' && (
              <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between bg-[#F4F1EA] p-4 rounded-xl border border-[#DDD8CC]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const d = new Date(currentCalendarDate);
                        d.setMonth(d.getMonth() - 1);
                        setCurrentCalendarDate(d);
                      }}
                      className="p-1.5 rounded bg-[#FAF9F6] border border-[#DDD8CC] hover:bg-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <h3 className="font-editorial text-xl font-bold text-[#11110F]">
                      {currentCalendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button
                      onClick={() => {
                        const d = new Date(currentCalendarDate);
                        d.setMonth(d.getMonth() + 1);
                        setCurrentCalendarDate(d);
                      }}
                      className="p-1.5 rounded bg-[#FAF9F6] border border-[#DDD8CC] hover:bg-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Confirmed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Cancelled
                    </span>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-bold text-xs uppercase tracking-wider py-2 text-[#6D6A63]">
                      {day}
                    </div>
                  ))}

                  {/* Generate 35 calendar cells */}
                  {Array.from({ length: 35 }).map((_, idx) => {
                    const startOfMonth = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1);
                    const dayOffset = startOfMonth.getDay();
                    const dayNum = idx - dayOffset + 1;
                    const dateObj = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), dayNum);
                    const isCurrentMonth = dateObj.getMonth() === currentCalendarDate.getMonth();
                    const dateStr = dateObj.toISOString().split('T')[0];

                    const daysAppointments = appointments.filter((a) => a.date === dateStr);

                    return (
                      <div
                        key={idx}
                        className={`min-h-[110px] p-2 rounded-xl border flex flex-col justify-between transition-colors ${
                          isCurrentMonth
                            ? 'bg-[#FAF9F6] border-[#DDD8CC]'
                            : 'bg-[#DDD8CC]/15 border-[#DDD8CC]/40 opacity-40'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className={isCurrentMonth ? 'text-[#11110F]' : 'text-[#6D6A63]'}>
                            {dayNum > 0 ? dateObj.getDate() : ''}
                          </span>
                          {daysAppointments.length > 0 && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#11110F] text-white">
                              {daysAppointments.length}
                            </span>
                          )}
                        </div>

                        {/* List of appointments on this day */}
                        <div className="space-y-1 my-1 overflow-y-auto max-h-[70px]">
                          {daysAppointments.map((apt) => (
                            <div
                              key={apt.id}
                              onClick={() => setSelectedLead(apt)}
                              className={`text-[10px] p-1 rounded font-medium truncate cursor-pointer transition-transform hover:scale-105 ${
                                apt.status === 'CONFIRMED'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                  : apt.status === 'PENDING'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : apt.status === 'COMPLETED'
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                              title={`${apt.time} - ${apt.fullName} (${apt.propertyType})`}
                            >
                              <strong>{apt.time}</strong> {apt.fullName}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------
                TAB 3: BUSINESS SETTINGS & SCHEDULE CONFIGURATION
            ---------------------------------------------------- */}
            {activeTab === 'SETTINGS' && configState && (
              <div className="flex-1 overflow-auto p-4 sm:p-6 max-w-3xl space-y-6">
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-[#11110F]">
                    Business Scheduling & Admin Configuration
                  </h3>
                  <p className="text-xs text-[#6D6A63] mt-1">
                    Control appointment slots, admin alert targets, and working days without touching code.
                  </p>
                </div>

                {configSavedNotice && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    Configuration successfully updated and active.
                  </div>
                )}

                <div className="space-y-4 bg-[#F4F1EA] p-5 rounded-xl border border-[#DDD8CC] text-xs">
                  <div>
                    <label className="block uppercase font-bold text-[#11110F] mb-1">
                      Admin Email (Lead Notifications Target)
                    </label>
                    <input
                      type="email"
                      value={configState.adminEmail}
                      onChange={(e) => setConfigState({ ...configState, adminEmail: e.target.value })}
                      className="w-full bg-[#FAF9F6] p-2.5 rounded-lg border border-[#DDD8CC] font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-[#11110F] mb-1">
                      Admin WhatsApp Number (Lead Notifications Target)
                    </label>
                    <input
                      type="text"
                      value={configState.adminWhatsApp}
                      onChange={(e) => setConfigState({ ...configState, adminWhatsApp: e.target.value })}
                      className="w-full bg-[#FAF9F6] p-2.5 rounded-lg border border-[#DDD8CC] font-mono text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-bold text-[#11110F] mb-1">
                        Opening Time
                      </label>
                      <input
                        type="text"
                        value={configState.openingTime}
                        onChange={(e) => setConfigState({ ...configState, openingTime: e.target.value })}
                        className="w-full bg-[#FAF9F6] p-2.5 rounded-lg border border-[#DDD8CC]"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-bold text-[#11110F] mb-1">
                        Closing Time
                      </label>
                      <input
                        type="text"
                        value={configState.closingTime}
                        onChange={(e) => setConfigState({ ...configState, closingTime: e.target.value })}
                        className="w-full bg-[#FAF9F6] p-2.5 rounded-lg border border-[#DDD8CC]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-[#11110F] mb-1">
                      Standard Appointment Slots (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={configState.slots.join(', ')}
                      onChange={(e) =>
                        setConfigState({
                          ...configState,
                          slots: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                      className="w-full bg-[#FAF9F6] p-2.5 rounded-lg border border-[#DDD8CC] font-mono text-xs"
                    />
                  </div>

                  <button
                    onClick={async () => {
                      const res = await fetch('/api/config', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(configState),
                      });
                      if (res.ok) {
                        setConfigSavedNotice(true);
                        setTimeout(() => setConfigSavedNotice(false), 3000);
                      }
                    }}
                    className="px-6 py-2.5 rounded-md bg-[#11110F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------
            LEAD DETAIL MODAL
        ---------------------------------------------------- */}
        {selectedLead && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF9F6] border border-[#DDD8CC] rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5">
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F4F1EA]"
              >
                <X className="w-5 h-5 text-[#6D6A63]" />
              </button>

              <div className="border-b border-[#DDD8CC] pb-3">
                <span className="text-[10px] font-mono text-[#8D713C] uppercase tracking-wider">
                  Lead Ref: {selectedLead.id}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#11110F]">
                  {selectedLead.fullName}
                </h3>
                <p className="text-xs text-[#6D6A63]">
                  Submitted on {new Date(selectedLead.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-[#171717]">
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1.5">
                  <span className="text-[#6D6A63]">Phone:</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-bold font-mono text-[#11110F]">
                    {selectedLead.phone}
                  </a>
                </div>
                {selectedLead.preferredContactMethod && (
                  <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1.5">
                    <span className="text-[#6D6A63]">Preferred Contact:</span>
                    <span className="font-semibold text-[#8D713C]">{selectedLead.preferredContactMethod}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1.5">
                  <span className="text-[#6D6A63]">Email:</span>
                  <span>{selectedLead.email || 'None'}</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1.5">
                  <span className="text-[#6D6A63]">Mode:</span>
                  <span className="font-bold">
                    {selectedLead.appointmentType === 'PROPERTY_VISIT' ? 'Property Visit' : 'Consultation'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1.5">
                  <span className="text-[#6D6A63]">Schedule:</span>
                  <span className="font-bold text-[#8D713C]">
                    {selectedLead.date} at {selectedLead.time}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1.5">
                  <span className="text-[#6D6A63]">Requirement & Property:</span>
                  <span>{selectedLead.requirementType} — {selectedLead.propertyType}</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1.5">
                  <span className="text-[#6D6A63]">Budget:</span>
                  <span>{selectedLead.budget}</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1.5">
                  <span className="text-[#6D6A63]">Area:</span>
                  <span>{selectedLead.preferredLocation}</span>
                </div>
                <div>
                  <span className="text-[#6D6A63] block mb-1">Customer Notes:</span>
                  <p className="bg-[#F4F1EA] p-3 rounded-lg border border-[#DDD8CC] italic text-[#11110F]">
                    “{selectedLead.customNotes || selectedLead.specificRequirements || 'No specific notes.'}”
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-[#DDD8CC] flex flex-wrap gap-2 justify-between">
                <div className="flex gap-2">
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="px-3 py-2 rounded bg-[#11110F] text-white text-xs font-semibold"
                  >
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded bg-[#25D366] text-black text-xs font-bold"
                  >
                    WhatsApp
                  </a>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const l = selectedLead;
                      setSelectedLead(null);
                      openRescheduleModal(l);
                    }}
                    className="px-3 py-2 rounded bg-[#B89A5A] text-white text-xs font-semibold"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleDelete(selectedLead.id)}
                    className="px-2.5 py-2 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200"
                    title="Delete lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            RESCHEDULE APPOINTMENT MODAL
        ---------------------------------------------------- */}
        {rescheduleLead && (
          <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF9F6] border border-[#DDD8CC] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
              <button
                onClick={() => setRescheduleLead(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F4F1EA]"
              >
                <X className="w-5 h-5 text-[#6D6A63]" />
              </button>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#11110F]">
                  Reschedule Appointment
                </h3>
                <p className="text-xs text-[#6D6A63]">
                  Moving {rescheduleLead.fullName} from {rescheduleLead.date} at {rescheduleLead.time}.
                </p>
              </div>

              {rescheduleError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs">
                  {rescheduleError}
                </div>
              )}

              <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#11110F] mb-1">
                    New Date
                  </label>
                  <input
                    type="date"
                    value={newRescheduleDate}
                    onChange={(e) => {
                      setNewRescheduleDate(e.target.value);
                      fetchSlotsForDate(e.target.value);
                    }}
                    className="w-full bg-[#F4F1EA] text-xs p-2.5 rounded-lg border border-[#DDD8CC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#11110F] mb-1">
                    New Time Slot
                  </label>
                  {rescheduleLoading ? (
                    <p className="text-xs text-[#8D713C] animate-pulse">Loading slots...</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                      {rescheduleSlots.map((slot) => {
                        const isBooked = slot.status === 'booked';
                        const isSelected = newRescheduleTime === slot.time;
                        return (
                          <button
                            type="button"
                            key={slot.time}
                            disabled={isBooked}
                            onClick={() => setNewRescheduleTime(slot.time)}
                            className={`p-2 text-xs rounded border text-center font-medium ${
                              isBooked
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : isSelected
                                ? 'bg-[#11110F] text-white border-[#11110F]'
                                : 'bg-[#F4F1EA] text-[#11110F] border-[#DDD8CC] hover:border-[#B89A5A]'
                            }`}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRescheduleLead(null)}
                    className="flex-1 py-2.5 rounded border border-[#DDD8CC] text-xs font-semibold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={rescheduleLoading || !newRescheduleTime}
                    className="flex-1 py-2.5 rounded bg-[#11110F] text-white text-xs font-semibold uppercase hover:bg-[#B89A5A]"
                  >
                    Save & Release Old Slot
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
