'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: string;
  color: string;
}

interface AnimatedProcessTimelineProps {
  steps: ProcessStep[];
  className?: string;
}

const AnimatedProcessTimeline: React.FC<AnimatedProcessTimelineProps> = ({
  steps,
  className = ''
}) => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [lastInteraction, setLastInteraction] = useState<number>(Date.now());
  const timelineRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            setVisibleSteps(prev => [...new Set([...prev, stepIndex])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const stepElements = timelineRef.current?.querySelectorAll('[data-step]');
    stepElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle user click on step
  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    setLastInteraction(Date.now());
    
    // Clear existing timers
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Restart auto-play after 5 seconds of no interaction
    autoPlayTimerRef.current = setTimeout(() => {
      startAutoPlay();
    }, 5000);
  };

  // Start auto-play function
  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => {
        const nextStep = (prev + 1) % steps.length;
        // If resetting to 0, briefly reset line then start growing again
        if (nextStep === 0) {
          setTimeout(() => setActiveStep(0), 100);
          return -1; // Temporary state to reset line
        }
        return nextStep;
      });
    }, 3000);
  };

  // Start auto-play on mount
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [steps.length]);

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Horizontal layout wrapper */}
      <div className="relative">
        {/* Animated connecting line - horizontal, synced with active step */}
        <div className="absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-full overflow-hidden z-0">
          <div 
            className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${activeStep === -1 ? 0 : ((activeStep + 1) / steps.length) * 100}%`,
              filter: 'drop-shadow(0 0 10px currentColor)'
            }}
          />
        </div>

        {/* Horizontal grid of steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index);
            const isActive = activeStep === index;

            return (
              <div
                key={index}
                data-step={index}
                className={`relative transition-all duration-700 ease-out z-10 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step number with animated circle - positioned at top */}
                <div className="relative flex justify-center mb-6 z-20">
                  <div 
                    onClick={() => handleStepClick(index)}
                    className={`
                      relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer z-30
                      transition-all duration-500 transform-gpu will-change-transform
                      ${isActive 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-500 scale-110 shadow-xl shadow-indigo-500/40' 
                        : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:scale-105'
                      }
                      border-2 ${isActive ? 'border-indigo-300' : 'border-gray-500'}
                    `}
                  >
                    {/* Pulsing ring animation */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-75" />
                    )}
                    
                    {/* Step number */}
                    <span className={`text-3xl font-bold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white'
                    }`}>
                      {step.number}
                    </span>

                    {/* Rotating background */}
                    <div 
                      className={`
                        absolute inset-0 rounded-full transition-all duration-1000
                        ${isActive ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin' : ''}
                      `}
                      style={{ 
                        animationDuration: '8s',
                        opacity: isActive ? 0.2 : 0
                      }}
                    />
                  </div>

                  {/* Floating particles around active step */}
                  {isActive && (
                    <div className="absolute inset-0">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-60"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-50px)`,
                            animation: `orbit-${i} 3s linear infinite`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content - positioned below the circle */}
                <div 
                  onClick={() => handleStepClick(index)}
                  className={`
                    relative p-6 rounded-2xl backdrop-blur-lg transition-all duration-500 cursor-pointer z-20
                    min-h-[280px] flex flex-col
                    ${isActive 
                      ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-400/50 shadow-xl shadow-indigo-500/20 scale-105' 
                      : 'bg-gray-800/40 border-gray-600/30 hover:bg-gray-700/50'
                    }
                    border transform-gpu will-change-transform
                    hover:scale-102 hover:shadow-lg
                  `}
                >
                  {/* Animated background glow */}
                  <div 
                    className={`
                      absolute inset-0 rounded-2xl transition-opacity duration-500
                      bg-gradient-to-br from-indigo-500/10 to-purple-500/10
                      ${isActive ? 'opacity-100' : 'opacity-0'}
                    `}
                  />
                  
                  <div className="relative z-10 text-center flex flex-col flex-1">
                    <h3 className={`text-xl md:text-2xl mb-4 transition-all duration-300 ${
                      isActive ? 'font-bold' : 'font-semibold'
                    } ${
                      step.color === 'indigo' ? 'text-indigo-400' : 
                      step.color === 'green' ? 'text-green-400' :
                      step.color === 'purple' ? 'text-purple-400' :
                      step.color === 'blue' ? 'text-blue-400' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-white leading-relaxed font-light text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit-0 { from { transform: translate(-50%, -50%) rotate(0deg) translateY(-50px); } to { transform: translate(-50%, -50%) rotate(360deg) translateY(-50px); } }
        @keyframes orbit-1 { from { transform: translate(-50%, -50%) rotate(60deg) translateY(-50px); } to { transform: translate(-50%, -50%) rotate(420deg) translateY(-50px); } }
        @keyframes orbit-2 { from { transform: translate(-50%, -50%) rotate(120deg) translateY(-50px); } to { transform: translate(-50%, -50%) rotate(480deg) translateY(-50px); } }
        @keyframes orbit-3 { from { transform: translate(-50%, -50%) rotate(180deg) translateY(-50px); } to { transform: translate(-50%, -50%) rotate(540deg) translateY(-50px); } }
        @keyframes orbit-4 { from { transform: translate(-50%, -50%) rotate(240deg) translateY(-50px); } to { transform: translate(-50%, -50%) rotate(600deg) translateY(-50px); } }
        @keyframes orbit-5 { from { transform: translate(-50%, -50%) rotate(300deg) translateY(-50px); } to { transform: translate(-50%, -50%) rotate(660deg) translateY(-50px); } }
      `}</style>
    </div>
  );
};

export default AnimatedProcessTimeline;
