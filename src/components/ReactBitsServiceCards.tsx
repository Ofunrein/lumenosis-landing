'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TiltedCard from './TiltedCard';

// Color mapping for proper Tailwind class generation and accessibility
const colorClasses = {
  indigo: {
    bg: 'bg-indigo-500',
    bgHover: 'group-hover:bg-indigo-400',
    textHover: 'group-hover:text-indigo-100',
    borderHover: 'hover:border-indigo-500/30',
    gradient: 'bg-gradient-to-br from-indigo-500/10 via-transparent to-indigo-600/10',
    progressGradient: 'bg-gradient-to-r from-indigo-500 to-indigo-400',
    shadow: 'shadow-lg shadow-indigo-500/30',
    clickEffect: 'bg-indigo-400/20',
    arrowText: 'text-indigo-400',
    ambient: 'ambient-indigo',
    hex: '#6366f1'
  },
  purple: {
    bg: 'bg-purple-500',
    bgHover: 'group-hover:bg-purple-400',
    textHover: 'group-hover:text-purple-100',
    borderHover: 'hover:border-purple-500/30',
    gradient: 'bg-gradient-to-br from-purple-500/10 via-transparent to-purple-600/10',
    progressGradient: 'bg-gradient-to-r from-purple-500 to-purple-400',
    shadow: 'shadow-lg shadow-purple-500/30',
    clickEffect: 'bg-purple-400/20',
    arrowText: 'text-purple-400',
    ambient: 'ambient-purple',
    hex: '#8b5cf6'
  },
  green: {
    bg: 'bg-green-500',
    bgHover: 'group-hover:bg-green-400',
    textHover: 'group-hover:text-green-100',
    borderHover: 'hover:border-green-500/30',
    gradient: 'bg-gradient-to-br from-green-500/10 via-transparent to-green-600/10',
    progressGradient: 'bg-gradient-to-r from-green-500 to-green-400',
    shadow: 'shadow-lg shadow-green-500/30',
    clickEffect: 'bg-green-400/20',
    arrowText: 'text-green-400',
    ambient: 'ambient-green',
    hex: '#22c55e'
  },
  yellow: {
    bg: 'bg-yellow-500',
    bgHover: 'group-hover:bg-yellow-400',
    textHover: 'group-hover:text-yellow-100',
    borderHover: 'hover:border-yellow-500/30',
    gradient: 'bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-600/10',
    progressGradient: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
    shadow: 'shadow-lg shadow-yellow-500/30',
    clickEffect: 'bg-yellow-400/20',
    arrowText: 'text-yellow-400',
    ambient: 'ambient-yellow',
    hex: '#eab308'
  },
  blue: {
    bg: 'bg-blue-500',
    bgHover: 'group-hover:bg-blue-400',
    textHover: 'group-hover:text-blue-100',
    borderHover: 'hover:border-blue-500/30',
    gradient: 'bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/10',
    progressGradient: 'bg-gradient-to-r from-blue-500 to-blue-400',
    shadow: 'shadow-lg shadow-blue-500/30',
    clickEffect: 'bg-blue-400/20',
    arrowText: 'text-blue-400',
    ambient: 'ambient-blue',
    hex: '#3b82f6'
  },
  pink: {
    bg: 'bg-pink-500',
    bgHover: 'group-hover:bg-pink-400',
    textHover: 'group-hover:text-pink-100',
    borderHover: 'hover:border-pink-500/30',
    gradient: 'bg-gradient-to-br from-pink-500/10 via-transparent to-pink-600/10',
    progressGradient: 'bg-gradient-to-r from-pink-500 to-pink-400',
    shadow: 'shadow-lg shadow-pink-500/30',
    clickEffect: 'bg-pink-400/20',
    arrowText: 'text-pink-400',
    ambient: 'ambient-pink',
    hex: '#ec4899'
  },
  red: {
    bg: 'bg-red-500',
    bgHover: 'group-hover:bg-red-400',
    textHover: 'group-hover:text-red-100',
    borderHover: 'hover:border-red-500/30',
    gradient: 'bg-gradient-to-br from-red-500/10 via-transparent to-red-600/10',
    progressGradient: 'bg-gradient-to-r from-red-500 to-red-400',
    shadow: 'shadow-lg shadow-red-500/30',
    clickEffect: 'bg-red-400/20',
    arrowText: 'text-red-400',
    ambient: 'ambient-red',
    hex: '#ef4444'
  },
  cyan: {
    bg: 'bg-cyan-500',
    bgHover: 'group-hover:bg-cyan-400',
    textHover: 'group-hover:text-cyan-100',
    borderHover: 'hover:border-cyan-500/30',
    gradient: 'bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-600/10',
    progressGradient: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
    shadow: 'shadow-lg shadow-cyan-500/30',
    clickEffect: 'bg-cyan-400/20',
    arrowText: 'text-cyan-400',
    ambient: 'ambient-cyan',
    hex: '#06b6d4'
  },
  orange: {
    bg: 'bg-orange-500',
    bgHover: 'group-hover:bg-orange-400',
    textHover: 'group-hover:text-orange-100',
    borderHover: 'hover:border-orange-500/30',
    gradient: 'bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10',
    progressGradient: 'bg-gradient-to-r from-orange-500 to-orange-400',
    shadow: 'shadow-lg shadow-orange-500/30',
    clickEffect: 'bg-orange-400/20',
    arrowText: 'text-orange-400',
    ambient: 'ambient-orange',
    hex: '#f97316'
  }
} as const;

