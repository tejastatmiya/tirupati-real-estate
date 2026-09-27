import React from 'react';
import { X, MapPin, Maximize2, Bed, Bath, Compass, CheckCircle2, Phone, MessageCircle, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { Property, BUSINESS_INFO } from '../data/config';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onBookSiteVisit: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onBookSiteVisit,
}) => {
  if (!property) return null;

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
    `Hello Tirupati Real Estate, I am interested in inquiring about property [${property.id}]: "${property.title}" located at ${property.locality}, Junagadh (Price: ${property.price}). Could you please schedule a consultation or provide additional documents?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF9F6] w-full max-w-4xl rounded-2xl border border-[#DDD8CC] shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#11110F] transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Hero Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#11110F] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-transparent to-black/30" />

          {/* Badges on modal image */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#B89A5A] text-[#11110F]">
                  {property.status}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-widest bg-white/20 backdrop-blur-sm">
                  Ref: {property.id}
                </span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight">
                {property.title}
              </h2>
              <p className="flex items-center gap-1.5 text-xs text-[#DDD8CC] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B89A5A]" />
                {property.locality}, Junagadh, Gujarat
              </p>
            </div>

            <div className="bg-[#11110F]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-right">
              <span className="text-[10px] uppercase tracking-widest text-[#B89A5A] block">Indicative Price</span>
              <span className="text-xl sm:text-2xl font-editorial font-bold text-white">
                {property.price}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Key Specifications Matrix */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#6D6A63] mb-3">
              Property Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-lg bg-[#F4F1EA] border border-[#DDD8CC]">
                <div className="flex items-center gap-1.5 text-[#6D6A63] text-xs mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#8D713C]" />
                  <span>Area / Dimensions</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#11110F]">{property.area}</p>
              </div>

              {property.bedrooms && (
                <div className="p-3.5 rounded-lg bg-[#F4F1EA] border border-[#DDD8CC]">
                  <div className="flex items-center gap-1.5 text-[#6D6A63] text-xs mb-1">
                    <Bed className="w-3.5 h-3.5 text-[#8D713C]" />
                    <span>Bedrooms</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#11110F]">{property.bedrooms} BHK Suites</p>
                </div>
              )}

              {property.bathrooms && (
                <div className="p-3.5 rounded-lg bg-[#F4F1EA] border border-[#DDD8CC]">
                  <div className="flex items-center gap-1.5 text-[#6D6A63] text-xs mb-1">
                    <Bath className="w-3.5 h-3.5 text-[#8D713C]" />
                    <span>Bathrooms</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#11110F]">{property.bathrooms} Attached Baths</p>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-[#F4F1EA] border border-[#DDD8CC]">
                <div className="flex items-center gap-1.5 text-[#6D6A63] text-xs mb-1">
                  <Compass className="w-3.5 h-3.5 text-[#8D713C]" />
                  <span>Facing & Road</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#11110F]">{property.facing || 'East Facing'}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#F4F1EA] border border-[#DDD8CC]">
                <div className="flex items-center gap-1.5 text-[#6D6A63] text-xs mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8D713C]" />
                  <span>Title Verification</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#11110F]">Verified Title & NA Status</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#6D6A63] mb-2">
              Overview & Architecture
            </h3>
            <p className="text-sm text-[#171717] leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#6D6A63] mb-3">
              Key Highlights & Verification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#171717]">
                  <CheckCircle2 className="w-4 h-4 text-[#8D713C] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advisory Notice */}
          <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#DDD8CC] text-xs text-[#6D6A63] flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="font-semibold text-[#11110F]">Tirupati Real Estate Advisory Assurance</p>
              <p>Site visits are accompanied by our senior local consultant. Clear documentation and revenue map check included.</p>
            </div>
            <span className="font-mono text-[11px] text-[#8D713C]">Office: New Collector Office Back, Junagadh</span>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-[#DDD8CC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="tel:+916356548117"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-[#DDD8CC] text-xs font-semibold uppercase tracking-wider text-[#11110F] hover:bg-[#F4F1EA] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B89A5A]" />
                <span>Call Advisor</span>
              </a>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#25D366]/15 border border-[#25D366]/40 text-xs font-semibold uppercase tracking-wider text-[#11110F] hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookSiteVisit(property);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Guided Site Visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
