import React from 'react';
import { MapPin, Navigation, Clock, Phone, Building2, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/config';

interface LocationSectionProps {
  onContactClick: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onContactClick }) => {
  return (
    <section id="location" className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#DDD8CC] text-[#8D713C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
            <span>CENTRAL LOCATION</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#11110F] tracking-tight leading-tight mb-3">
            Visit TIRUPATI REAL ESTATE
          </h2>

          <p className="text-sm sm:text-base text-[#6D6A63] leading-relaxed">
            Conveniently located near New Collector Office, Junagadh. Centrally placed to facilitate prompt revenue office verifications, title deed reviews, and site departures.
          </p>
        </div>

        {/* Location Grid: Map + Office Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Office Details Card */}
          <div className="lg:col-span-5 bg-[#F4F1EA] border border-[#DDD8CC] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#8D713C] block mb-1">
                  Advisory Headquarters
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#11110F]">
                  TIRUPATI REAL ESTATE
                </h3>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#171717]">
                <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#DDD8CC] text-[#8D713C] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#11110F]">Office Address</p>
                  <p className="text-[#6D6A63] mt-0.5">{BUSINESS_INFO.address}</p>
                  <p className="text-[11px] text-[#8D713C] font-medium mt-1">
                    Landmark: {BUSINESS_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#171717]">
                <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#DDD8CC] text-[#8D713C] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#11110F]">Consultation Timings</p>
                  <p className="text-[#6D6A63] mt-0.5">{BUSINESS_INFO.workingHours}</p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#171717]">
                <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#DDD8CC] text-[#8D713C] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#11110F]">Phone & WhatsApp</p>
                  <p className="text-[#6D6A63] mt-0.5">{BUSINESS_INFO.phone}</p>
                  <p className="text-[11px] text-[#6D6A63]">Direct helpline for appointments</p>
                </div>
              </div>

              {/* Accessibility notes */}
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#DDD8CC] text-xs text-[#6D6A63]">
                <p className="font-semibold text-[#11110F] mb-1">Easy Landmark Reference</p>
                <p>Located on the access road behind the New Collector Office complex with dedicated visitor parking and comfortable private conference facilities.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#DDD8CC] flex flex-col sm:flex-row gap-3">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center py-3 px-4 rounded-md bg-transparent text-[#11110F] border border-[#DDD8CC] text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF9F6] transition-colors cursor-pointer"
              >
                Contact Desk
              </button>
            </div>
          </div>

          {/* Map Frame */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#DDD8CC] shadow-md bg-[#F4F1EA] min-h-[380px] relative">
            <iframe
              title="Tirupati Real Estate Location - New Collector Office Junagadh"
              src={BUSINESS_INFO.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ minHeight: '400px', border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-[0.9] contrast-[1.05]"
            />
            
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#11110F]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-lg border border-white/10 shadow-lg text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B89A5A] animate-pulse" />
              <div>
                <p className="font-semibold text-white">TIRUPATI REAL ESTATE</p>
                <p className="text-[10px] text-[#DDD8CC]">Behind New Collector Office, Junagadh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
