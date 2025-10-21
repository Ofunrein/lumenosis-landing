'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ReactBits3DButton from './ReactBits3DButton'
import StarBorderOutline from './StarBorderOutline'
import TiltedCard from './TiltedCard'

interface ChatMessage {
  id: number
  type: 'ai' | 'user'
  message: string
  timestamp: number
}

export default function RealEstateAIDemo() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const scenarios = [
    {
      title: "Real Estate Lead Qualification",
      subtitle: "AI qualifies property inquiries in seconds",
      initialMessage: "Hi, I'm interested in the 3-bedroom house on Oak Street. Is it still available?",
      responses: [
        "Great! Yes, that property is still available. To help you better, may I ask what's prompting your move at this time?",
        "I'd be happy to schedule a showing for you. Are you pre-approved for financing, or would you like information about our preferred lenders?",
        "That's a popular property! Let me check the current status and get you all the details. What's your timeline for making a decision?"
      ]
    },
    {
      title: "Buyer Prequalification",
      subtitle: "AI screens serious buyers automatically",
      initialMessage: "I want to see some homes in the $400k range. Can you help?",
      responses: [
        "Absolutely! I'd love to help you find the perfect home. Are you currently pre-approved for a mortgage, or would you like me to connect you with our trusted lender partners?",
        "Great budget range! To show you the best options, what areas are you focusing on, and do you need to sell your current home first?",
        "Perfect! I have several excellent properties in that range. Are you looking to move quickly, or do you have flexibility on timing?"
      ]
    },
    {
      title: "After-Hours Lead Response",
      subtitle: "AI works 24/7 so you never miss opportunities",
      initialMessage: "I drove by your listing today - is it still for sale? Can I see it this weekend?",
      responses: [
        "Yes, that property is still active! I'd be happy to arrange a showing this weekend. Saturday or Sunday work better for you?",
        "Great timing! That's one of our featured listings. I can schedule you for Saturday at 10am or Sunday at 2pm - which works better?",
        "Absolutely! I have availability this weekend. Before we schedule, may I ask if you're working with another agent, or would you like me to represent you?"
      ]
    },
    {
      title: "Investor Lead Qualification",
      subtitle: "AI identifies serious cash buyers quickly",
      initialMessage: "I'm looking for investment properties under $200k. Do you have any off-market deals?",
      responses: [
        "I do work with several investors! Are you looking for fix-and-flip opportunities, or buy-and-hold rental properties?",
        "Great! I have some pocket listings that might interest you. What's your preferred area, and are you paying cash or need financing?",
        "Perfect timing! I have a few properties that haven't hit the market yet. What's your timeline, and do you have proof of funds ready?"
      ]
    },
    {
      title: "HVAC Emergency Service",
      subtitle: "AI handles urgent service requests in seconds",
      initialMessage: "My AC just stopped working and it's 95 degrees outside! Can someone come today?",
      responses: [
        "I understand how urgent this is! Let me check our emergency service availability. What's your address and when did the AC stop working?",
        "That's definitely an emergency! I can get a technician out to you within 2-4 hours. Do you have any power to the unit, or is it completely dead?",
        "I'm so sorry you're dealing with this heat! We have same-day emergency service. Can you tell me the make and model of your unit so I can have the right parts ready?"
      ]
    },
    {
      title: "Plumbing Service Inquiry",
      subtitle: "AI qualifies service calls efficiently",
      initialMessage: "I have a leak under my kitchen sink. How much would it cost to fix?",
      responses: [
        "I can help you with that! Is it a steady drip or actively flowing water? I'll need to have a technician assess it, but I can give you our standard service call fee upfront.",
        "Kitchen sink leaks can vary in complexity. Is the leak coming from the faucet connections or the pipes underneath? I can schedule a diagnostic visit for you.",
        "Let's get that fixed quickly before it causes damage! Is this an emergency situation, or can we schedule you for our next available appointment tomorrow morning?"
      ]
    },
    {
      title: "Landscaping Consultation",
      subtitle: "AI pre-qualifies landscaping projects",
      initialMessage: "I need my backyard completely redone. Can you give me an estimate?",
      responses: [
        "I'd love to help transform your backyard! What's the approximate square footage, and do you have any specific ideas in mind like patios, gardens, or water features?",
        "That sounds like an exciting project! Are you looking for a complete design-build service, or do you have plans already? What's your target timeline?",
        "Great! To provide an accurate estimate, I'll need to schedule a site visit. What's your budget range, and are there any drainage or access issues I should know about?"
      ]
    },
    {
      title: "House Cleaning Service",
      subtitle: "AI books recurring cleaning appointments",
      initialMessage: "I need weekly house cleaning. What are your rates?",
      responses: [
        "Perfect! I'd be happy to set up weekly service for you. How many bedrooms and bathrooms do you have, and would you prefer morning or afternoon appointments?",
        "Weekly cleaning is our most popular service! What day of the week works best for you, and do you need any special services like inside oven or refrigerator cleaning?",
        "Excellent choice for maintaining a clean home! To give you accurate pricing, what's your home's square footage, and do you have any pets or specific cleaning preferences?"
      ]
    }
  ]

  const playScenario = async () => {
    setIsPlaying(true)
    setMessages([])
    
    const scenario = scenarios[currentScenario]
    
    // Add user message
    const userMessage: ChatMessage = {
      id: 1,
      type: 'user',
      message: scenario.initialMessage,
      timestamp: Date.now()
    }
    setMessages([userMessage])
    
    // Show typing indicator
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)
    
    // Add AI response
    setTimeout(() => {
      setIsTyping(false)
      const aiMessage: ChatMessage = {
        id: 2,
        type: 'ai',
        message: scenario.responses[Math.floor(Math.random() * scenario.responses.length)],
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsPlaying(false)
    }, 3000)
  }

  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % scenarios.length)
    setMessages([])
    setIsTyping(false)
  }

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-12">
          <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105">
            <button
              onClick={() => {
                if (audioRef.current) {
                  if (isAudioPlaying) {
                    audioRef.current.pause()
                    audioRef.current.currentTime = 0
                    setIsAudioPlaying(false)
                  } else {
                    audioRef.current.play()
                    setIsAudioPlaying(true)
                  }
                }
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-indigo-500 hover:bg-indigo-400 rounded-full mr-2.5 sm:mr-3 transition-all duration-200 hover:scale-110"
              aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
            >
              {isAudioPlaying ? (
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <span className="text-indigo-300 text-base sm:text-lg font-semibold">Play Scenario</span>
          </div>
          
          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src="/audios/recording-compressed.mp3"
            preload="auto"
            onEnded={() => setIsAudioPlaying(false)}
            onPause={() => setIsAudioPlaying(false)}
            onError={(e) => {
              console.error('Audio file error:', e);
              setIsAudioPlaying(false);
            }}
          />
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-white md:text-4xl mb-4">
            Capture Leads <span className="gradient-text">in 60 Seconds</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto">
            See how you never lose another deal to slow follow-up. Watch real conversations that close deals while you focus on growing your business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Interactive Demo */}
          <div data-aos="fade-right">
            <div className="glass-effect card-depth rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {scenarios[currentScenario].title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {scenarios[currentScenario].subtitle}
                  </p>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="bg-gray-900/60 rounded-xl p-3 sm:p-4 border border-gray-700/30">
                <div className="flex items-center mb-4 pb-3 border-b border-gray-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                    <i className="fas fa-robot"></i>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Your AI Assistant</div>
                    <div className="text-green-400 text-xs flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                      Online - Response Time: 60s
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 min-h-[150px] sm:min-h-[200px]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`${
                          message.type === 'user' 
                            ? 'max-w-[70%] sm:max-w-xs lg:max-w-md ml-auto mr-0' 
                            : 'max-w-[75%] sm:max-w-xs lg:max-w-md ml-0 mr-auto'
                        } px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                          message.type === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-700 text-gray-100 max-w-[75%] sm:max-w-xs lg:max-w-md ml-0 mr-auto px-3 sm:px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse sequential-dot-1"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse sequential-dot-2"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse sequential-dot-3"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-700/50 relative z-10">
                  <div className="flex items-center justify-between">
                    <StarBorderOutline color="#8b5cf6" speed="3s" className="flex-1 mr-3">
                      <ReactBits3DButton
                        onClick={isPlaying ? undefined : playScenario}
                        variant="gradient"
                        size="lg"
                        className={`w-full ${isPlaying ? 'pointer-events-none' : ''}`}
                        disabled={false}
                      >
                        {isPlaying ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Running Demo...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-play mr-2"></i>
                            Play Scenario
                          </>
                        )}
                      </ReactBits3DButton>
                    </StarBorderOutline>
                    
                    {/* Small Next Scenario Button - Bottom Right */}
                    <StarBorderOutline color="#6366f1" speed="5s">
                      <button
                        onClick={nextScenario}
                        className="px-3 py-2 text-xs bg-gray-700/80 text-white rounded-lg hover:bg-gray-600/80 transition-colors border border-gray-600/50 hover:border-gray-500/50 backdrop-blur-sm"
                      >
                        Next Scenario
                      </button>
                    </StarBorderOutline>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics - React Bits 3D Style */}
          <div data-aos="fade-left" className="scale-[0.9] sm:scale-[0.95] md:scale-100 origin-top-left">
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2">
              {/* Response Time Metric */}
              <TiltedCard
                containerHeight="100%"
                containerWidth="100%"
                scaleOnHover={1.02}
                rotateAmplitude={4}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div 
                  className="glass-effect card-depth metric-card rounded-2xl p-3 sm:p-4 md:p-6 text-center relative overflow-hidden
                    cursor-pointer group h-full w-full"
                  style={{
                    transform: 'none !important'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 border border-green-500/20"
                    >
                      <i className="fas fa-clock text-green-400 text-lg md:text-2xl"></i>
                    </div>
                    <div 
                      className="text-2xl md:text-4xl font-semibold text-green-400 mb-1 md:mb-2 response-time-counter"
                    >
                      60s
                    </div>
                    <div className="text-white font-semibold text-lg mb-1">Response Time</div>
                    <div className="text-white text-sm">Before competitors check their phone</div>
                  </div>
                </div>
              </TiltedCard>

              {/* Lead Qualification Metric */}
              <TiltedCard
                containerHeight="100%"
                containerWidth="100%"
                scaleOnHover={1.02}
                rotateAmplitude={4}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div 
                  className="glass-effect card-depth metric-card rounded-2xl p-3 sm:p-4 md:p-6 text-center relative overflow-hidden
                    cursor-pointer group h-full w-full"
                  style={{
                    transform: 'none !important'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 border border-blue-500/20"
                    >
                      <i className="fas fa-user-check text-blue-400 text-lg md:text-2xl"></i>
                    </div>
                    <div 
                      className="text-2xl md:text-4xl font-semibold text-blue-400 mb-1 md:mb-2 animated-number"
                      data-target="96"
                    >
                      96%
                    </div>
                    <div className="text-white font-semibold text-lg mb-1">Lead Qualification</div>
                    <div className="text-white text-sm">AI asks the right questions</div>
                  </div>
                </div>
              </TiltedCard>

              {/* Availability Metric */}
              <TiltedCard
                containerHeight="100%"
                containerWidth="100%"
                scaleOnHover={1.02}
                rotateAmplitude={4}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div 
                  className="glass-effect card-depth metric-card rounded-2xl p-3 sm:p-4 md:p-6 text-center relative overflow-hidden
                    cursor-pointer group h-full w-full"
                  style={{
                    transform: 'none !important'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 border border-purple-500/20"
                    >
                      <i className="fas fa-calendar-check text-purple-400 text-lg md:text-2xl"></i>
                    </div>
                    <div 
                      className="text-2xl md:text-4xl font-semibold text-purple-400 mb-1 md:mb-2"
                    >
                      24/7
                    </div>
                    <div className="text-white font-semibold text-lg mb-1">Availability</div>
                    <div className="text-white text-sm">Never miss weekend leads</div>
                  </div>
                </div>
              </TiltedCard>

              {/* Bookings Metric */}
              <TiltedCard
                containerHeight="100%"
                containerWidth="100%"
                scaleOnHover={1.02}
                rotateAmplitude={4}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div 
                  className="glass-effect card-depth metric-card rounded-2xl p-3 sm:p-4 md:p-6 text-center relative overflow-hidden
                    cursor-pointer group h-full w-full"
                  style={{
                    transform: 'none !important'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 border border-orange-500/20"
                    >
                      <i className="fas fa-chart-line text-orange-400 text-lg md:text-2xl"></i>
                    </div>
                    <div 
                      className="text-2xl md:text-4xl font-semibold text-orange-400 mb-1 md:mb-2 showings-counter animated-number"
                      data-target="300"
                      data-original-format="300%"
                    >
                      300%
                    </div>
                    <div className="text-white font-semibold text-lg mb-1">Bookings</div>
                    <div className="text-white text-sm">Automated appointment setting</div>
                  </div>
                </div>
              </TiltedCard>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6 sm:mt-12">
          <StarBorderOutline color="#6366f1" speed="4s">
            <ReactBits3DButton 
              href="https://calendly.com/lumenosis/30min" 
              target="_blank" 
              rel="noopener"
              variant="gradient"
              size="lg"
            >
              <i className="fas fa-calendar mr-2"></i>
              Schedule Demo
            </ReactBits3DButton>
          </StarBorderOutline>
        </div>
      </div>
    </section>
  )
}
