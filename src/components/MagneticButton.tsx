'use client';

import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const maxMove = 8;
    const moveX = deltaX * maxMove;
    const moveY = deltaY * maxMove;
    
    buttonRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || disabled) return;
    
    buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `
          bg-gradient-to-r from-indigo-600 to-purple-600 
          hover:from-indigo-500 hover:to-purple-500
          text-white shadow-lg hover:shadow-xl
          border border-indigo-500/50 hover:border-indigo-400/50
        `;
      case 'secondary':
        return `
          bg-gray-800/60 hover:bg-gray-700/80
          text-white border border-gray-600/50 hover:border-gray-500/50
          backdrop-filter backdrop-blur-sm
        `;
      case 'ghost':
        return `
          bg-transparent hover:bg-white/5
          text-indigo-400 hover:text-indigo-300
          border border-indigo-500/30 hover:border-indigo-400/50
        `;
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return '';
    }
  };

  const baseClasses = `
    relative overflow-hidden rounded-xl font-semibold
    transition-all duration-300 ease-out
    transform-gpu will-change-transform
    disabled:opacity-50 disabled:cursor-not-allowed
    inline-flex items-center justify-center
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${className}
  `;

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef as any}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      href={href}
      disabled={disabled}
      style={{
        willChange: 'transform',
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
      
      {/* Glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-xl blur-xl transition-opacity duration-300
          ${variant === 'primary' ? 'bg-gradient-to-r from-indigo-500/50 to-purple-500/50' : ''}
          ${isHovered ? 'opacity-60' : 'opacity-0'}
        `}
      />
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div 
          className={`
            absolute inset-0 bg-gradient-to-r from-white/20 to-white/20
            transform scale-0 transition-transform duration-500
            ${isHovered ? 'scale-100' : 'scale-0'}
          `}
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }}
        />
      </div>
      
      <span className="relative z-10">{children}</span>
    </Component>
  );
};

export default MagneticButton;






