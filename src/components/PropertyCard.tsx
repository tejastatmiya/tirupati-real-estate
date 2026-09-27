import React from 'react';
import { MapPin, Bed, Maximize2, Compass, ArrowUpRight, Calendar, MessageCircle } from 'lucide-react';
import { Property, BUSINESS_INFO } from '../data/config';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  onBookSiteVisit: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  onBookSiteVisit,
}) => {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
    `Hello Tirupati Real Estate, I am interested in inquiring about property [${property.id}]: ${property.title} in ${property.locality} listed for ${property.price}. Please share details.`
  )}`;

  return (
    <div className="group bg-[#FAF9F6] border border-[#DDD8CC] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(17,17,15,0.08)] transition-all duration-400 ease-out hover:-translate-y-1 flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1C18]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded bg-[#11110F]/85 backdrop-blur-md text-[#FAF9F6] text-[10px] font-semibold uppercase tracking-wider border border-white/10">
            {property.propertyType}
          </span>
          <span className="px-2.5 py-1 rounded bg-[#B89A5A]/90 backdrop-blur-md text-[#11110F] text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {property.status}
          </span>
        </div>

        {/* Bottom Locality inside Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
          <span className="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-[#B89A5A]" />
            {property.locality}, Junagadh
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#DDD8CC]/80">
            {property.id}
          </span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xl sm:text-2xl font-editorial font-bold text-[#11110F] tracking-tight">
              {property.price}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProperty(property)}
            className="text-base sm:text-lg font-semibold text-[#171717] group-hover:text-[#8D713C] transition-colors leading-snug line-clamp-1 cursor-pointer mb-2"
          >
            {property.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#6D6A63] line-clamp-2 leading-relaxed mb-4">
            {property.description}
          </p>

          {/* Specifications Row */}
          <div className="grid grid-cols-2 gap-2 py-3 px-3 rounded-lg bg-[#F4F1EA] border border-[#DDD8CC]/60 text-xs mb-4">
            <div className="flex items-center gap-1.5 text-[#171717]">
              <Maximize2 className="w-3.5 h-3.5 text-[#8D713C] shrink-0" />
              <span className="truncate font-medium">{property.area}</span>
            </div>

            {property.bedrooms ? (
              <div className="flex items-center gap-1.5 text-[#171717]">
                <Bed className="w-3.5 h-3.5 text-[#8D713C] shrink-0" />
                <span className="font-medium">{property.bedrooms} BHK Spec</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#171717]">
                <Compass className="w-3.5 h-3.5 text-[#8D713C] shrink-0" />
                <span className="truncate font-medium">{property.facing || 'East Facing'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Card CTA Actions */}
        <div className="pt-3 border-t border-[#DDD8CC]/60 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-transparent text-[#11110F] border border-[#DDD8CC] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA] hover:border-[#11110F] transition-all cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onBookSiteVisit(property)}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer"
            title="Book a site visit for this property"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Site Visit</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-md border border-[#25D366]/30 bg-[#25D366]/10 text-[#11110F] hover:bg-[#25D366] hover:text-white transition-colors"
            title="Ask on WhatsApp"
            aria-label={`Ask about ${property.title} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
