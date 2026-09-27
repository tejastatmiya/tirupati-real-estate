import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/config';

interface PropertyCategoriesProps {
  onSelectCategory: (categoryType: string) => void;
}

export const PropertyCategories: React.FC<PropertyCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#DDD8CC] text-[#8D713C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
              <span>PROPERTY VERTICALS</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#11110F] tracking-tight leading-tight">
              Tailored Portfolios <br />
              <span className="italic font-normal">For Every Requirement.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6D6A63] max-w-sm leading-relaxed">
            Select a sector to explore verified Junagadh listings or initiate a specialized advisory request with our team.
          </p>
        </div>

        {/* 6 Category Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.typeFilter)}
              className="group relative h-80 rounded-xl overflow-hidden border border-[#DDD8CC] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(17,17,15,0.12)] transition-all duration-500 ease-out"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.75] contrast-[1.05]"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/60 to-transparent group-hover:via-[#11110F]/45 transition-colors" />

              {/* Editorial Content */}
              <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-[#B89A5A] px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm border border-white/10">
                    {cat.subtitle}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#B89A5A] group-hover:text-[#11110F] transition-all transform group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-light text-white tracking-wide mb-2 group-hover:text-[#F4F1EA] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#DDD8CC] line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
