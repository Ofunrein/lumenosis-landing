'use client';

import { useState, useEffect, useRef } from 'react';

type CallType = 'inbound' | 'outbound' | null;
type Industry = 'property' | 'finance' | 'health' | 'saas' | 'construction' | 'insurance' | 'agency' | 'other' | null;

// Tooltip component
function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<'right' | 'left'>('right');
  const buttonRef = useRef<HTMLDivElement>(null);
  
  const handleShow = () => {
    setShow(true);
    // Check if tooltip would go off screen
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right;
      // If less than 280px space on right, show on left
      setPosition(spaceOnRight < 280 ? 'left' : 'right');
    }
  };
  
  return (
    <div className="relative inline-block ml-1" ref={buttonRef}>
      <button
        type="button"
        onMouseEnter={handleShow}
        onMouseLeave={() => setShow(false)}
        onClick={handleShow}
        className="inline-flex items-center justify-center w-4 h-4 text-xs text-gray-400 hover:text-gray-600 border border-gray-300 rounded-full cursor-help"
      >
        ?
      </button>
      {show && (
        <div 
          className={`absolute z-50 w-64 p-3 text-xs text-white bg-gray-900 rounded-lg shadow-lg -top-2 ${
            position === 'right' ? 'left-6' : 'right-6'
          }`}
          style={{ maxWidth: '280px' }}
        >
          <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 top-3 ${
            position === 'right' ? '-left-1' : '-right-1'
          }`}></div>
          {text}
        </div>
      )}
    </div>
  );
}

export default function RevenueCalculator() {
  const [step, setStep] = useState<'callType' | 'industry' | 'calculator'>('callType');
  const [callType, setCallType] = useState<CallType>(null);
  const [industry, setIndustry] = useState<Industry>(null);

  // Inbound specific states
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(120000);
  const [avgTicketSize, setAvgTicketSize] = useState<number>(600);
  const [avgInboundCalls, setAvgInboundCalls] = useState<number>(900);
  const [missedCallsPercent, setMissedCallsPercent] = useState<number>(30);
  const [conversionRate, setConversionRate] = useState<number>(35);
  const [bookingPercent, setBookingPercent] = useState<number>(60);
  const [avgCallTime, setAvgCallTime] = useState<number>(6);
  const [hasReception, setHasReception] = useState<boolean>(true);
  const [numStaff, setNumStaff] = useState<number>(2);
  const [hourlyRate, setHourlyRate] = useState<number>(30);
  const [coverageHours, setCoverageHours] = useState<number>(40);
  const [responseTime, setResponseTime] = useState<number>(24);

  // Outbound specific states
  const [outboundRevenue, setOutboundRevenue] = useState<number>(250000);
  const [avgDealValue, setAvgDealValue] = useState<number>(4300);
  const [leadsGenerated, setLeadsGenerated] = useState<number>(1200);
  const [qualifyingCalls, setQualifyingCalls] = useState<number>(900);
  const [avgTimePerCall, setAvgTimePerCall] = useState<number>(7);
  const [bookingRate, setBookingRate] = useState<number>(25);
  const [closeRate, setCloseRate] = useState<number>(20);
  const [followUpFrequency, setFollowUpFrequency] = useState<number>(3);
  const [numSDRs, setNumSDRs] = useState<number>(3);
  const [sdrHourlyRate, setSdrHourlyRate] = useState<number>(35);
  const [callsPerDay, setCallsPerDay] = useState<number>(60);

  // Results
  const [currentCost, setCurrentCost] = useState<number>(0);
  const [lostOpportunity, setLostOpportunity] = useState<number>(0);
  const [aiSubscription] = useState<number>(3000);
  const [savedCost, setSavedCost] = useState<number>(0);
  const [recapturedRevenue, setRecapturedRevenue] = useState<number>(0);
  const [monthlyGain, setMonthlyGain] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);
  const [paybackDays, setPaybackDays] = useState<number>(0);

  useEffect(() => {
    if (callType === 'inbound') {
      calculateInbound();
    } else if (callType === 'outbound') {
      calculateOutbound();
    }
  }, [callType, monthlyRevenue, avgTicketSize, avgInboundCalls, missedCallsPercent, conversionRate, bookingPercent, avgCallTime, hasReception, numStaff, hourlyRate, coverageHours, responseTime, outboundRevenue, avgDealValue, leadsGenerated, qualifyingCalls, avgTimePerCall, bookingRate, closeRate, followUpFrequency, numSDRs, sdrHourlyRate, callsPerDay]);

  const calculateInbound = () => {
    // Monthly labor cost calculation (4.33 weeks per month)
    const laborCost = hasReception ? (numStaff * hourlyRate * coverageHours * 4.33) : 0;
    
    // Calculate missed calls and lost opportunity
    const missed = Math.floor(avgInboundCalls * (missedCallsPercent / 100));
    const lostValue = missed * (conversionRate / 100) * avgTicketSize;
    
    // AI captures approximately 35% of missed calls and converts them into revenue
    const recaptured = lostValue * 0.35;
    
    // With AI handling calls, estimate 30% reduction in labor costs as staff can focus on higher-value tasks
    const savedLabor = laborCost * 0.30;
    
    // Total monthly gain = recaptured revenue + labor savings - AI subscription cost
    const gain = savedLabor + recaptured - aiSubscription;
    const roiPercent = ((gain / aiSubscription) * 100);
    const payback = aiSubscription / (gain || 1);

    setCurrentCost(laborCost);
    setLostOpportunity(lostValue);
    setSavedCost(savedLabor);
    setRecapturedRevenue(recaptured);
    setMonthlyGain(gain);
    setRoi(roiPercent);
    setPaybackDays(payback * 30);
  };

  const calculateOutbound = () => {
    // Monthly labor cost: # of SDRs × hourly rate × 8 hours/day × 21.67 working days/month
    const laborCost = numSDRs * sdrHourlyRate * 8 * 21.67;
    
    // Current performance
    const contactedLeads = qualifyingCalls;
    const bookings = contactedLeads * (bookingRate / 100);
    const deals = bookings * (closeRate / 100);
    const currentRevenue = deals * avgDealValue;
    
    // With AI: can reach approximately 80% of your leads, significantly more than manual outreach
    const aiContactRate = 0.80; // AI can reach 80% of generated leads
    const aiContactedLeads = Math.floor(leadsGenerated * aiContactRate);
    
    // Calculated using your booking rate applied to the increased number of contacts reached by AI
    const aiBookings = aiContactedLeads * (bookingRate / 100);
    const aiDeals = aiBookings * (closeRate / 100);
    const aiRevenue = aiDeals * avgDealValue;
    
    // Total revenue from AI-generated bookings using your close rate and average deal value
    const revenueIncrease = aiRevenue - currentRevenue;
    
    // Incremental revenue from AI outreach ($60,000) plus labour savings minus the AI subscription cost
    const savedLabor = laborCost * 0.30; // 30% labor savings as AI handles routine tasks
    const gain = savedLabor + revenueIncrease - aiSubscription;
    const roiPercent = ((gain / aiSubscription) * 100);
    const payback = aiSubscription / (gain || 1);

    setCurrentCost(laborCost);
    setLostOpportunity(0);
    setSavedCost(savedLabor);
    setRecapturedRevenue(revenueIncrease);
    setMonthlyGain(gain);
    setRoi(roiPercent);
    setPaybackDays(payback * 30);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCallTypeSelect = (type: CallType) => {
    setCallType(type);
    setStep('industry');
  };

  const handleIndustrySelect = (ind: Industry) => {
    setIndustry(ind);
    setStep('calculator');
  };

  const handleStartOver = () => {
    setStep('callType');
    setCallType(null);
    setIndustry(null);
  };

  // Call Type Selection Screen
  if (step === 'callType') {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              AI Voice Agent ROI Calculator
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Discover your potential ROI with AI-powered phone automation
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
                What would you like to augment?
              </h3>
              <p className="text-center text-gray-600 mb-8">
                Choose the phone activity you want to enhance with AI
              </p>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Inbound Calls */}
                <button
                  onClick={() => handleCallTypeSelect('inbound')}
                  className="group bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-500 rounded-2xl p-6 sm:p-8 text-left transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900">Inbound Calls</h4>
                    <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-500 rounded-xl flex items-center justify-center transition-colors">
                      <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Improve how you handle incoming customer calls, reduce missed opportunities, and optimise reception resources
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Capture missed calls
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      24/7 coverage
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Reduce labour costs
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center text-purple-600 group-hover:text-purple-700 font-semibold">
                    Calculate ROI
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                {/* Outbound Calls */}
                <button
                  onClick={() => handleCallTypeSelect('outbound')}
                  className="group bg-gray-50 hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-500 rounded-2xl p-6 sm:p-8 text-left transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900">Outbound Calls</h4>
                    <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-500 rounded-xl flex items-center justify-center transition-colors">
                      <svg className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Scale your outreach, qualify more leads, and increase conversion rates with AI-powered outbound calling
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Contact 100% of leads
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Scale without hiring
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Boost conversion rates
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center text-indigo-600 group-hover:text-indigo-700 font-semibold">
                    Calculate ROI
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Industry Selection Screen
  if (step === 'industry') {
    const industries = [
      { id: 'property', label: 'Property', icon: '🏢' },
      { id: 'finance', label: 'Finance', icon: '💲' },
      { id: 'health', label: 'Health', icon: '❤️' },
      { id: 'saas', label: 'SaaS', icon: '💻' },
      { id: 'construction', label: 'Construction', icon: '🏗️' },
      { id: 'insurance', label: 'Insurance', icon: '🛡️' },
      { id: 'agency', label: 'Agency', icon: '👥' },
      { id: 'other', label: 'Other', icon: '📋' },
    ];

    return (
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="mb-6">
                <div className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-4">
                  BUSINESS CONTEXT
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Question 1 of {callType === 'inbound' ? '13' : '12'}</h3>
                    <div className="w-20 h-1 bg-purple-600 rounded-full mt-1"></div>
                  </div>
                  <span className="text-sm text-gray-500">8%</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-2">
                Industry
              </h3>
              <p className="text-center text-gray-500 text-sm mb-8">* Required</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => handleIndustrySelect(ind.id as Industry)}
                    className="group bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-500 rounded-xl p-4 sm:p-6 text-center transition-all duration-300 transform hover:scale-[1.05]"
                  >
                    <div className="text-3xl sm:text-4xl mb-2">{ind.icon}</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">{ind.label}</div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button
                  onClick={handleStartOver}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  ← Back
                </button>
        </div>

              <div className="mt-8 flex items-center justify-center text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Scroll or press ↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculator Screen (existing calculator with modifications)
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleStartOver}
            className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Start Over with New Calculation
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {callType === 'inbound' ? 'Inbound' : 'Outbound'} ROI Calculator
          </h2>
          <p className="text-gray-600">
            {industry && `${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry`}
          </p>
            </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 space-y-6">
            {callType === 'inbound' ? (
              <>
                {/* Inbound Fields */}
              <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-purple-600 rounded-full mr-3"></span>
                    Business Context
                  </h3>

                  {/* Monthly Revenue */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Monthly revenue
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-purple-600">{formatCurrency(monthlyRevenue)}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="1000"
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((monthlyRevenue - 10000) / (1000000 - 10000)) * 100}%, #e5e7eb ${((monthlyRevenue - 10000) / (1000000 - 10000)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$10,000</span>
                      <span>$1,000,000</span>
                    </div>
                  </div>

                  {/* Average Ticket Size */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Average ticket size
                </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-purple-600">{formatCurrency(avgTicketSize)}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="50"
                      value={avgTicketSize}
                      onChange={(e) => setAvgTicketSize(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((avgTicketSize - 500) / (5000 - 500)) * 100}%, #e5e7eb ${((avgTicketSize - 500) / (5000 - 500)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$500</span>
                      <span>$5,000</span>
                    </div>
                  </div>

                  {/* Avg Inbound Calls */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Avg inbound calls / month
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-purple-600">{avgInboundCalls}</span>
                  </div>
                  <input
                      type="range"
                      min="200"
                      max="2000"
                      step="10"
                      value={avgInboundCalls}
                      onChange={(e) => setAvgInboundCalls(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((avgInboundCalls - 200) / (2000 - 200)) * 100}%, #e5e7eb ${((avgInboundCalls - 200) / (2000 - 200)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>200</span>
                      <span>2,000</span>
                </div>
              </div>

                  {/* % of calls missed */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      % of calls missed
                </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-purple-600">{missedCallsPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="80"
                      step="5"
                      value={missedCallsPercent}
                      onChange={(e) => setMissedCallsPercent(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(missedCallsPercent / 80) * 100}%, #e5e7eb ${(missedCallsPercent / 80) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>80%</span>
                    </div>
                  </div>

                  {/* Conversion rate */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Conversion rate (lead → customer)
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-purple-600">{conversionRate}%</span>
                  </div>
                  <input
                      type="range"
                      min="5"
                      max="80"
                      step="5"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((conversionRate - 5) / (80 - 5)) * 100}%, #e5e7eb ${((conversionRate - 5) / (80 - 5)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span>80%</span>
                    </div>
                  </div>

                  {/* Booking % */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Booking % from inbound calls
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-purple-600">{bookingPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={bookingPercent}
                      onChange={(e) => setBookingPercent(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((bookingPercent - 10) / (100 - 10)) * 100}%, #e5e7eb ${((bookingPercent - 10) / (100 - 10)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>10%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Avg call time */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Avg call handling time (mins)
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-purple-600">{avgCallTime}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={avgCallTime}
                      onChange={(e) => setAvgCallTime(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((avgCallTime - 1) / (15 - 1)) * 100}%, #e5e7eb ${((avgCallTime - 1) / (15 - 1)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>15</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></span>
                    Labour & Cost
                  </h3>

                  {/* Reception staff */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reception/admin staff present
                    </label>
                    <button
                      onClick={() => setHasReception(!hasReception)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${hasReception ? 'bg-purple-600' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${hasReception ? 'translate-x-9' : 'translate-x-1'}`} />
                    </button>
                    <span className="ml-3 text-sm font-medium text-gray-700">{hasReception ? 'Yes' : 'No'}</span>
                  </div>

                  {hasReception && (
                    <>
                      {/* # of staff */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          # of reception/admin staff
                        </label>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setNumStaff(Math.max(1, numStaff - 1))}
                            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700 transition-colors"
                          >
                            −
                          </button>
                          <span className="text-2xl font-bold text-purple-600 min-w-[3rem] text-center">{numStaff}</span>
                          <button
                            onClick={() => setNumStaff(numStaff + 1)}
                            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Hourly rate */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Avg hourly rate
                        </label>
                        <div className="text-center mb-3">
                          <span className="text-3xl font-bold text-purple-600">${hourlyRate}/hr</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="80"
                          step="5"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                          style={{
                            background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((hourlyRate - 15) / (80 - 15)) * 100}%, #e5e7eb ${((hourlyRate - 15) / (80 - 15)) * 100}%, #e5e7eb 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>15$/hr</span>
                          <span>80$/hr</span>
                </div>
              </div>

                      {/* Coverage hours */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Hours of phone coverage / week
                        </label>
                        <div className="text-center mb-3">
                          <span className="text-3xl font-bold text-purple-600">{coverageHours}</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="70"
                          step="5"
                          value={coverageHours}
                          onChange={(e) => setCoverageHours(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                          style={{
                            background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((coverageHours - 20) / (70 - 20)) * 100}%, #e5e7eb ${((coverageHours - 20) / (70 - 20)) * 100}%, #e5e7eb 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>20</span>
                          <span>70</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Response time */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Response time to missed calls
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-purple-600">{responseTime} hrs</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="72"
                      step="1"
                      value={responseTime}
                      onChange={(e) => setResponseTime(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((responseTime - 1) / (72 - 1)) * 100}%, #e5e7eb ${((responseTime - 1) / (72 - 1)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>&lt;1 hr</span>
                      <span>&gt;72 hrs</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Outbound Fields */}
              <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></span>
                    Business Context
                  </h3>

                  {/* Monthly Revenue */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Monthly revenue
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{formatCurrency(outboundRevenue)}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="1000"
                      value={outboundRevenue}
                      onChange={(e) => setOutboundRevenue(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((outboundRevenue - 10000) / (1000000 - 10000)) * 100}%, #e5e7eb ${((outboundRevenue - 10000) / (1000000 - 10000)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$10,000</span>
                      <span>$1,000,000</span>
                    </div>
                  </div>

                  {/* Average Deal Value */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Average deal value
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{formatCurrency(avgDealValue)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="10000"
                      step="50"
                      value={avgDealValue}
                      onChange={(e) => setAvgDealValue(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((avgDealValue - 1000) / (10000 - 1000)) * 100}%, #e5e7eb ${((avgDealValue - 1000) / (10000 - 1000)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$1,000</span>
                      <span>$10,000</span>
                    </div>
                  </div>

                  {/* Leads Generated */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Leads generated / month
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{leadsGenerated}</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="5000"
                      step="10"
                      value={leadsGenerated}
                      onChange={(e) => setLeadsGenerated(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((leadsGenerated - 200) / (5000 - 200)) * 100}%, #e5e7eb ${((leadsGenerated - 200) / (5000 - 200)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>200</span>
                      <span>5,000</span>
                    </div>
                  </div>

                  {/* Outbound Qualifying Calls */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Outbound qualifying calls / month
                </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{qualifyingCalls}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="4000"
                      step="10"
                      value={qualifyingCalls}
                      onChange={(e) => setQualifyingCalls(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((qualifyingCalls - 100) / (4000 - 100)) * 100}%, #e5e7eb ${((qualifyingCalls - 100) / (4000 - 100)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>100</span>
                      <span>4,000</span>
                    </div>
                  </div>

                  {/* Avg Time Per Call */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Avg time per call (mins)
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{avgTimePerCall}</span>
                  </div>
                  <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={avgTimePerCall}
                      onChange={(e) => setAvgTimePerCall(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((avgTimePerCall - 1) / (15 - 1)) * 100}%, #e5e7eb ${((avgTimePerCall - 1) / (15 - 1)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>15</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-purple-600 rounded-full mr-3"></span>
                    Performance Metrics
                  </h3>

                  {/* Booking Rate */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Booking rate
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{bookingRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={bookingRate}
                      onChange={(e) => setBookingRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((bookingRate - 5) / (60 - 5)) * 100}%, #e5e7eb ${((bookingRate - 5) / (60 - 5)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span>60%</span>
                    </div>
                  </div>

                  {/* Close Rate */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Close rate after booking
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{closeRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={closeRate}
                      onChange={(e) => setCloseRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((closeRate - 5) / (60 - 5)) * 100}%, #e5e7eb ${((closeRate - 5) / (60 - 5)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span>60%</span>
                    </div>
                  </div>

                  {/* Follow-up Frequency */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Follow-up frequency (attempts/lead)
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{followUpFrequency}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={followUpFrequency}
                      onChange={(e) => setFollowUpFrequency(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((followUpFrequency - 1) / (10 - 1)) * 100}%, #e5e7eb ${((followUpFrequency - 1) / (10 - 1)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>10</span>
              </div>
            </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-8 bg-green-600 rounded-full mr-3"></span>
                    Labour & Cost
                  </h3>

                  {/* # of SDRs */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      # of SDRs / sales staff
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setNumSDRs(Math.max(1, numSDRs - 1))}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700 transition-colors"
                      >
                        −
                      </button>
                      <span className="text-2xl font-bold text-indigo-600 min-w-[3rem] text-center">{numSDRs}</span>
                      <button
                        onClick={() => setNumSDRs(numSDRs + 1)}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Avg Hourly Rate */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Avg hourly rate
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">${sdrHourlyRate}/hr</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={sdrHourlyRate}
                      onChange={(e) => setSdrHourlyRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((sdrHourlyRate - 20) / (100 - 20)) * 100}%, #e5e7eb ${((sdrHourlyRate - 20) / (100 - 20)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>20$/hr</span>
                      <span>100$/hr</span>
                    </div>
                  </div>

                  {/* Calls Per Day */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Calls per person per day
                    </label>
                    <div className="text-center mb-3">
                      <span className="text-3xl font-bold text-indigo-600">{callsPerDay}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="400"
                      step="10"
                      value={callsPerDay}
                      onChange={(e) => setCallsPerDay(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((callsPerDay - 10) / (400 - 10)) * 100}%, #e5e7eb ${((callsPerDay - 10) / (400 - 10)) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>10</span>
                      <span>400</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Current System */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-gray-200">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl mb-2">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
            </div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Before AI</h3>
                  <p className="text-xs text-gray-500 mt-1">Your existing operation costs</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Monthly Labour Cost</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(currentCost)}</div>
                  </div>

                  {callType === 'inbound' && lostOpportunity > 0 && (
                    <>
                      <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                        <div className="text-xs text-red-600 uppercase tracking-wide mb-1">Missed Calls</div>
                        <div className="text-xl sm:text-2xl font-bold text-red-600">{Math.floor(avgInboundCalls * (missedCallsPercent / 100))}</div>
                        <div className="text-xs text-gray-600 mt-1">calls going unanswered</div>
                      </div>

                      <div className="bg-red-100 rounded-xl p-3 border border-red-200">
                        <div className="text-xs text-red-700 uppercase tracking-wide mb-1">Lost Opportunity Value</div>
                        <div className="text-xl sm:text-2xl font-bold text-red-700">{formatCurrency(lostOpportunity)}</div>
                        <div className="text-xs text-gray-700 mt-1">potential revenue lost monthly</div>
                      </div>
                    </>
                  )}

                  <div className="bg-gray-100 rounded-xl p-3 border-2 border-gray-300">
                    <div className="text-xs text-gray-700 uppercase tracking-wide mb-1">Total Monthly Cost</div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">{formatCurrency(currentCost)}</div>
                  </div>
              </div>
            </div>

              {/* What You Could Achieve */}
              <div className={`bg-gradient-to-br ${callType === 'inbound' ? 'from-purple-50 to-indigo-50 border-purple-200' : 'from-indigo-50 to-blue-50 border-indigo-200'} rounded-2xl p-4 sm:p-6 shadow-lg border-2`}>
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${callType === 'inbound' ? 'from-purple-600 to-indigo-600' : 'from-indigo-600 to-blue-600'} rounded-xl mb-2`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className={`text-sm font-semibold ${callType === 'inbound' ? 'text-purple-700' : 'text-indigo-700'} uppercase tracking-wide`}>What You Could Achieve</h3>
                  <p className={`text-xs ${callType === 'inbound' ? 'text-purple-600' : 'text-indigo-600'} mt-1`}>With AI automation</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/80 rounded-xl p-3">
                    <div className={`text-xs ${callType === 'inbound' ? 'text-purple-700' : 'text-indigo-700'} uppercase tracking-wide mb-1 flex items-center`}>
                      AI Subscription
                      <Tooltip text={`Advanced plan pricing based on your estimated ${callType === 'inbound' ? '5,400' : '6,000'} minutes of monthly usage.`} />
                    </div>
                    <div className={`text-xl sm:text-2xl font-bold ${callType === 'inbound' ? 'text-purple-900' : 'text-indigo-900'}`}>{formatCurrency(aiSubscription)}/mo</div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                    <div className="text-xs text-green-700 uppercase tracking-wide mb-1 flex items-center">
                      Reduced Labour Cost
                      <Tooltip text="With AI handling calls, we estimate a 30% reduction in labour costs as staff can focus on higher-value tasks." />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-green-600">{formatCurrency(currentCost - savedCost)}</div>
                    <div className="text-xs text-green-700 mt-1">↓ {formatCurrency(savedCost)} saved</div>
                  </div>

                  <div className="bg-green-100 rounded-xl p-3 border border-green-300">
                    <div className="text-xs text-green-800 uppercase tracking-wide mb-1 flex items-center">
                      {callType === 'inbound' ? 'Recaptured Revenue' : 'New Revenue'}
                      <Tooltip text={callType === 'inbound' 
                        ? "AI captures approximately 35% of missed calls and converts them into revenue based on your average ticket size and conversion rate." 
                        : "Total revenue from AI-generated bookings using your close rate and average deal value."} />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-green-600">{formatCurrency(recapturedRevenue)}</div>
                    <div className="text-xs text-green-800 mt-1">{callType === 'inbound' ? 'from previously missed calls' : 'from increased efficiency'}</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-3 border-2 border-green-500 shadow-lg">
                    <div className="text-xs text-white uppercase tracking-wide mb-1 font-semibold flex items-center">
                      You Could Gain Monthly
                      <Tooltip text={callType === 'inbound'
                        ? "Total gain from recaptured revenue and labour savings ($58,259) minus the AI subscription cost ($5,000)."
                        : `Incremental revenue from AI outreach ($${Math.round(recapturedRevenue/1000)}k) plus labour savings minus the AI subscription cost ($5,000).`} />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">{formatCurrency(monthlyGain)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`bg-gradient-to-br ${callType === 'inbound' ? 'from-purple-100 to-indigo-100 border-purple-300' : 'from-indigo-100 to-blue-100 border-indigo-300'} rounded-2xl p-4 sm:p-6 border-2 shadow-lg text-center`}>
                <div className={`text-xs sm:text-sm ${callType === 'inbound' ? 'text-purple-700' : 'text-indigo-700'} uppercase tracking-wide mb-1 sm:mb-2 font-semibold flex items-center justify-center`}>
                  ROI
                  <Tooltip text="Return on Investment: (Net Gain ÷ Initial Cost) × 100. Shows how much you get for every dollar invested in Lumenosis AI." />
                </div>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${callType === 'inbound' ? 'text-purple-900' : 'text-indigo-900'}`}>{Math.round(roi)}%</div>
                </div>

              <div className={`bg-gradient-to-br ${callType === 'inbound' ? 'from-indigo-100 to-purple-100 border-indigo-300' : 'from-blue-100 to-indigo-100 border-blue-300'} rounded-2xl p-4 sm:p-6 border-2 shadow-lg text-center`}>
                <div className={`text-xs sm:text-sm ${callType === 'inbound' ? 'text-indigo-700' : 'text-blue-700'} uppercase tracking-wide mb-1 sm:mb-2 font-semibold flex items-center justify-center`}>
                  Payback
                  <Tooltip text="Time required to recover your initial investment through the monthly gains generated by Lumenosis AI." />
                </div>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${callType === 'inbound' ? 'text-indigo-900' : 'text-blue-900'}`}>{Math.round(paybackDays)} <span className="text-xl sm:text-2xl">days</span></div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">Limited time offer - Get started today</p>
              </div>
              <a
                href="https://calendly.com/lumenosis/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full bg-gradient-to-r ${callType === 'inbound' ? 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' : 'from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700'} text-white font-bold py-3 sm:py-4 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-sm sm:text-base`}
              >
                📅 Book Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