type ColorKey = keyof typeof colorClasses;

interface ServiceCard {
  id: string;
  title: string;
  icon: string;
  problem: string;
  solution: string;
  color: ColorKey;
  delay: number;
}

const serviceCards: ServiceCard[] = [
  {
    id: 'response',
    title: '60-Second Lead Response',
    icon: 'fas fa-envelope',
    problem: 'Leads wait hours for a reply.',
    solution: 'Be first, win more deals.',
    color: 'indigo',
    delay: 0  // First row
  },
  {
    id: 'booking',
    title: '24/7 Showing & Appointment Booking',
    icon: 'fas fa-envelope-open-text',
    problem: 'Calls pile up overnight.',
    solution: 'Triple showings without extra staff.',
    color: 'purple',
    delay: 0  // First row
  },
  {
    id: 'qualification',
    title: 'Smart Lead Qualification',
    icon: 'fas fa-user-check',
    problem: 'You waste time on unqualified buyers.',
    solution: 'Only chase serious buyers.',
    color: 'green',
    delay: 0  // First row
  },
  {
    id: 'followup',
    title: 'Automated Follow-Up That Converts',
    icon: 'fas fa-pencil-alt',
    problem: 'Good leads go cold.',
    solution: 'Turn "maybe later" into "let\'s see it this week."',
    color: 'yellow',
    delay: 200  // Second row
  },
  {
    id: 'automation',
    title: 'AI Handles Your Busy Work',
    icon: 'fas fa-file-alt',
    problem: 'Admin tasks eat into selling time.',
    solution: 'AI handles paperwork so you focus on closing deals.',
    color: 'blue',
    delay: 200  // Second row
  },
  {
    id: 'showings',
    title: 'Triple Your Showings Without Lifting a Finger',
    icon: 'fas fa-calendar-check',
    problem: 'Scheduling eats up hours.',
    solution: 'AI books showings automatically, more appointments, zero headaches.',
    color: 'pink',
    delay: 200  // Second row
  },
  {
    id: 'calls',
    title: 'Never Miss Another Call',
    icon: 'fas fa-headset',
    problem: 'Missed calls mean lost deals.',
    solution: 'AI answers every call and books appointments while you\'re busy.',
    color: 'red',
    delay: 400  // Third row
  },
  {
    id: 'conversion',
    title: 'Turn Website Visitors Into Qualified Leads',
    icon: 'fas fa-comment-dots',
    problem: 'Visitors browse and leave.',
    solution: 'AI captures leads and converts browsers into appointments.',
    color: 'cyan',
    delay: 400  // Third row
  },
  {
    id: 'complete',
    title: 'Complete Sales Automation',
    icon: 'fas fa-robot',
    problem: 'Sales process is fragmented.',
    solution: 'Close deals while AI handles the process.',
    color: 'orange',
    delay: 400  // Third row
  }
];

// Simple ClickSpark component for click effects
const ClickSpark: React.FC<{ color: string; isActive: boolean }> = ({ color, isActive }) => {
  if (!isActive) return null;
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 1]
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 rounded-2xl blur-xl" style={{ backgroundColor: `${color}33` }} />
    </motion.div>
  );
};

