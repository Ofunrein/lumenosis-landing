'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Benefits data structure
interface Benefit {
  icon: string;
  title: string;
  description: string;
  color: string;
  ambientClass: string;
  colorRgb: string;
}

const benefits: Benefit[] = [
  {
    icon: "fas fa-chart-line",
    title: "Increased Efficiency",
    description: "Streamline processes with AI automation, saving time.",
    color: "indigo",
    ambientClass: "ambient-indigo",
    colorRgb: "99, 102, 241"
  },
  {
    icon: "fas fa-wallet",
    title: "Cost Savings",
    description: "Lower operational costs and reallocate resources effectively.",
    color: "green",
    ambientClass: "ambient-green",
    colorRgb: "34, 197, 94"
  },
  {
    icon: "fas fa-user-circle",
    title: "Personalization",
    description: "Deliver personalized experiences, enhancing customer satisfaction.",
    color: "purple",
    ambientClass: "ambient-purple",
    colorRgb: "139, 92, 246"
  },
  {
    icon: "fas fa-expand-arrows-alt",
    title: "Scalability",
    description: "Scale operations easily to meet growing demands.",
    color: "blue",
    ambientClass: "ambient-blue",
    colorRgb: "59, 130, 246"
  },
  {
    icon: "fas fa-bolt",
    title: "Increased Revenue",
    description: "Drive more sales and conversions, generating higher profits with less effort.",
    color: "yellow",
    ambientClass: "ambient-yellow",
    colorRgb: "234, 179, 8"
  },
  {
    icon: "fas fa-puzzle-piece",
    title: "Adaptive Solutions",
    description: "Adapt to changing circumstances, ensuring solutions remain effective.",
    color: "pink",
    ambientClass: "ambient-pink",
    colorRgb: "236, 72, 153"
  }
];

// React Bits Static Background Component (No Animation)
const AuroraBG: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `
        }}
      />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, transparent 30%),
            linear-gradient(-45deg, rgba(139, 92, 246, 0.05) 0%, transparent 30%),
            linear-gradient(135deg, rgba(236, 72, 153, 0.03) 0%, transparent 30%)
          `
        }}
      />
    </div>
  );
};

// React Bits Magnetic Card Component - Simplified and Stable
interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
}

const MagneticCard: React.FC<MagneticCardProps> = ({ 
  children, 
  className = '',
  index
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Gentle magnetic effect
    const rotateX = ((y - centerY) / rect.height) * 15;
    const rotateY = ((centerX - x) / rect.width) * 15;
    
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-aos="fade-up" 
      data-aos-delay={`${(index % 3 + 1) * 100}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className="transition-transform duration-200 ease-out"
        style={{
          transform: transform,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Enhanced Benefit Card Component
interface BenefitCardProps {
  benefit: Benefit;
  index: number;
  onClick: (title: string) => void;
  isClicked: boolean;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, index, onClick, isClicked }) => {
  return (
    <MagneticCard 
      className="rb-service-card-wrapper"
      index={index}
    >
      <div
        onClick={() => onClick(benefit.title)}
        className={`
          rb-enhanced-card card-gradient card-ambient ${benefit.ambientClass}
          rounded-2xl p-4 sm:p-6 md:p-8 text-left flex items-center space-x-4 sm:space-x-6
          group cursor-pointer transition-all duration-500 ease-out
          backdrop-blur-enhanced transform-gpu will-change-transform
          border border-white/10 hover:border-opacity-30
          relative overflow-hidden h-full min-h-[140px] sm:min-h-[160px] md:min-h-[180px] z-0 isolate
          ${isClicked ? 'scale-95' : ''}
        `} 
        style={{
          background: `linear-gradient(135deg, 
            rgba(15, 23, 42, 0.4) 0%,
            rgba(15, 23, 42, 0.5) 100%),
            linear-gradient(135deg, 
            rgba(${benefit.colorRgb}, 0.08) 0%, 
            rgba(${benefit.colorRgb}, 0.04) 50%, 
            rgba(${benefit.colorRgb}, 0.08) 100%)`,
          backdropFilter: 'blur(12px)',
          boxShadow: `0 10px 40px rgba(${benefit.colorRgb}, 0.15)`
        }}
      >
        {/* Click Effect Spark - Smoother */}
        <motion.div
          className="absolute -inset-[1px] pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isClicked ? [0, 0.3, 0] : 0,
            scale: isClicked ? [1, 1.05, 1] : 1
          }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <div 
            className="absolute inset-0 rounded-2xl blur-2xl" 
            style={{ backgroundColor: `rgba(${benefit.colorRgb}, 0.3)` }} 
          />
        </motion.div>
        
        {/* Enhanced background gradient overlay */}
        <div 
          className={`
            absolute -inset-[1px] opacity-0 group-hover:opacity-100 
            transition-opacity duration-500 pointer-events-none
            bg-gradient-to-br rounded-2xl
          `}
          style={{
            background: `linear-gradient(135deg, 
              rgba(${benefit.colorRgb}, 0.1) 0%, 
              transparent 50%, 
              rgba(${benefit.colorRgb}, 0.1) 100%)`
          }}
        />
        
        {/* Compact Icon Container */}
        <div 
          className={`
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br rounded-xl
            flex items-center justify-center
            group-hover:scale-110 transition-all duration-300 flex-shrink-0
          `}
          style={{
            background: `linear-gradient(135deg, rgba(${benefit.colorRgb}, 0.3) 0%, rgba(${benefit.colorRgb}, 0.1) 100%)`
          }}
        >
          <i 
            className={`${benefit.icon} text-lg sm:text-xl md:text-2xl transition-all duration-300`}
            style={{ color: `rgb(${benefit.colorRgb})` }}
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 relative z-10 flex flex-col">
          {/* Colored Title */}
          <h3 className="text-lg font-bold mb-2 tracking-wide transition-colors duration-300"
              style={{ color: `rgb(${benefit.colorRgb})` }}>
            {benefit.title}
          </h3>

          {/* Compact Description */}
          <p className="text-white text-sm leading-relaxed transition-colors duration-300">
            {benefit.description}
          </p>
        </div>
      </div>
    </MagneticCard>
  );
};

// Main React Bits Benefits Section Component
const ReactBitsBenefitsSection: React.FC = () => {
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const handleCardClick = (cardTitle: string) => {
    setClickedCard(cardTitle);
    setTimeout(() => setClickedCard(null), 300);
  };
  return (
    <section 
      id="results" 
      className="relative pt-16 sm:pt-24 py-8 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" 
      data-aos="fade-up"
    >
      {/* React Bits Aurora Background */}
      <AuroraBG />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Section Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Discover the <span className="gradient-text">Advantages</span> of Partnering With Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Enhanced Benefits Grid */}
        <div className="mt-6 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 relative items-stretch">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={benefit.title} 
              benefit={benefit} 
              index={index}
              onClick={handleCardClick}
              isClicked={clickedCard === benefit.title}
            />
          ))}
        </div>
      </div>

      {/* Static Background Effects - No Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>
    </section>
  );
};

export default ReactBitsBenefitsSection;
