import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Copy, 
  Check, 
  Edit3, 
  Calendar, 
  School, 
  MapPin, 
  Package, 
  Sparkles, 
  AlertCircle, 
  ArrowRight,
  Sliders,
  DollarSign
} from 'lucide-react';
import { STUDENT_PACKAGES, CAMPUS_SCHOOLS_LIST, StudentPackage } from '../../data/studentPackagesData';
import { createWhatsAppUrl, formatNaira, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';

interface StudentOrderFormProps {
  initialSelectedPackageId?: string;
  onClearPackageSelection?: () => void;
}

export function StudentOrderForm({
  initialSelectedPackageId,
  onClearPackageSelection
}: StudentOrderFormProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [otherSchool, setOtherSchool] = useState('');
  const [hostelLocation, setHostelLocation] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState(initialSelectedPackageId || 'pkg-10000');
  const [customBudget, setCustomBudget] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [preferredDate, setPreferredDate] = useState('');
  const [wantCustomisation, setWantCustomisation] = useState<boolean>(false);
  const [customisationDetails, setCustomisationDetails] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync initialSelectedPackageId if changed from outside
  useEffect(() => {
    if (initialSelectedPackageId) {
      setSelectedPackageId(initialSelectedPackageId);
    }
  }, [initialSelectedPackageId]);

  // Tomorrow's date as min for preferred delivery date
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDeliveryDate = today.toISOString().split('T')[0];

  const currentPkg = STUDENT_PACKAGES.find(p => p.id === selectedPackageId) || STUDENT_PACKAGES[1];
  const isCustomPackage = selectedPackageId === 'pkg-custom';

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!phone.trim() || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid WhatsApp number (at least 10 digits).';
    }

    if (!selectedSchool) {
      newErrors.school = 'Please select your school or institution.';
    } else if (selectedSchool === 'school-other' && !otherSchool.trim()) {
      newErrors.otherSchool = 'Please enter the name of your school / campus.';
    }

    if (!hostelLocation.trim()) {
      newErrors.hostelLocation = 'Please specify your hostel, hall of residence, or campus location.';
    }

    if (!deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Please enter your delivery address or nearest landmark.';
    }

    if (isCustomPackage) {
      const budgetNum = parseFloat(customBudget.replace(/[^0-9]/g, ''));
      if (!customBudget.trim() || isNaN(budgetNum) || budgetNum < 1000) {
        newErrors.customBudget = 'Please enter your budget amount (e.g. ₦8,500).';
      }
    }

    if (quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1.';
    }

    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a preferred delivery date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getResolvedSchoolName = () => {
    if (selectedSchool === 'school-other') {
      return otherSchool.trim() || 'Other Institution';
    }
    const found = CAMPUS_SCHOOLS_LIST.find(s => s.id === selectedSchool);
    return found ? found.name : selectedSchool;
  };

  const generateWhatsAppMessage = () => {
    const schoolName = getResolvedSchoolName();

    if (isCustomPackage) {
      const budgetFormatted = customBudget.startsWith('₦') ? customBudget : `₦${customBudget}`;
      return [
        `Hello Precious Gem Foods Ventures,`,
        ``,
        `I would like to request a custom Student Food Package.`,
        ``,
        `Name: ${fullName.trim()}`,
        `Phone/WhatsApp: ${phone.trim()}`,
        `School: ${schoolName}`,
        `Location / Hostel: ${hostelLocation.trim()}`,
        `Delivery Address & Landmark: ${deliveryAddress.trim()}`,
        `Budget: ${budgetFormatted} per package`,
        `Quantity: ${quantity}`,
        `Preferred Delivery Date: ${preferredDate}`,
        wantCustomisation && customisationDetails.trim() 
          ? `Preferred Food Items / Custom Request: ${customisationDetails.trim()}` 
          : `Custom Request: Tailor package staples according to my budget.`,
        additionalNotes.trim() ? `Additional Information: ${additionalNotes.trim()}` : '',
        ``,
        `Please advise me on the available package options within my budget.`,
        ``,
        `Thank you.`
      ].filter(line => line !== undefined).join('\n');
    }

    // Standard Package
    const budgetPerPackage = formatNaira(currentPkg.price);
    const totalEst = formatNaira(currentPkg.price * quantity);

    return [
      `Hello Precious Gem Foods Ventures,`,
      ``,
      `I would like to make an enquiry about a Student Food Package.`,
      ``,
      `Name: ${fullName.trim()}`,
      `Phone/WhatsApp: ${phone.trim()}`,
      `School: ${schoolName}`,
      `Hostel/Residence: ${hostelLocation.trim()}`,
      `Delivery Address: ${deliveryAddress.trim()}`,
      ``,
      `Selected Package: ${currentPkg.name}`,
      `Quantity: ${quantity}`,
      `Budget: ${budgetPerPackage} per package`,
      quantity > 1 ? `Total Estimated Budget: ${totalEst} (${quantity} packages)` : '',
      ``,
      `Preferred Delivery Date: ${preferredDate}`,
      ``,
      `Customisation: ${wantCustomisation ? 'Yes' : 'No'}`,
      wantCustomisation && customisationDetails.trim() 
        ? `Custom Request: ${customisationDetails.trim()}` 
        : '',
      additionalNotes.trim() 
        ? `Additional Information:\n${additionalNotes.trim()}` 
        : '',
      ``,
      `Please confirm availability, package details and delivery arrangements.`,
      ``,
      `Thank you.`
    ].filter(line => line !== undefined && line !== '').join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('.error-input');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setIsSubmitted(true);
  };

  const handleContinueToWhatsApp = () => {
    const msg = generateWhatsAppMessage();
    const url = createWhatsAppUrl(msg, PGFV_WHATSAPP_PHONE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const msg = generateWhatsAppMessage();
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // ----------------------------------------------------
  // ENQUIRY CONFIRMATION READY VIEW
  // ----------------------------------------------------
  if (isSubmitted) {
    const schoolName = getResolvedSchoolName();
    const message = generateWhatsAppMessage();

    return (
      <div 
        id="student-enquiry-confirmation" 
        className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3DCD0] shadow-xl max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300"
      >
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#1B4332] text-[#E2B13C] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1B4332] bg-[#E2B13C]/20 px-3 py-1 rounded-full">
            ENQUIRY PREPARED & READY
          </span>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
            Your Student Food Package Enquiry Is Ready!
          </h3>
          <p className="text-sm text-[#5B6B62] max-w-lg mx-auto">
            Click below to continue to WhatsApp. Your enquiry will be sent directly to the PGFV team at <strong>{PGFV_WHATSAPP_DISPLAY}</strong> to confirm availability and delivery.
          </p>
        </div>

        {/* Structured Summary Box */}
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8E1D5] space-y-3.5 text-xs sm:text-sm text-[#3E4D45]">
          <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-2 font-bold text-[#143527]">
            <span>Order Enquiry Details</span>
            <span className="text-[#C68A1B]">
              {isCustomPackage ? 'Custom Package' : currentPkg.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#7A8A82] block">Student Name:</span>
              <strong className="text-[#143527]">{fullName}</strong>
            </div>
            <div>
              <span className="text-[#7A8A82] block">WhatsApp Contact:</span>
              <strong className="text-[#143527]">{phone}</strong>
            </div>
            <div>
              <span className="text-[#7A8A82] block">School / Campus:</span>
              <strong className="text-[#143527]">{schoolName}</strong>
            </div>
            <div>
              <span className="text-[#7A8A82] block">Hostel / Location:</span>
              <strong className="text-[#143527]">{hostelLocation}</strong>
            </div>
            <div>
              <span className="text-[#7A8A82] block">Delivery Address:</span>
              <strong className="text-[#143527]">{deliveryAddress}</strong>
            </div>
            <div>
              <span className="text-[#7A8A82] block">Preferred Delivery Date:</span>
              <strong className="text-[#143527]">{preferredDate}</strong>
            </div>
            <div>
              <span className="text-[#7A8A82] block">Quantity:</span>
              <strong className="text-[#143527]">{quantity} package{quantity > 1 ? 's' : ''}</strong>
            </div>
            <div>
              <span className="text-[#7A8A82] block">Budget:</span>
              <strong className="text-[#143527]">
                {isCustomPackage ? customBudget : formatNaira(currentPkg.price * quantity)}
              </strong>
            </div>
          </div>

          {wantCustomisation && customisationDetails && (
            <div className="pt-2 border-t border-[#E8E1D5] text-xs">
              <span className="text-[#7A8A82] block font-medium">Customisation Note:</span>
              <p className="text-[#143527] italic">{customisationDetails}</p>
            </div>
          )}
        </div>

        {/* Message Preview Box */}
        <div className="bg-[#122A20] text-[#E4EDE7] p-4 rounded-2xl font-mono text-xs max-h-48 overflow-y-auto whitespace-pre-wrap border border-[#1E3F31]">
          {message}
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleContinueToWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] font-bold py-4 px-6 rounded-2xl text-base shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Continue to WhatsApp (09167621558)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleCopyMessage}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[#D5CDC0] text-xs font-bold text-[#4E5C54] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#7A8A82]" />
                  <span>Copy Message Text</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-white border border-[#D5CDC0] text-xs font-bold text-[#143527] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-[#7A8A82]" />
              <span>Edit Details</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#7A8A82] text-center pt-2">
          * Your preferred delivery date will be confirmed by the PGFV team on WhatsApp based on availability and logistics.
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // INTERACTIVE ORDER FORM VIEW
  // ----------------------------------------------------
  return (
    <form 
      id="student-order-form" 
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3DCD0] shadow-sm space-y-8"
      noValidate
    >
      <div className="border-b border-[#EBE4D8] pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B4332] bg-[#E2B13C]/20 px-3 py-1 rounded-full w-fit mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C68A1B]" />
          <span>DIRECT CAMPUS ENQUIRY</span>
        </div>
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
          Student Food Package Order & Enquiry Form
        </h3>
        <p className="text-sm text-[#5B6B62] mt-1.5">
          Select or customize your package, fill in your campus delivery details, and send your request straight to WhatsApp.
        </p>
      </div>

      {/* SECTION 1: PACKAGE SELECTION */}
      <div className="space-y-4">
        <label className="block font-heading font-bold text-sm text-[#143527] flex items-center gap-2">
          <Package className="w-4 h-4 text-[#C68A1B]" />
          <span>1. Select Package</span>
          <span className="text-xs font-normal text-[#7A8A82]">(Choose a budget option)</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STUDENT_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <button
                type="button"
                key={pkg.id}
                onClick={() => {
                  setSelectedPackageId(pkg.id);
                  if (onClearPackageSelection) onClearPackageSelection();
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#1B4332] bg-[#FAF7F2] ring-2 ring-[#1B4332]/20 shadow-sm'
                    : 'border-[#E8E1D5] hover:border-[#1B4332]/40 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1B4332]/10 text-[#1B4332]">
                      {pkg.badge}
                    </span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#1B4332] bg-[#1B4332] text-white' : 'border-[#D0C7B9]'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#143527]">
                    {pkg.price > 0 ? formatNaira(pkg.price) : 'Custom Budget'}
                  </h4>
                  <p className="text-[11px] text-[#67776F] line-clamp-2 mt-1">
                    {pkg.name}
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-[#1B4332] font-semibold">
                  {pkg.items.length} food items included
                </div>
              </button>
            );
          })}
        </div>

        {/* CUSTOM BUDGET FIELD (Revealed if pkg-custom selected) */}
        {isCustomPackage && (
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2B13C]/60 space-y-2 animate-in fade-in duration-200">
            <label htmlFor="custom-budget-input" className="block text-xs font-bold text-[#143527] flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#C68A1B]" />
              <span>What is your specific budget? *</span>
            </label>
            <div className="relative max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#143527] font-bold text-sm">
                ₦
              </span>
              <input
                id="custom-budget-input"
                type="text"
                value={customBudget}
                onChange={(e) => {
                  setCustomBudget(e.target.value);
                  if (errors.customBudget) {
                    setErrors(prev => ({ ...prev, customBudget: '' }));
                  }
                }}
                placeholder="e.g. 8,500 or 12,000"
                className={`w-full pl-8 pr-4 py-2.5 rounded-xl border bg-white text-sm text-[#143527] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
                  errors.customBudget ? 'border-red-500 error-input' : 'border-[#D5CCBE]'
                }`}
              />
            </div>
            {errors.customBudget && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.customBudget}</span>
              </p>
            )}
            <p className="text-[11px] text-[#67776F]">
              Enter any reasonable budget. We will propose the ideal combination of staples to fit your amount.
            </p>
          </div>
        )}

        {/* QUANTITY FIELD */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
          <label htmlFor="quantity-select" className="text-xs font-bold text-[#143527]">
            How many packages do you need?
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 5, 10].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setQuantity(num)}
                className={`w-9 h-9 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  quantity === num 
                    ? 'bg-[#1B4332] text-white border-[#1B4332]' 
                    : 'bg-white text-[#4A5750] border-[#D5CCBE] hover:border-[#1B4332]'
                }`}
              >
                {num}
              </button>
            ))}
            <input
              id="quantity-select"
              type="number"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 py-2 px-2 text-center text-xs font-bold rounded-xl border border-[#D5CCBE] bg-white text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              title="Enter custom quantity"
            />
          </div>
          {quantity > 1 && !isCustomPackage && (
            <span className="text-xs text-[#1B4332] font-semibold bg-[#E2B13C]/20 px-2.5 py-1 rounded-lg">
              Est. Total: {formatNaira(currentPkg.price * quantity)}
            </span>
          )}
        </div>
      </div>

      {/* SECTION 2: STUDENT CONTACT INFORMATION */}
      <div className="space-y-4 pt-4 border-t border-[#EBE4D8]">
        <h4 className="font-heading font-bold text-sm text-[#143527] flex items-center gap-2">
          <School className="w-4 h-4 text-[#C68A1B]" />
          <span>2. Personal & Campus Information</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="student-full-name" className="block text-xs font-bold text-[#143527] mb-1.5">
              Full Name *
            </label>
            <input
              id="student-full-name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
              }}
              placeholder="e.g. Oluranti Clement"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
                errors.fullName ? 'border-red-500 error-input' : 'border-[#D5CCBE]'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* WhatsApp Number */}
          <div>
            <label htmlFor="student-phone" className="block text-xs font-bold text-[#143527] mb-1.5">
              Phone / WhatsApp Number *
            </label>
            <input
              id="student-phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
              }}
              placeholder="e.g. 09167621558 or 080..."
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
                errors.phone ? 'border-red-500 error-input' : 'border-[#D5CCBE]'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* School Dropdown */}
        <div>
          <label htmlFor="student-school-select" className="block text-xs font-bold text-[#143527] mb-1.5">
            Select Your School / Institution *
          </label>
          <select
            id="student-school-select"
            value={selectedSchool}
            onChange={(e) => {
              setSelectedSchool(e.target.value);
              if (errors.school) setErrors(prev => ({ ...prev, school: '' }));
            }}
            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
              errors.school ? 'border-red-500 error-input' : 'border-[#D5CCBE]'
            }`}
          >
            <option value="">-- Choose your institution --</option>
            {CAMPUS_SCHOOLS_LIST.map((sch) => (
              <option key={sch.id} value={sch.id}>
                {sch.name}
              </option>
            ))}
          </select>
          {errors.school && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.school}</span>
            </p>
          )}

          {/* If Other selected */}
          {selectedSchool === 'school-other' && (
            <div className="mt-2.5 animate-in fade-in duration-200">
              <input
                type="text"
                value={otherSchool}
                onChange={(e) => {
                  setOtherSchool(e.target.value);
                  if (errors.otherSchool) setErrors(prev => ({ ...prev, otherSchool: '' }));
                }}
                placeholder="Type your institution name & campus location"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
                  errors.otherSchool ? 'border-red-500 error-input' : 'border-[#D5CCBE]'
                }`}
              />
              {errors.otherSchool && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.otherSchool}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: DELIVERY LOCATION & DATE */}
      <div className="space-y-4 pt-4 border-t border-[#EBE4D8]">
        <h4 className="font-heading font-bold text-sm text-[#143527] flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#C68A1B]" />
          <span>3. Hostel & Delivery Location</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hostel / Residence */}
          <div>
            <label htmlFor="student-hostel" className="block text-xs font-bold text-[#143527] mb-1.5">
              Hostel / Residence / Campus Area *
            </label>
            <input
              id="student-hostel"
              type="text"
              value={hostelLocation}
              onChange={(e) => {
                setHostelLocation(e.target.value);
                if (errors.hostelLocation) setErrors(prev => ({ ...prev, hostelLocation: '' }));
              }}
              placeholder="e.g. Mozambique Hall / Fajuyi / Mayfair / Ede Rd"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
                errors.hostelLocation ? 'border-red-500 error-input' : 'border-[#D5CCBE]'
              }`}
            />
            {errors.hostelLocation && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.hostelLocation}</span>
              </p>
            )}
          </div>

          {/* Preferred Delivery Date */}
          <div>
            <label htmlFor="student-date" className="block text-xs font-bold text-[#143527] mb-1.5">
              Preferred Delivery Date *
            </label>
            <div className="relative">
              <input
                id="student-date"
                type="date"
                min={minDeliveryDate}
                value={preferredDate}
                onChange={(e) => {
                  setPreferredDate(e.target.value);
                  if (errors.preferredDate) setErrors(prev => ({ ...prev, preferredDate: '' }));
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
                  errors.preferredDate ? 'border-red-500 error-input' : 'border-[#D5CCBE]'
                }`}
              />
            </div>
            {errors.preferredDate && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.preferredDate}</span>
              </p>
            )}
          </div>
        </div>

        {/* Full Delivery Address / Nearest Landmark */}
        <div>
          <label htmlFor="student-address" className="block text-xs font-bold text-[#143527] mb-1.5">
            Full Delivery Address / Room / Nearest Landmark *
          </label>
          <input
            id="student-address"
            type="text"
            value={deliveryAddress}
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
              if (errors.deliveryAddress) setErrors(prev => ({ ...prev, deliveryAddress: '' }));
            }}
            placeholder="e.g. Block B Room 14, or Gate 2 Opposite Zenith Bank ATM"
            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
              errors.deliveryAddress ? 'border-red-500 error-input' : 'border-[#D5CCBE]'
            }`}
          />
          {errors.deliveryAddress && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.deliveryAddress}</span>
            </p>
          )}
          <p className="text-[11px] text-[#67776F] mt-1">
            * Your preferred delivery date will be confirmed by the PGFV team based on availability and logistics.
          </p>
        </div>
      </div>

      {/* SECTION 4: CUSTOMISATION & SPECIAL REQUESTS */}
      <div className="space-y-4 pt-4 border-t border-[#EBE4D8]">
        <div className="flex items-center justify-between">
          <label className="font-heading font-bold text-sm text-[#143527] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C68A1B]" />
            <span>4. Would you like to customise your package?</span>
          </label>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-[#143527]">
              <input
                type="radio"
                name="customise_option"
                checked={wantCustomisation === true}
                onChange={() => setWantCustomisation(true)}
                className="w-4 h-4 text-[#1B4332] focus:ring-[#1B4332]"
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-[#143527]">
              <input
                type="radio"
                name="customise_option"
                checked={wantCustomisation === false}
                onChange={() => {
                  setWantCustomisation(false);
                  setCustomisationDetails('');
                }}
                className="w-4 h-4 text-[#1B4332] focus:ring-[#1B4332]"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Revealed customisation input */}
        {wantCustomisation && (
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2 animate-in fade-in duration-200">
            <label htmlFor="customisation-textarea" className="block text-xs font-bold text-[#143527]">
              Tell us what you would like to customise:
            </label>
            <textarea
              id="customisation-textarea"
              rows={2}
              value={customisationDetails}
              onChange={(e) => setCustomisationDetails(e.target.value)}
              placeholder="e.g. I prefer more beans flour and rice, but less garri. Or swap catfish for extra eggs if available."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] bg-white text-xs sm:text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
            <p className="text-[11px] text-[#67776F]">
              * Custom requests are subject to product availability and will be confirmed transparently by PGFV on WhatsApp.
            </p>
          </div>
        )}

        {/* Additional Information / Instructions */}
        <div>
          <label htmlFor="additional-notes-textarea" className="block text-xs font-bold text-[#143527] mb-1.5">
            Additional Information / Special Delivery Instructions (Optional)
          </label>
          <textarea
            id="additional-notes-textarea"
            rows={2}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="e.g. Call before coming to hostel gate; best contact time is afternoon after lectures."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] bg-white text-xs sm:text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
          />
        </div>
      </div>

      {/* SUBMISSION BUTTON */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-[#1B4332] hover:bg-[#143527] text-white font-bold py-4 px-6 rounded-2xl text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
          id="submit-student-enquiry-btn"
        >
          <MessageCircle className="w-5 h-5 text-[#E2B13C]" />
          <span>Prepare Student Package Enquiry & Continue to WhatsApp</span>
          <ArrowRight className="w-4 h-4 text-[#E2B13C] group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-xs text-[#7A8A82] text-center mt-2.5">
          Fast, direct response from PGFV Support Desk • No payment requested until order details are confirmed.
        </p>
      </div>
    </form>
  );
}
