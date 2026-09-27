import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ArrowUpRight, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/config';

interface NavbarProps {
  onOpenSiteVisit: (propertyTitle?: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSiteVisit,
  onNavigateSection,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Properties', target: 'properties' },
    { label: 'Categories', target: 'categories' },
    { label: 'About', target: 'about' },
    { label: 'Why Us', target: 'why-us' },
    { label: 'Location', target: 'location' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(target);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-[#FAF9F6]/92 backdrop-blur-md border-b border-[#DDD8CC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-3'
          : 'bg-gradient-to-b from-[#11110F]/80 via-[#11110F]/30 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A5A]"
            aria-label="Tirupati Real Estate Home"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isScrolled ? 'bg-[#B89A5A]' : 'bg-[#B89A5A] ring-2 ring-[#B89A5A]/40'}`} />
              <span className={`font-editorial text-xl sm:text-2xl font-semibold tracking-wider transition-colors ${
                isScrolled ? 'text-[#11110F]' : 'text-white'
              }`}>
                TIRUPATI
              </span>
              <span className={`text-xs uppercase tracking-[0.25em] font-medium pl-1.5 border-l ${
                isScrolled ? 'text-[#6D6A63] border-[#DDD8CC]' : 'text-[#DDD8CC] border-white/30'
              }`}>
                REAL ESTATE
              </span>
            </div>
            <p className={`text-[10px] tracking-widest uppercase transition-colors ${
              isScrolled ? 'text-[#8D713C]' : 'text-[#B89A5A]'
            }`}>
              Junagadh Property Advisory
            </p>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 ml-10 xl:ml-14" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:text-[#B89A5A] cursor-pointer focus:outline-none ${
                  isScrolled ? 'text-[#171717]' : 'text-[#F4F1EA]'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Admin Desk Link */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold py-1 px-2.5 rounded border transition-colors ${
                  isScrolled
                    ? 'border-[#DDD8CC] text-[#8D713C] hover:bg-[#F4F1EA]'
                    : 'border-white/20 text-[#B89A5A] hover:bg-white/10'
                }`}
                title="Business Owner Lead Portal"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Action CTAs & Phone */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick WhatsApp / Phone Links */}
            <a
              href="https://wa.me/916356548117?text=Hello%20Tirupati%20Real%20Estate%2C%20I%20am%20looking%20for%20property%20assistance%20in%20Junagadh."
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full border transition-all ${
                isScrolled
                  ? 'border-[#DDD8CC] text-[#171717] hover:bg-[#F4F1EA] hover:border-[#B89A5A]'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
              title="Chat on WhatsApp"
              aria-label="Chat with property advisor on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </a>

            <a
              href="tel:+916356548117"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                isScrolled
                  ? 'border-[#DDD8CC] text-[#171717] hover:bg-[#F4F1EA]'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
              title="Call Tirupati Real Estate"
            >
              <Phone className="w-3.5 h-3.5 text-[#B89A5A]" />
              <span className="hidden md:inline">+91 63565 48117</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={() => onOpenSiteVisit()}
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#11110F] text-[#FAF9F6] border border-[#11110F] rounded-md transition-all duration-300 hover:bg-[#B89A5A] hover:border-[#B89A5A] hover:text-[#11110F] shadow-sm cursor-pointer"
            >
              <span>Book a Site Visit</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden gap-2">
            <button
              onClick={() => onOpenSiteVisit()}
              className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-[#11110F] text-white rounded border border-[#11110F]"
            >
              Visit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                isScrolled ? 'text-[#171717]' : 'text-white'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#DDD8CC] text-[#171717] px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            <div className="pb-3 border-b border-[#DDD8CC]/60 flex items-center justify-between">
              <div>
                <p className="font-editorial text-lg font-bold text-[#11110F]">TIRUPATI REAL ESTATE</p>
                <p className="text-[11px] text-[#6D6A63] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#B89A5A]" />
                  New Collector Office Back, Junagadh
                </p>
              </div>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className="text-left py-1.5 text-sm uppercase tracking-wider font-medium text-[#171717] hover:text-[#B89A5A] transition-colors"
              >
                {link.label}
              </button>
            ))}

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left py-1.5 text-sm uppercase tracking-wider font-semibold text-[#8D713C] flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Lead Portal</span>
              </button>
            )}

            <div className="pt-4 border-t border-[#DDD8CC] space-y-3">
              <a
                href="tel:+916356548117"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md border border-[#DDD8CC] text-sm font-medium text-[#11110F] hover:bg-[#F4F1EA]"
              >
                <Phone className="w-4 h-4 text-[#B89A5A]" />
                <span>Call +91 63565 48117</span>
              </a>

              <a
                href="https://wa.me/916356548117?text=Hello%20Tirupati%20Real%20Estate%2C%20I%20am%20looking%20for%20property%20assistance%20in%20Junagadh."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 text-sm font-medium text-[#11110F]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSiteVisit();
                }}
                className="w-full py-3 px-4 rounded-md bg-[#11110F] text-white text-sm font-semibold tracking-wider uppercase hover:bg-[#B89A5A] hover:text-[#11110F] transition-colors"
              >
                Book a Site Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
