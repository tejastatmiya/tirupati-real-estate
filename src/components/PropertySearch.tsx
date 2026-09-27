import React from 'react';
import { Search, MapPin, Building2, Wallet, ArrowRight, SlidersHorizontal } from 'lucide-react';

export interface SearchFilters {
  lookingFor: string;
  propertyType: string;
  location: string;
  budget: string;
}

interface PropertySearchProps {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: string) => void;
  onSearchSubmit: () => void;
  onResetFilters: () => void;
  resultCount: number;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  onResetFilters,
  resultCount,
}) => {
  const lookingForOptions = [
    { value: 'all', label: 'All Requirements' },
    { value: 'buy', label: 'Buy a Property' },
    { value: 'plot', label: 'Residential Plot / Land' },
    { value: 'rent', label: 'Rent a House' },
    { value: 'commercial', label: 'Commercial' },
  ];

  const propertyTypes = [
    { value: 'all', label: 'All Property Types' },
    { value: 'House / Bungalow', label: 'House / Bungalow' },
    { value: 'Residential Plot', label: 'Residential Plot' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Commercial', label: 'Commercial Space' },
    { value: 'Agricultural / Land', label: 'Agricultural / Land' },
  ];

  const locations = [
    { value: 'all', label: 'All Junagadh Localities' },
    { value: 'Zanzarda Road', label: 'Zanzarda Road' },
    { value: 'Near New Collector Office', label: 'Near New Collector Office' },
    { value: 'Motibaug Area', label: 'Motibaug Area' },
    { value: 'Rayji Baug / College Road', label: 'Rayji Baug / College Road' },
    { value: 'Bilkha Road Highway Corridor', label: 'Bilkha Road Corridor' },
  ];

  const budgetRanges = [
    { value: 'all', label: 'Any Budget' },
    { value: 'under-50l', label: 'Under ₹50 Lakhs' },
    { value: '50l-1cr', label: '₹50 Lakhs – ₹1.00 Crore' },
    { value: 'above-1cr', label: 'Above ₹1.00 Crore' },
    { value: 'rental', label: 'Rental (₹15,000 – ₹40,000/mo)' },
  ];

  const hasActiveFilters =
    filters.lookingFor !== 'all' ||
    filters.propertyType !== 'all' ||
    filters.location !== 'all' ||
    filters.budget !== 'all';

  return (
    <div className="relative -mt-10 sm:-mt-14 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-[#FAF9F6] border border-[#DDD8CC] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_16px_40px_rgba(17,17,15,0.08)]">
        {/* Top header row inside search box */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#DDD8CC]/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B89A5A]" />
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#11110F]">
              Property Discovery Bar
            </h2>
            <span className="text-[11px] text-[#6D6A63] hidden md:inline">
              — Verified Junagadh Properties
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6D6A63] font-medium">
              Showing <strong className="text-[#11110F]">{resultCount}</strong> curated listings
            </span>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-[11px] font-semibold text-[#8D713C] hover:underline cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Form controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. Looking For */}
          <div className="flex flex-col">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6D6A63] mb-1.5 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89A5A]" />
              Looking For
            </label>
            <div className="relative">
              <select
                value={filters.lookingFor}
                onChange={(e) => onFilterChange('lookingFor', e.target.value)}
                className="w-full bg-[#F4F1EA] text-[#11110F] text-xs font-medium py-3 px-3.5 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A] focus:ring-1 focus:ring-[#B89A5A] transition-all cursor-pointer appearance-none"
              >
                {lookingForOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6D6A63]">
                ▼
              </div>
            </div>
          </div>

          {/* 2. Property Type */}
          <div className="flex flex-col">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6D6A63] mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#B89A5A]" />
              Property Type
            </label>
            <div className="relative">
              <select
                value={filters.propertyType}
                onChange={(e) => onFilterChange('propertyType', e.target.value)}
                className="w-full bg-[#F4F1EA] text-[#11110F] text-xs font-medium py-3 px-3.5 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A] focus:ring-1 focus:ring-[#B89A5A] transition-all cursor-pointer appearance-none"
              >
                {propertyTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6D6A63]">
                ▼
              </div>
            </div>
          </div>

          {/* 3. Location in Junagadh */}
          <div className="flex flex-col">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6D6A63] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B89A5A]" />
              Location in Junagadh
            </label>
            <div className="relative">
              <select
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full bg-[#F4F1EA] text-[#11110F] text-xs font-medium py-3 px-3.5 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A] focus:ring-1 focus:ring-[#B89A5A] transition-all cursor-pointer appearance-none"
              >
                {locations.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6D6A63]">
                ▼
              </div>
            </div>
          </div>

          {/* 4. Budget Range */}
          <div className="flex flex-col">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6D6A63] mb-1.5 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-[#B89A5A]" />
              Budget Range
            </label>
            <div className="relative">
              <select
                value={filters.budget}
                onChange={(e) => onFilterChange('budget', e.target.value)}
                className="w-full bg-[#F4F1EA] text-[#11110F] text-xs font-medium py-3 px-3.5 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A] focus:ring-1 focus:ring-[#B89A5A] transition-all cursor-pointer appearance-none"
              >
                {budgetRanges.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6D6A63]">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#6D6A63] font-medium">Quick Views:</span>
            <button
              onClick={() => onFilterChange('lookingFor', 'plot')}
              className="text-[11px] px-2.5 py-1 rounded bg-[#F4F1EA] hover:bg-[#DDD8CC]/50 text-[#11110F] border border-[#DDD8CC] transition-colors"
            >
              Residential Plots
            </button>
            <button
              onClick={() => onFilterChange('lookingFor', 'buy')}
              className="text-[11px] px-2.5 py-1 rounded bg-[#F4F1EA] hover:bg-[#DDD8CC]/50 text-[#11110F] border border-[#DDD8CC] transition-colors"
            >
              Bungalows & Villas
            </button>
            <button
              onClick={() => onFilterChange('lookingFor', 'rent')}
              className="text-[11px] px-2.5 py-1 rounded bg-[#F4F1EA] hover:bg-[#DDD8CC]/50 text-[#11110F] border border-[#DDD8CC] transition-colors"
            >
              Rental Homes
            </button>
          </div>

          <button
            onClick={onSearchSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
