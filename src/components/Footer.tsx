import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/config';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenSiteVisit: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenSiteVisit, onOpenAdmin }) => {
  return (
    <footer className="bg-[#11110F] text-[#DDD8CC] border-t border-white/10 pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B89A5A]" />
              <span className="font-editorial text-2xl font-bold tracking-wider text-white">
                TIRUPATI
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89A5A] pl-2 border-l border-white/20">
                REAL ESTATE
              </span>
            </div>

            <p className="text-sm text-[#DDD8CC]/80 font-light leading-relaxed max-w-sm">
              Trusted property guidance in Junagadh. Connecting families, investors, and businesses with prime residential plots, contemporary bungalows, and commercial spaces.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenSiteVisit}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B89A5A] hover:text-white transition-colors"
              >
                <span>Book a Guided Site Visit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('properties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Curated Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Property Verticals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Advisory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('location')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Junagadh Office
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Services Portfolio */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Advisory Services
            </h4>
            <ul className="space-y-2 text-xs text-[#DDD8CC]/80">
              <li>• Residential Bungalows & Villas</li>
              <li>• NA Demarcated Plots & Land</li>
              <li>• High-Footfall Commercial Showrooms</li>
              <li>• Premium Family Rental Residences</li>
              <li>• Land Title & Revenue Verification</li>
              <li>• Private Accompanied Site Tours</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Consultation Desk
            </h4>
            <div className="space-y-2.5 text-xs text-[#DDD8CC]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B89A5A] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B89A5A] shrink-0" />
                <a href="tel:+916356548117" className="hover:text-white">
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: {BUSINESS_INFO.whatsapp}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B89A5A] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#DDD8CC]/60">
          <p>© 2026 TIRUPATI REAL ESTATE. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span>Property Advisory in Junagadh, Gujarat</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </span>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-[#B89A5A] hover:underline cursor-pointer font-medium"
                >
                  Admin Portal
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
