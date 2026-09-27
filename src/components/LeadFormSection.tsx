import React from 'react';
import { Phone, MessageCircle, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/config';
import { AppointmentEnquiryForm } from './AppointmentEnquiryForm';

interface LeadFormSectionProps {
  initialPropertyTitle?: string;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ initialPropertyTitle }) => {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#11110F] text-[#FAF9F6] relative overflow-hidden">
      {/* Architectural subtle grid background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact & Advisory Message */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#B89A5A] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
                <span>PROPERTY ENQUIRY & APPOINTMENTS</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight mb-4">
                Your Next Property <br />
                <span className="italic font-normal text-[#F4F1EA]">Could Start With One Conversation.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#DDD8CC] leading-relaxed">
                Tell us what you are looking for and our team can help you explore suitable property options in Junagadh. From residential plots to commercial retail spaces, we ensure clean paperwork and transparent deal structuring.
              </p>
            </div>

            {/* Quick Action Contact Cards */}
            <div className="space-y-4">
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Tirupati Real Estate, I would like to consult regarding a property in Junagadh.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#25D366]/60 hover:bg-white/[0.08] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#DDD8CC]">WhatsApp Us</p>
                    <p className="text-sm font-semibold text-white">{BUSINESS_INFO.whatsapp}</p>
                  </div>
                </div>
                <span className="text-xs text-[#B89A5A] group-hover:translate-x-1 transition-transform">
                  Instant Reply →
                </span>
              </a>

              {/* Call Card */}
              <a
                href="tel:+916356548117"
                className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#B89A5A]/60 hover:bg-white/[0.08] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#B89A5A]/20 border border-[#B89A5A]/40 flex items-center justify-center text-[#B89A5A]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#DDD8CC]">Direct Call</p>
                    <p className="text-sm font-semibold text-white">{BUSINESS_INFO.phone}</p>
                  </div>
                </div>
                <span className="text-xs text-[#B89A5A] group-hover:translate-x-1 transition-transform">
                  Call Advisor →
                </span>
              </a>

              {/* Office Location Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B89A5A] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#DDD8CC]">
                    <p className="font-semibold text-white mb-0.5">Junagadh Consultation Office</p>
                    <p>{BUSINESS_INFO.address}</p>
                    <p className="text-white/60 mt-1">{BUSINESS_INFO.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advisory Guarantee */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-[#DDD8CC]/80 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B89A5A]" />
                <span>Real-Time Atomic Slot Reservation</span>
              </div>
              <p>
                When you schedule a site visit or consultation, the selected date and time are reserved immediately to prevent double-booking.
              </p>
            </div>
          </div>

          {/* Right Column: Multi-Step Lead & Appointment Engine */}
          <div className="lg:col-span-7">
            <AppointmentEnquiryForm initialPropertyTitle={initialPropertyTitle} />
          </div>
        </div>
      </div>
    </section>
  );
};
