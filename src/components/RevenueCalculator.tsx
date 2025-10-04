'use client';

import { useState, useEffect } from 'react';

export default function RevenueCalculator() {
  const [missedCalls, setMissedCalls] = useState<number>(50);
  const [conversionRate, setConversionRate] = useState<number>(20);
  const [avgTicket, setAvgTicket] = useState<number>(500);
  
  const [monthlyLost, setMonthlyLost] = useState<number>(0);
  const [yearlyLost, setYearlyLost] = useState<number>(0);
  const [recoveryPotential, setRecoveryPotential] = useState<number>(0);

  useEffect(() => {
    // Calculate missed revenue
    const monthly = missedCalls * (conversionRate / 100) * avgTicket;
    const yearly = monthly * 12;
    const recovery = yearly * 0.8; // 80% recovery with AI

    setMonthlyLost(monthly);
    setYearlyLost(yearly);
    setRecoveryPotential(recovery);
  }, [missedCalls, conversionRate, avgTicket]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            How Much Revenue Are You Losing?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every missed call is a missed opportunity. Calculate exactly how much revenue you're losing and see how an AI phone assistant can recover it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Revenue Calculator</h3>
            </div>

            <div className="space-y-6">
              {/* Missed Calls */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many calls do you miss per month? *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    placeholder="e.g., 50"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Conversion Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What % of those calls become paying customers? *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    placeholder="e.g., 20"
                    className="w-full pl-12 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">%</span>
                  </div>
                </div>
              </div>

              {/* Average Ticket */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is your average ticket price per customer? *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    placeholder="e.g., 500"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="text-center lg:text-left mb-6">
              <h3 className="text-xl font-bold text-gray-900">Your Missed Revenue</h3>
              <p className="text-gray-600 text-sm mt-1">
                {monthlyLost > 0 ? 'Enter your numbers above to see your missed revenue calculation' : 'Based on your inputs'}
              </p>
            </div>

            {/* Monthly Lost Revenue */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 shadow-lg">
              <div className="text-center">
                <div className="text-sm font-medium text-red-600 mb-2">Monthly Lost Revenue</div>
                <div className="text-4xl lg:text-5xl font-bold text-red-600 mb-3">
                  {formatCurrency(monthlyLost)}
                </div>
                <div className="text-sm text-gray-600">
                  Based on {missedCalls} missed calls × {conversionRate}% conversion × {formatCurrency(avgTicket)}
                </div>
              </div>
            </div>

            {/* Yearly Lost Revenue */}
            <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-6 border border-red-200 shadow-lg">
              <div className="text-center">
                <div className="text-sm font-medium text-red-700 mb-2">Yearly Lost Revenue</div>
                <div className="text-4xl lg:text-5xl font-bold text-red-700 mb-3">
                  {formatCurrency(yearlyLost)}
                </div>
                <div className="text-sm text-gray-700">
                  That's {formatCurrency(monthlyLost)} × 12 months
                </div>
              </div>
            </div>

            {/* Recovery Potential */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg">
              <div className="text-center">
                <div className="text-sm font-medium text-green-700 mb-2">Recovery Potential with AI</div>
                <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-3">
                  {formatCurrency(recoveryPotential)}
                </div>
                <div className="text-sm text-gray-700">
                  Recover up to 80% of missed revenue with 24/7 AI phone coverage
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="https://calendly.com/lumenosis/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl text-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                💡 Stop Losing Money - Book Free Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


