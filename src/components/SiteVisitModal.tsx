import React from 'react';
import { X, Calendar } from 'lucide-react';
import { AppointmentEnquiryForm } from './AppointmentEnquiryForm';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPropertyTitle?: string;
}

export const SiteVisitModal: React.FC<SiteVisitModalProps> = ({
  isOpen,
  onClose,
  selectedPropertyTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F6] w-full max-w-2xl rounded-2xl border border-[#DDD8CC] shadow-2xl overflow-hidden my-6">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-[#6D6A63] hover:text-[#11110F] hover:bg-[#F4F1EA] transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded Enquiry & Appointment System */}
        <div className="p-2 sm:p-4">
          <AppointmentEnquiryForm
            initialPropertyTitle={selectedPropertyTitle}
            initialAppointmentType="PROPERTY_VISIT"
            initialRequirement="BUY"
            compact={true}
          />
        </div>
      </div>
    </div>
  );
};