const ReactBitsServiceCards: React.FC = () => {
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    },
    hover: {
      scale: 1.08,
      y: -12,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 20,
        duration: 0.2
      }
    },
    tap: {
      scale: 0.97,
      transition: {
        type: "spring" as const,
        stiffness: 800,
        damping: 15,
        duration: 0.1
      }
    }
  };

  const handleCardClick = (cardId: string) => {
    setClickedCard(cardId);
    setTimeout(() => setClickedCard(null), 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent, cardId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(cardId);
    }
  };

  return (
    <motion.div 
      className="mt-6 sm:mt-8 grid gap-3 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {serviceCards.map((card, index) => {
        const colors = colorClasses[card.color];
        return (
          <motion.div
            key={card.id}
            variants={cardVariants}
            whileTap="tap"
            role="button"
            tabIndex={0}
            aria-label={`Learn more about ${card.title}`}
            className="rb-service-card-wrapper cursor-pointer focus:outline-none rounded-2xl"
            onClick={() => handleCardClick(card.id)}
            onKeyDown={(e) => handleKeyDown(e, card.id)}
            data-aos="fade-up"
            data-aos-delay={`${card.delay}`}
            data-aos-duration="600"
            data-aos-once="false"
          >
            <TiltedCard
              containerHeight="100%"
              containerWidth="100%"
              scaleOnHover={1.08}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div 
              className={`
                rb-enhanced-card card-gradient card-ambient ${colors.ambient}
                rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-500 ease-out
                group backdrop-blur-enhanced transform-gpu will-change-transform
                border border-white/10 ${colors.borderHover}
                relative overflow-hidden h-full w-full
              `}
              style={{
                background: `linear-gradient(135deg, 
                  rgba(15, 23, 42, 0.6) 0%,
                  rgba(15, 23, 42, 0.7) 100%),
                  linear-gradient(135deg, 
                  rgba(var(--${card.color}-500-rgb), 0.1) 0%, 
                  rgba(var(--${card.color}-600-rgb), 0.05) 50%, 
                  rgba(var(--${card.color}-700-rgb), 0.1) 100%)`
              }}
            >
              {/* Enhanced background gradient overlay */}
              <div 
                className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 pointer-events-none
                  ${colors.gradient}
                `}
              />
              
              {/* Card header with enhanced icon */}
              <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
                <div 
                  className={`
                    flex-shrink-0 flex items-center justify-center 
                    h-12 w-12 sm:h-14 sm:w-14 rounded-xl ${colors.bg} text-white 
                    transition-all duration-300 ${colors.bgHover}
                    group-hover:scale-105
                    ${colors.shadow}
                    rb-magnetic-button
                  `}
                >
                  <i className={`${card.icon} text-lg sm:text-xl`}></i>
                </div>
                <h3 className={`text-base sm:text-lg font-semibold text-white ${colors.textHover} transition-colors duration-300`}>
                  {card.title}
                </h3>
              </div>
              
              {/* Enhanced content section */}
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 relative z-10">
                {/* Problem statement */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                      <i className="fas fa-times text-red-400 text-sm"></i>
                    </div>
                  </div>
                  <p className="text-sm text-white group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {card.problem}
                  </p>
                </div>
                
                {/* Solution statement */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                      <i className="fas fa-check text-green-400 text-sm"></i>
                    </div>
                  </div>
                  <p className="text-sm text-white group-hover:text-gray-200 transition-colors duration-300 leading-relaxed font-medium">
                    {card.solution}
                  </p>
                </div>
              </div>
              
              {/* Enhanced hover indicator */}
              <motion.div 
                className={`
                  absolute bottom-0 left-0 right-0 h-1 
                  ${colors.progressGradient}
                `}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
              
              {/* Click spark effect using ClickSpark component */}
              <ClickSpark color={colors.hex} isActive={clickedCard === card.id} />
              
              {/* Magnetic hover effect indicator */}
              <motion.div 
                className={`absolute top-4 right-4`}
                initial={{ opacity: 0, x: 8 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <i className={`fas fa-arrow-right ${colors.arrowText} text-sm`}></i>
              </motion.div>
            </div>
            </TiltedCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ReactBitsServiceCards;
