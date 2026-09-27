import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/config';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hello Tirupati Real Estate, I am looking for property assistance in Junagadh.'
  )}`;

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex items-center gap-3">
      {/* Subtle Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#11110F] text-white text-xs px-3.5 py-2 rounded-lg shadow-xl border border-white/10 animate-in fade-in duration-300">
          <span>Chat with Junagadh Advisor</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white ml-1"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_6px_24px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        title="Chat on WhatsApp"
        aria-label="Chat with Tirupati Real Estate on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
