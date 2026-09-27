import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/config';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#DDD8CC] text-[#8D713C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
              <span>CLIENT EXPERIENCES</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#11110F] tracking-tight leading-tight">
              Trust Built Through <br />
              <span className="italic font-normal">Every Completed Transaction.</span>
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#DDD8CC] text-[11px] text-[#6D6A63]">
              <Sparkles className="w-3.5 h-3.5 text-[#B89A5A]" />
              Authentic Junagadh Property Guidance
            </span>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative p-7 rounded-xl bg-[#F4F1EA] border border-[#DDD8CC] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#B89A5A]"
            >
              <div>
                <Quote className="w-8 h-8 text-[#8D713C]/40 mb-4" />
                <p className="font-editorial text-lg sm:text-xl text-[#11110F] italic leading-relaxed mb-6">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#DDD8CC]/70">
                <p className="font-semibold text-sm text-[#11110F]">{t.clientName}</p>
                <p className="text-xs text-[#8D713C] font-medium mt-0.5">{t.propertyType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
