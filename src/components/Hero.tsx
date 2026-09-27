import React from 'react';
import { ArrowDown, ArrowUpRight, MapPin, ShieldCheck, Compass } from 'lucide-react';
import { BUSINESS_INFO, IMAGES } from '../data/config';

interface HeroProps {
  onExploreClick: () => void;
  onBookSiteVisit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBookSiteVisit }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-end pb-16 sm:pb-24 pt-32 overflow-hidden bg-[#11110F]">
      {/* Background Architectural Image with subtle zoom and editorial vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Contemporary luxury residence in Junagadh Gujarat"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out brightness-[0.78] contrast-[1.05]"
          loading="eager"
        />
        {/* Editorial gradient overlays for high contrast readability and architectural depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#11110F]/85 via-[#11110F]/30 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 text-xs uppercase tracking-[0.2em] font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
            <span>PROPERTY ADVISORY • JUNAGADH</span>
          </div>

          {/* Main Headline in Editorial Serif Typography */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-[#FAF9F6] tracking-tight leading-[1.08] mb-6">
            Find a Place That <br />
            <span className="italic font-normal text-white">Feels Like Home.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-[#DDD8CC] font-light leading-relaxed max-w-2xl mb-8">
            Discover thoughtfully selected homes, plots and investment opportunities across Junagadh with trusted local property guidance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-[#FAF9F6] text-[#11110F] font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-[#B89A5A] hover:text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookSiteVisit}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-transparent text-[#FAF9F6] border border-white/30 font-medium text-xs uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/60 cursor-pointer"
            >
              <span>Book a Site Visit</span>
            </button>
          </div>

          {/* Trust Indicators and Location Badge */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-[#DDD8CC]">
              <div className="p-1.5 rounded-md bg-white/10 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#B89A5A]" />
              </div>
              <div>
                <p className="font-semibold text-white">Trusted Local Property Guidance</p>
                <p className="text-[#DDD8CC]/70 text-[11px]">Clear Titles • Verified Sites • Honest Pricing</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[#DDD8CC]">
              <div className="p-1.5 rounded-md bg-white/10 border border-white/10">
                <MapPin className="w-4 h-4 text-[#B89A5A]" />
              </div>
              <div>
                <p className="font-semibold text-white">Prime Junagadh Location</p>
                <p className="text-[#DDD8CC]/70 text-[11px]">{BUSINESS_INFO.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt Indicator */}
        <div className="hidden lg:flex items-center gap-3 absolute bottom-6 right-8 text-white/60 hover:text-white transition-colors">
          <span className="text-[11px] uppercase tracking-widest font-mono">Scroll to discover</span>
          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5 text-[#B89A5A]" />
          </div>
        </div>
      </div>
    </section>
  );
};
