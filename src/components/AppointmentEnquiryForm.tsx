import React, { useState } from 'react';
import {
  Calendar,
  User,
  Phone,
  Mail,
  Building2,
  Wallet,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Home,
  Check,
  RotateCcw,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/config';

export type AppointmentType = 'PROPERTY_VISIT' | 'MEETING_CONSULTATION';
export type RequirementType = 'BUY' | 'RENT' | 'SELL' | 'INVESTMENT' | 'PROPERTY_CONSULTATION';

interface AppointmentEnquiryFormProps {
  initialProperty?: {
    id: string;
    title: string;
    propertyType?: string;
    locality?: string;
    price?: string;
  };
  initialPropertyTitle?: string;
  initialAppointmentType?: AppointmentType;
  initialRequirement?: RequirementType;
  onSuccess?: () => void;
  compact?: boolean;
}

export const AppointmentEnquiryForm: React.FC<AppointmentEnquiryFormProps> = ({
  initialProperty,
  initialPropertyTitle,
  initialAppointmentType = 'PROPERTY_VISIT',
  initialRequirement = 'BUY',
  onSuccess,
  compact = false,
}) => {
  // Current active step (1 to 6)
  const [currentStep, setCurrentStep] = useState<number>(1);

  const activeTitle = initialProperty?.title || initialPropertyTitle;
  const activePropertyId = initialProperty?.id || '';

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Contact
    fullName: '',
    phone: '',
    email: '',
    preferredContactMethod: 'WhatsApp' as 'WhatsApp' | 'Phone Call' | 'Email',
    // Step 2: What are you looking for
    requirementType: initialRequirement,
    // Step 3: Property Type & Specific Property
    propertyType: initialProperty?.propertyType || (activeTitle ? 'House / Bungalow' : 'House'),
    propertyId: activePropertyId,
    propertyName: activeTitle || '',
    interestedInProperty: !!activeTitle,
    // Step 4: Budget
    budget: initialProperty?.price || '₹50 Lakh–₹1 Crore',
    customBudget: '',
    // Step 5: Location Preference
    preferredLocation: initialProperty?.locality || 'Junagadh',
    specificLocationNotes: '',
    // Step 6: Detailed Requirements
    bedrooms: '3 BHK',
    plotSize: '',
    commercialType: 'Retail Showroom',
    monthlyRentalBudget: '₹20,000 – ₹35,000',
    sellExpectedPrice: '',
    // Notes
    customNotes: activeTitle
      ? `Property Gami Chhe / Interested in this Property: [${activePropertyId || 'Ref'}] ${activeTitle}${initialProperty?.price ? ` (Price: ${initialProperty.price})` : ''}`
      : '',
    // Appointment preference (no date/time - handled directly via WhatsApp)
    appointmentType: initialAppointmentType,
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission state
  const [submittedAppointment, setSubmittedAppointment] = useState<any | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string>('');

  // Validation functions
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Please enter your full name.';
      }
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (!cleanPhone) {
        newErrors.phone = 'Please enter your phone number.';
      } else if (cleanPhone.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      } else if (/^0{10}$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid active phone number.';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (step === 5) {
      if (!formData.preferredLocation.trim()) {
        newErrors.preferredLocation = 'Please specify your preferred area.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `*New Enquiry - TIRUPATI REAL ESTATE*`,
      ``,
      `*Name:* ${formData.fullName}`,
      `*Phone:* ${formData.phone}`,
      formData.email ? `*Email:* ${formData.email}` : '',
      `*Preferred Contact:* ${formData.preferredContactMethod}`,
      `*Appointment Type:* ${formData.appointmentType === 'PROPERTY_VISIT' ? 'Property Visit' : 'Meeting / Consultation'}`,
      `*Looking For:* ${formData.requirementType}`,
      `*Property Type:* ${formData.propertyType}`,
      formData.propertyName ? `*Property of Interest:* ${formData.propertyName}` : '',
      `*Budget:* ${formData.customBudget || formData.budget}`,
      `*Preferred Location:* ${
        formData.specificLocationNotes
          ? `${formData.preferredLocation} (${formData.specificLocationNotes})`
          : formData.preferredLocation
      }`,
      formData.requirementType === 'BUY' ? `*Bedrooms:* ${formData.bedrooms}` : '',
      formData.plotSize ? `*Plot Size:* ${formData.plotSize}` : '',
      formData.customNotes ? `*Notes:* ${formData.customNotes}` : '',
    ].filter(Boolean).join('\n');

    const encodedMessage = encodeURIComponent(lines);
    const waUrl = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodedMessage}`;

    setWhatsAppUrl(waUrl);
    setSubmittedAppointment({
      fullName: formData.fullName,
      appointmentType: formData.appointmentType,
      requirementType: formData.requirementType,
      propertyType: formData.propertyType,
      budget: formData.customBudget || formData.budget,
      preferredLocation: formData.preferredLocation,
      customNotes: formData.customNotes,
    });

    window.open(waUrl, '_blank');

    if (onSuccess) onSuccess();
  };

  // ----------------------------------------------------
  // SUCCESS / CONFIRMATION VIEW
  // ----------------------------------------------------
  if (submittedAppointment) {
    const isVisit = submittedAppointment.appointmentType === 'PROPERTY_VISIT';
    return (
      <div className="bg-[#FAF9F6] border border-[#DDD8CC] rounded-2xl p-6 sm:p-10 shadow-xl max-w-2xl mx-auto text-[#171717] animate-in fade-in duration-300">
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#B89A5A]/20 border border-[#B89A5A] text-[#8D713C] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#11110F]">
            Enquiry Sent
          </h3>
          <p className="text-xs sm:text-sm text-[#6D6A63] max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-[#11110F]">{submittedAppointment.fullName}</strong>. Please tap the button below to send your enquiry to us on WhatsApp so our senior property advisor can confirm a convenient date and time for your {isVisit ? 'property site visit' : 'office consultation'}.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-[#F4F1EA] border border-[#DDD8CC] rounded-xl p-5 sm:p-6 mb-8 text-xs sm:text-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#DDD8CC]/70 pb-2.5">
            <span className="text-[#6D6A63]">Appointment Type:</span>
            <span className="font-semibold text-[#11110F]">
              {isVisit ? 'Property Visit' : 'Meeting / Consultation'}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[#DDD8CC]/70 pb-2.5">
            <span className="text-[#6D6A63]">Requirement:</span>
            <span className="font-semibold text-[#11110F]">
              {submittedAppointment.requirementType} — {submittedAppointment.propertyType}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[#DDD8CC]/70 pb-2.5">
            <span className="text-[#6D6A63]">Approx. Budget:</span>
            <span className="font-semibold text-[#11110F]">
              {submittedAppointment.budget}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[#DDD8CC]/70 pb-2.5">
            <span className="text-[#6D6A63]">Preferred Area:</span>
            <span className="font-semibold text-[#11110F]">
              {submittedAppointment.preferredLocation}
            </span>
          </div>

          <div className="pt-1">
            <span className="text-[#6D6A63] block mb-1">Your Requirements / Notes:</span>
            <p className="bg-[#FAF9F6] p-3 rounded-lg border border-[#DDD8CC] text-[#171717] italic text-xs">
              "{submittedAppointment.customNotes || 'Looking forward to discussing suitable options.'}"
            </p>
          </div>
        </div>

        {/* Confirmation Action Buttons */}
        <div className="space-y-3">
          {whatsAppUrl && (
             '<a'
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#20bd5a] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Enquiry on WhatsApp</span>
            </a>
          )}

          <button
            onClick={() => {
              setSubmittedAppointment(null);
              setCurrentStep(1);
            }}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer"
          >
            <span>Send Another Enquiry</span>
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-[#6D6A63] text-center mt-6">
          Office Location: New Collector Office Back, Junagadh • Helpline: {BUSINESS_INFO.phone}
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // MULTI-STEP FORM FLOW
  // ----------------------------------------------------
  return (
    <div className={`bg-[#FAF9F6] border border-[#DDD8CC] rounded-2xl shadow-xl overflow-hidden ${compact ? 'p-4 sm:p-6' : 'p-6 sm:p-10'} text-[#171717]`}>
      {/* Form Header with Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B89A5A]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-[#8D713C]">
              TIRUPATI PROPERTY ADVISORY
            </span>
          </div>
          <span className="text-xs font-semibold text-[#6D6A63]">
            Step {currentStep} of 6
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-1.5 bg-[#DDD8CC]/50 rounded-full overflow-hidden flex">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-full flex-1 transition-all duration-300 ${
                s <= currentStep ? 'bg-[#11110F]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------
          STEP 1: CONTACT DETAILS
      ---------------------------------------------------- */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#11110F]">
              Your Contact Information
            </h3>
            <p className="text-xs sm:text-sm text-[#6D6A63] mt-1">
              Please provide your direct details so our Junagadh property team can coordinate your inquiry.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-1.5">
                Full Name <span className="text-[#8D713C]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className={`w-full bg-[#F4F1EA] text-[#11110F] text-xs sm:text-sm py-3 px-3.5 pl-10 rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-[#DDD8CC]'
                  } focus:outline-none focus:border-[#B89A5A]`}
                />
                <User className="w-4 h-4 text-[#8D713C] absolute left-3.5 top-3.5" />
              </div>
              {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-1.5">
                Phone Number (WhatsApp Active) <span className="text-[#8D713C]">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 6356548117"
                  className={`w-full bg-[#F4F1EA] text-[#11110F] text-xs sm:text-sm py-3 px-3.5 pl-10 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-[#DDD8CC]'
                  } focus:outline-none focus:border-[#B89A5A]`}
                />
                <Phone className="w-4 h-4 text-[#8D713C] absolute left-3.5 top-3.5" />
              </div>
              <p className="text-[10px] text-[#6D6A63] mt-1">
                Enter your 10-digit Indian mobile number for appointment confirmations.
              </p>
              {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-1.5">
                Preferred Contact Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'WhatsApp', label: 'WhatsApp', icon: MessageCircle },
                  { id: 'Phone Call', label: 'Phone Call', icon: Phone },
                  { id: 'Email', label: 'Email', icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.preferredContactMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredContactMethod: item.id as any })}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#11110F] text-[#FAF9F6] border-[#11110F] shadow-sm'
                          : 'bg-[#F4F1EA] text-[#6D6A63] border-[#DDD8CC] hover:text-[#11110F] hover:border-[#B89A5A]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B89A5A]' : 'text-[#8D713C]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-1.5">
                Email Address (Optional)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. customer@gmail.com"
                  className={`w-full bg-[#F4F1EA] text-[#11110F] text-xs sm:text-sm py-3 px-3.5 pl-10 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-[#DDD8CC]'
                  } focus:outline-none focus:border-[#B89A5A]`}
                />
                <Mail className="w-4 h-4 text-[#8D713C] absolute left-3.5 top-3.5" />
              </div>
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          STEP 2: WHAT ARE YOU LOOKING FOR?
      ---------------------------------------------------- */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#11110F]">
              What are you looking for?
            </h3>
            <p className="text-xs sm:text-sm text-[#6D6A63] mt-1">
              Select your primary requirement so we can tailor options accurately.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { id: 'BUY', title: 'BUY A PROPERTY', desc: 'Looking to purchase a home, plot, bungalow, or land.' },
              { id: 'RENT', title: 'RENT A PROPERTY', desc: 'Searching for a family residence or commercial lease.' },
              { id: 'SELL', title: 'SELL MY PROPERTY', desc: 'Connect with qualified buyers for houses, plots, or commercial.' },
              { id: 'INVESTMENT', title: 'PROPERTY INVESTMENT', desc: 'Strategic high-growth land corridors and commercial assets.' },
              { id: 'PROPERTY_CONSULTATION', title: 'PROPERTY CONSULTATION', desc: 'Title verification, revenue maps, valuation, and general advice.' },
            ].map((item) => {
              const isSelected = formData.requirementType === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setFormData({ ...formData, requirementType: item.id as RequirementType })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#11110F] text-white border-[#11110F] shadow-md'
                      : 'bg-[#F4F1EA] text-[#171717] border-[#DDD8CC] hover:border-[#B89A5A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-editorial text-base sm:text-lg font-bold tracking-wide">
                      {item.title}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#B89A5A] text-[#11110F] flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className={`text-xs ${isSelected ? 'text-[#DDD8CC]' : 'text-[#6D6A63]'}`}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          STEP 3: PROPERTY TYPE
      ---------------------------------------------------- */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#11110F]">
              {formData.requirementType === 'SELL'
                ? 'What property would you like to sell?'
                : 'Select Property Type'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6D6A63] mt-1">
              Choose the category that best represents your interest.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              'House / Bungalow',
              'Apartment',
              'Residential Plot',
              'Land / Agricultural',
              'Commercial Showroom',
              'Office Space',
              'Shop',
              'Other',
            ].map((type) => {
              const isSelected = formData.propertyType === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, propertyType: type })}
                  className={`p-3.5 rounded-xl border text-left text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#11110F] text-white border-[#11110F] shadow-sm'
                      : 'bg-[#F4F1EA] text-[#171717] border-[#DDD8CC] hover:border-[#B89A5A]'
                  }`}
                >
                  <Building2 className={`w-4 h-4 mb-2 ${isSelected ? 'text-[#B89A5A]' : 'text-[#8D713C]'}`} />
                  <span>{type}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          STEP 4: BUDGET
      ---------------------------------------------------- */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#11110F]">
              Your Approximate Budget
            </h3>
            <p className="text-xs sm:text-sm text-[#6D6A63] mt-1">
              {formData.requirementType === 'RENT'
                ? 'Approximate monthly rental budget.'
                : formData.requirementType === 'SELL'
                ? 'Expected price range for your property.'
                : 'Indicative purchase or investment range.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              'Under ₹10 Lakh',
              '₹10–25 Lakh',
              '₹25–50 Lakh',
              '₹50 Lakh–₹1 Crore',
              '₹1–2 Crore',
              '₹2 Crore+',
              'Custom Budget',
            ].map((budgetOption) => {
              const isSelected = formData.budget === budgetOption;
              return (
                <button
                  type="button"
                  key={budgetOption}
                  onClick={() => setFormData({ ...formData, budget: budgetOption })}
                  className={`p-3.5 rounded-xl border text-center text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#11110F] text-white border-[#11110F] shadow-sm'
                      : 'bg-[#F4F1EA] text-[#171717] border-[#DDD8CC] hover:border-[#B89A5A]'
                  }`}
                >
                  <Wallet className={`w-4 h-4 mx-auto mb-1.5 ${isSelected ? 'text-[#B89A5A]' : 'text-[#8D713C]'}`} />
                  <span>{budgetOption}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-1.5">
              Specific or Custom Budget Notes (Optional)
            </label>
            <input
              type="text"
              value={formData.customBudget}
              onChange={(e) => setFormData({ ...formData, customBudget: e.target.value })}
              placeholder="e.g. ₹65 to 75 Lakhs, or ₹25,000/month rent"
              className="w-full bg-[#F4F1EA] text-[#11110F] text-xs sm:text-sm py-3 px-3.5 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A]"
            />
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          STEP 5: LOCATION & PROPERTY REQUIREMENTS
      ---------------------------------------------------- */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#11110F]">
              Location & Specific Requirements
            </h3>
            <p className="text-xs sm:text-sm text-[#6D6A63] mt-1">
              Help us pinpoint the exact area and specifications you desire.
            </p>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-2">
              Preferred Junagadh Locality
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {[
                'Near New Collector Office',
                'Zanzarda Road',
                'Motibaug Area',
                'Rayji Baug / College Road',
                'Bilkha Road Corridor',
                'Any Prime Junagadh Area',
              ].map((loc) => {
                const isSelected = formData.preferredLocation === loc;
                return (
                  <button
                    type="button"
                    key={loc}
                    onClick={() => setFormData({ ...formData, preferredLocation: loc })}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#11110F] text-white border-[#11110F]'
                        : 'bg-[#F4F1EA] text-[#171717] border-[#DDD8CC] hover:border-[#B89A5A]'
                    }`}
                  >
                    <span className="line-clamp-1">{loc}</span>
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={formData.specificLocationNotes}
              onChange={(e) => setFormData({ ...formData, specificLocationNotes: e.target.value })}
              placeholder="Or enter custom street/colony/landmark..."
              className="w-full bg-[#F4F1EA] text-[#11110F] text-xs sm:text-sm py-2.5 px-3 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A]"
            />
          </div>

          {(formData.propertyType.includes('House') || formData.propertyType.includes('Apartment')) && (
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-2">
                Bedrooms (BHK)
              </label>
              <div className="flex flex-wrap gap-2">
                {['1 BHK', '2 BHK', '3 BHK', '4 BHK+', 'Not Sure'].map((bhk) => (
                  <button
                    type="button"
                    key={bhk}
                    onClick={() => setFormData({ ...formData, bedrooms: bhk })}
                    className={`px-3.5 py-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                      formData.bedrooms === bhk
                        ? 'bg-[#11110F] text-white border-[#11110F]'
                        : 'bg-[#F4F1EA] text-[#171717] border-[#DDD8CC]'
                    }`}
                  >
                    {bhk}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(formData.propertyType.includes('Plot') || formData.propertyType.includes('Land')) && (
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-1.5">
                Preferred Plot/Land Size (Sq. Yards / Vigha)
              </label>
              <input
                type="text"
                value={formData.plotSize}
                onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                placeholder="e.g. 200–300 Sq. Yards, or 2 Vigha agricultural"
                className="w-full bg-[#F4F1EA] text-[#11110F] text-xs sm:text-sm py-2.5 px-3 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A]"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#11110F] mb-1.5">
              Tell us what you are looking for (Specific Requirements / Notes)
            </label>
            <textarea
              rows={3}
              value={formData.customNotes}
              onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
              placeholder="Example: I am looking for a 3 BHK house near a specific area, preferably with parking, within my budget..."
              className="w-full bg-[#F4F1EA] text-[#11110F] text-xs sm:text-sm py-3 px-3.5 rounded-lg border border-[#DDD8CC] focus:outline-none focus:border-[#B89A5A] resize-none"
            />
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          STEP 6: HOW WOULD YOU LIKE TO CONNECT + SEND VIA WHATSAPP
      ---------------------------------------------------- */}
      {currentStep === 6 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#11110F]">
              How Would You Like to Connect?
            </h3>
            <p className="text-xs sm:text-sm text-[#6D6A63] mt-1">
              Choose whether you prefer an accompanied property visit or an office consultation. Our team will contact you on WhatsApp shortly to fix a convenient date and time.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setFormData({ ...formData, appointmentType: 'PROPERTY_VISIT' })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.appointmentType === 'PROPERTY_VISIT'
                    ? 'bg-[#11110F] text-white border-[#11110F] shadow-sm'
                    : 'bg-[#F4F1EA] text-[#171717] border-[#DDD8CC] hover:border-[#B89A5A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-editorial text-base sm:text-lg font-bold">PROPERTY VISIT</span>
                  <Home className={`w-4 h-4 ${formData.appointmentType === 'PROPERTY_VISIT' ? 'text-[#B89A5A]' : 'text-[#8D713C]'}`} />
                </div>
                <p className={`text-xs ${formData.appointmentType === 'PROPERTY_VISIT' ? 'text-[#DDD8CC]' : 'text-[#6D6A63]'}`}>
                  Visit a property in person with our senior advisor.
                </p>
              </div>

              <div
                onClick={() => setFormData({ ...formData, appointmentType: 'MEETING_CONSULTATION' })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.appointmentType === 'MEETING_CONSULTATION'
                    ? 'bg-[#11110F] text-white border-[#11110F] shadow-sm'
                    : 'bg-[#F4F1EA] text-[#171717] border-[#DDD8CC] hover:border-[#B89A5A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-editorial text-base sm:text-lg font-bold">MEETING / CONSULTATION</span>
                  <Building2 className={`w-4 h-4 ${formData.appointmentType === 'MEETING_CONSULTATION' ? 'text-[#B89A5A]' : 'text-[#8D713C]'}`} />
                </div>
                <p className={`text-xs ${formData.appointmentType === 'MEETING_CONSULTATION' ? 'text-[#DDD8CC]' : 'text-[#6D6A63]'}`}>
                  Meet our team to discuss your property requirement.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#DDD8CC] flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#8D713C] mt-0.5 shrink-0" />
            <p className="text-xs text-[#6D6A63]">
              No need to pick a date/time here — tap the button below and your enquiry details will open directly in WhatsApp. Our team will confirm the best date & time with you personally.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#20bd5a] transition-all cursor-pointer shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Enquiry on WhatsApp</span>
            </button>
          </div>
        </form>
      )}

      {/* ----------------------------------------------------
          NAVIGATION CONTROLS (PREV / NEXT)
      ---------------------------------------------------- */}
      {currentStep < 6 && (
        <div className="mt-8 pt-4 border-t border-[#DDD8CC]/70 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-[#DDD8CC] text-xs font-semibold uppercase tracking-wider text-[#11110F] hover:bg-[#F4F1EA] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-md bg-[#11110F] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#B89A5A] hover:text-[#11110F] transition-all cursor-pointer shadow-sm"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
