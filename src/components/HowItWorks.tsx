import React from 'react';
import { PROCESS_STEPS } from '../data/config';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#DDD8CC] text-[#8D713C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
            <span>OUR PROCESS</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#11110F] tracking-tight leading-tight">
            How It Works
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#6D6A63] leading-relaxed">
            A structured, respectful process designed to save you time and provide certainty throughout your Junagadh property journey.
          </p>
        </div>

        {/* Desktop Connected Steps & Mobile Vertical Timeline */}
        <div className="relative">
          {/* Subtle connecting horizontal line on desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-px bg-[#DDD8CC] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.step} className="relative flex flex-col">
                {/* Step Circle & Number */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border-2 border-[#DDD8CC] flex items-center justify-center font-editorial text-xl font-bold text-[#8D713C] shadow-sm">
                    {step.step}
                  </div>
                  <div className="lg:hidden h-px flex-1 bg-[#DDD8CC]" />
                </div>

                {/* Content */}
                <div className="pr-4">
                  <h3 className="text-base font-semibold text-[#11110F] mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6D6A63] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
