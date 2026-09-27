import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertySearch, SearchFilters } from './components/PropertySearch';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { TrustPillars } from './components/TrustPillars';
import { AboutSection } from './components/AboutSection';
import { PropertyCategories } from './components/PropertyCategories';
import { HowItWorks } from './components/HowItWorks';
import { LeadFormSection } from './components/LeadFormSection';
import { LocationSection } from './components/LocationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { SiteVisitModal } from './components/SiteVisitModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PROPERTIES, Property, BUSINESS_INFO } from './data/config';
import { ArrowUpRight, Filter } from 'lucide-react';

export default function App() {
  // Search & Filter State
  const [filters, setFilters] = useState<SearchFilters>({
    lookingFor: 'all',
    propertyType: 'all',
    location: 'all',
    budget: 'all',
  });

  // Active Category Tab for Featured Properties
  const [activeTab, setActiveTab] = useState<string>('all');

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [siteVisitPropertyTitle, setSiteVisitPropertyTitle] = useState<string | undefined>(undefined);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Filter handlers
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      lookingFor: 'all',
      propertyType: 'all',
      location: 'all',
      budget: 'all',
    });
    setActiveTab('all');
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = () => {
    scrollToSection('properties');
  };

  const handleSelectCategory = (categoryType: string) => {
    if (categoryType === 'sell') {
      scrollToSection('contact');
    } else {
      setFilters((prev) => ({ ...prev, lookingFor: categoryType }));
      setActiveTab(categoryType);
      scrollToSection('properties');
    }
  };

  const handleOpenSiteVisit = (propertyTitle?: string) => {
    setSiteVisitPropertyTitle(propertyTitle);
    setSiteVisitModalOpen(true);
  };

  // Filtered properties computation
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // 1. Looking For / Tab filter
      const categoryFilter = activeTab !== 'all' ? activeTab : filters.lookingFor;
      if (categoryFilter !== 'all') {
        if (property.category !== categoryFilter) {
          return false;
        }
      }

      // 2. Property Type filter
      if (filters.propertyType !== 'all') {
        if (property.propertyType !== filters.propertyType) {
          return false;
        }
      }

      // 3. Location filter
      if (filters.location !== 'all') {
        if (!property.locality.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // 4. Budget filter
      if (filters.budget !== 'all') {
        if (filters.budget === 'under-50l' && property.priceRaw > 5000000) return false;
        if (filters.budget === '50l-1cr' && (property.priceRaw <= 5000000 || property.priceRaw > 10000000)) return false;
        if (filters.budget === 'above-1cr' && property.priceRaw <= 10000000) return false;
        if (filters.budget === 'rental' && property.category !== 'rent') return false;
      }

      return true;
    });
  }, [filters, activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171717] selection:bg-[#B89A5A]/30">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenSiteVisit={() => handleOpenSiteVisit()}
        onNavigateSection={scrollToSection}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('properties')}
          onBookSiteVisit={() => handleOpenSiteVisit()}
        />

        {/* 3. Property Search Discovery Bar */}
        <PropertySearch
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={handleSearchSubmit}
          onResetFilters={handleResetFilters}
          resultCount={filteredProperties.length}
        />

        {/* 4. Featured Properties Grid Section */}
        <section id="properties" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#DDD8CC] text-[#8D713C] text-[11px] uppercase tracking-[0.2em] font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A5A]" />
                <span>CURATED PROPERTIES</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#11110F] tracking-tight leading-tight">
                Properties Worth Exploring
              </h2>
              <p className="text-xs sm:text-sm text-[#6D6A63] mt-2 max-w-xl leading-relaxed">
                A focused selection of residential, land, commercial and investment opportunities across Junagadh with vetted legal titles.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F4F1EA] border border-[#DDD8CC]">
              {[
                { id: 'all', label: 'All Listings' },
                { id: 'buy', label: 'Homes & Villas' },
                { id: 'plot', label: 'Plots & Land' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'rent', label: 'Rentals' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setFilters((prev) => ({ ...prev, lookingFor: tab.id }));
                  }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#11110F] text-[#FAF9F6] shadow-sm'
                      : 'text-[#6D6A63] hover:text-[#11110F]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelectProperty={(prop) => setSelectedProperty(prop)}
                  onBookSiteVisit={(prop) => handleOpenSiteVisit(prop.title)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#F4F1EA] border border-[#DDD8CC] rounded-2xl max-w-xl mx-auto">
              <Filter className="w-10 h-10 text-[#8D713C] mx-auto mb-3" />
              <h3 className="font-editorial text-2xl font-bold text-[#11110F]">No properties match these filters</h3>
              <p className="text-xs text-[#6D6A63] mt-2 mb-6">
                Try adjusting your budget or property type, or contact our Junagadh property desk directly for off-market options.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#11110F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Bottom Custom Advisory Bar */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#F4F1EA] border border-[#DDD8CC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-editorial text-xl sm:text-2xl text-[#11110F] font-normal">
                Looking for a specific plot dimension or custom commercial location?
              </p>
              <p className="text-xs text-[#6D6A63] mt-1">
                We maintain off-market direct listings from genuine Junagadh owners.
              </p>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Submit Custom Requirement</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 5. Trust Pillars / Value Proposition */}
        <TrustPillars />

        {/* 6. Property Verticals / Categories */}
        <PropertyCategories onSelectCategory={handleSelectCategory} />

        {/* 7. Editorial About Section */}
        <AboutSection onTalkToAdvisor={() => scrollToSection('contact')} />

        {/* 8. Process Section: How It Works */}
        <HowItWorks />

        {/* 9. Central Location Section */}
        <LocationSection onContactClick={() => scrollToSection('contact')} />

        {/* 10. Lead Generation Section & Form */}
        <LeadFormSection initialPropertyTitle={siteVisitPropertyTitle} />

        {/* 11. Client Testimonials */}
        <TestimonialsSection />

        {/* 12. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* 13. Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenSiteVisit={() => handleOpenSiteVisit()}
        onOpenAdmin={() => setAdminDashboardOpen(true)}
      />

      {/* 14. Modals & Overlays */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onBookSiteVisit={(prop) => {
          setSelectedProperty(null);
          handleOpenSiteVisit(prop.title);
        }}
      />

      <SiteVisitModal
        isOpen={siteVisitModalOpen}
        onClose={() => setSiteVisitModalOpen(false)}
        selectedPropertyTitle={siteVisitPropertyTitle}
      />

      {/* Admin Lead Management & Calendar Dashboard */}
      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
      />

      {/* 15. Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
