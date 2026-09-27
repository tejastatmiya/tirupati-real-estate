import React from 'react';
import { VALUE_PILLARS } from '../data/config';

export const TrustPillars: React.FC = () => {
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#FAF9F6] border-y border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#DDD8CC] text-[#8D713C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
            <span>THE TIRUPATI ADVANTAGE</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light text-[#11110F] tracking-tight leading-tight">
            Property Decisions, <br />
            <span className="italic font-normal">Guided With Clarity.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#6D6A63] leading-relaxed max-w-2xl">
            Whether securing residential plots, expanding commercial footprints, or acquiring family homes in Junagadh, our client-first methodology eliminates ambiguity at every step.
          </p>
        </div>

        {/* 4 Architectural Value Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {VALUE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="relative p-6 sm:p-7 rounded-xl bg-[#F4F1EA] border border-[#DDD8CC] transition-all duration-300 hover:-translate-y-1 hover:border-[#B89A5A] group"
            >
              {/* Pillar Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-editorial text-3xl sm:text-4xl font-light text-[#8D713C]/60 group-hover:text-[#8D713C] transition-colors">
                  {pillar.number}
                </span>

                {/* Minimal Architectural Line-Art SVGs */}
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#DDD8CC] flex items-center justify-center text-[#11110F] group-hover:border-[#B89A5A] transition-colors">
                  {pillar.number === '01' && (
                    <svg className="w-5 h-5 text-[#8D713C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                    </svg>
                  )}
                  {pillar.number === '02' && (
                    <svg className="w-5 h-5 text-[#8D713C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                  )}
                  {pillar.number === '03' && (
                    <svg className="w-5 h-5 text-[#8D713C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  )}
                  {pillar.number === '04' && (
                    <svg className="w-5 h-5 text-[#8D713C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-semibold text-[#11110F] mb-2 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6D6A63] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
