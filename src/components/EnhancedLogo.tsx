'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface EnhancedLogoProps {
  className?: string;
}

const EnhancedLogo: React.FC<EnhancedLogoProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // Trigger click animation
    setIsClicked(true);
    setIsHovered(true);
    
    // Reset click state quickly for bounce effect
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
    
    // Reset hover state after animation completes
    setTimeout(() => {
      setIsHovered(false);
    }, 800); // Let animation play for 800ms
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  return (
    <Link 
      href="/"
      className={`group relative inline-flex items-center gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {/* Logo Image with Enhanced Effects */}
      <div className="relative">
        {/* Main logo container */}
        <div className={`
          relative w-10 h-10 rounded-xl overflow-hidden
          transition-all duration-500 transform-gpu
          ${isClicked ? 'scale-95' : isHovered ? 'scale-110' : 'scale-100'}
        `}>
          {/* Animated background glow */}
          <div className={`
            absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 
            transition-opacity duration-500 blur-sm
            ${isHovered ? 'opacity-60' : 'opacity-0'}
          `} />
          
          {/* Logo Image */}
          <div className="relative z-10 w-full h-full">
            <Image 
              src="/lumenosis-logo.png"
              alt="Lumenosis AI Logo"
              width={40}
              height={40}
              className={`w-full h-full object-contain transition-all duration-300 ${isClicked ? 'scale-125 rotate-3' : isHovered ? 'scale-110' : ''}`}
              priority
            />
          </div>
          
          {/* Orbiting particles */}
          {isHovered && (
            <>
              <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full animate-ping opacity-75" />
              <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-60" />
              <div className="absolute left-0 top-1/2 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-50" />
            </>
          )}
        </div>
      </div>
      
      {/* Enhanced Text Logo */}
      <div className="relative">
        <div className={`
          text-2xl font-bold tracking-tight transition-all duration-300
          ${isClicked ? 'text-yellow-300 scale-110' : isHovered ? 'text-white scale-105' : 'text-gray-100'}
        `}>
          <span className="relative">
            Lumenosis
            {/* Animated underline */}
            <div className={`
              absolute bottom-0 left-0 transition-all duration-500 ease-out
              ${isClicked ? 'h-1 w-full opacity-100 bg-gradient-to-r from-yellow-400 to-yellow-300' : 
                isHovered ? 'h-0.5 w-full opacity-100 bg-gradient-to-r from-indigo-400 to-purple-500' : 
                'h-0.5 w-0 opacity-0 bg-gradient-to-r from-indigo-400 to-purple-500'}
            `} />
          </span>
          <span className={`
            ml-2 text-lg font-medium transition-all duration-300
            ${isClicked ? 'text-yellow-400 scale-125' : isHovered ? 'text-indigo-300' : 'text-indigo-400'}
          `}>
            AI
          </span>
        </div>
        
      </div>
      
      {/* Hover glow effect */}
      <div className={`
        absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10
        transition-opacity duration-300 pointer-events-none
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
    </Link>
  );
};

export default EnhancedLogo;
