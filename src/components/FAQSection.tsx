import React, { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/config';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#DDD8CC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#DDD8CC] text-[#8D713C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
            <span>CLARITY & ADVISORY FAQ</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#11110F] tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#6D6A63] leading-relaxed">
            Essential answers regarding buying, selling, renting, site inspections, and legal verification in Junagadh.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-btn-${index}`;
            const contentId = `faq-content-${index}`;

            return (
              <div
                key={index}
                className="rounded-xl border border-[#DDD8CC] bg-[#F4F1EA] overflow-hidden transition-colors"
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A5A] cursor-pointer"
                >
                  <span className="font-editorial text-lg sm:text-xl font-medium text-[#11110F] pr-4">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#DDD8CC] flex items-center justify-center shrink-0 text-[#8D713C] transition-transform duration-300">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#6D6A63] leading-relaxed border-t border-[#DDD8CC]/60 pt-4"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Prompt */}
        <div className="mt-12 p-6 rounded-xl bg-[#F4F1EA] border border-[#DDD8CC] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-sm text-[#11110F]">Have a specific query not listed here?</p>
            <p className="text-xs text-[#6D6A63] mt-0.5">Speak with our Junagadh property advisory desk directly.</p>
          </div>
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Tirupati Real Estate, I have a specific question about property in Junagadh.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
