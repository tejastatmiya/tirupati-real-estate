import React from 'react';
import { Check, ArrowUpRight, MapPin, Building, FileCheck, Compass } from 'lucide-react';
import { IMAGES, BUSINESS_INFO } from '../data/config';

interface AboutSectionProps {
  onTalkToAdvisor: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onTalkToAdvisor }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#DDD8CC] shadow-[0_20px_50px_rgba(17,17,15,0.06)] aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={IMAGES.officeConsultation}
                alt="Tirupati Real Estate Consultation Lounge Junagadh"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Architectural Floating Card */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 bg-[#11110F] text-[#FAF9F6] p-5 sm:p-6 rounded-xl border border-white/10 shadow-2xl max-w-xs">
              <div className="flex items-center gap-2 mb-2 text-[#B89A5A]">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Central Junagadh</span>
              </div>
              <p className="text-sm font-editorial italic text-white/90">
                “Located directly behind the New Collector Office campus for swift title & revenue coordination.”
              </p>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#DDD8CC] text-[#8D713C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
              <span>ABOUT TIRUPATI REAL ESTATE</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#11110F] tracking-tight leading-tight mb-6">
              Local Knowledge. <br />
              <span className="italic font-normal">Better Property Decisions.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#6D6A63] leading-relaxed mb-8">
              <p>
                Property is never just a square-foot transaction in Junagadh—it represents generational security, family milestones, and commercial ambition. At <strong className="text-[#11110F] font-semibold">TIRUPATI REAL ESTATE</strong>, we bridge local ground reality with professional brokerage rigor.
              </p>
              <p>
                Whether you are evaluating non-agricultural (NA) residential plots along emerging bypass arteries, purchasing an independent family home, acquiring high-footfall commercial retail space, or leasing residential property, we provide end-to-end guidance anchored in physical verification and legal clarity.
              </p>
            </div>

            {/* Core Competencies Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-[#F4F1EA] text-[#8D713C] mt-0.5 border border-[#DDD8CC]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#11110F]">
                  Plot & Land NA Status Checks
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-[#F4F1EA] text-[#8D713C] mt-0.5 border border-[#DDD8CC]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#11110F]">
                  Independent Bungalows & Flats
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-[#F4F1EA] text-[#8D713C] mt-0.5 border border-[#DDD8CC]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#11110F]">
                  Commercial Showrooms & Offices
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-[#F4F1EA] text-[#8D713C] mt-0.5 border border-[#DDD8CC]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#11110F]">
                  Accompanied On-Site Inspections
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onTalkToAdvisor}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer shadow-sm"
              >
                <span>Talk to a Property Advisor</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+916356548117"
                className="text-xs font-semibold uppercase tracking-wider text-[#8D713C] hover:text-[#11110F] py-2 transition-colors"
              >
                Direct Call: {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
