'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface ReactBits3DButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  target?: string;
  rel?: string;
  disabled?: boolean;
}

const ReactBits3DButton: React.FC<ReactBits3DButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  target,
  rel,
  disabled = false
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  // Variant classes with 3D appearance and better text contrast
  const variantClasses = {
    primary: `
      bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-800 text-white
      border-t border-indigo-400/50 border-b-2 border-indigo-900
      shadow-lg shadow-indigo-900/50
    `,
    secondary: `
      bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900 text-white
      border-t border-gray-500/50 border-b-2 border-gray-900
      shadow-lg shadow-gray-900/50
    `,
    gradient: `
      bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800 text-white
      border-t border-purple-400/50 border-b-2 border-purple-900
      shadow-lg shadow-purple-900/50
    `,
    outline: `
      bg-gradient-to-b from-gray-800/90 via-gray-800 to-gray-900 text-white
      border-2 border-indigo-500/70 border-t border-indigo-400/50 border-b-2 border-indigo-700
      shadow-lg shadow-indigo-900/30
    `
  };

  const baseClasses = `
    ${className.includes('!block') ? 'flex w-full' : 'inline-flex'} items-center justify-center font-semibold rounded-full
    relative overflow-hidden select-none
    transition-all duration-200 transform-gpu
    text-shadow-sm 
    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:transform hover:translate-y-[-2px] hover:shadow-xl active:transform active:translate-y-[1px] active:shadow-md'}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
    `;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20; // Reduced intensity
    const rotateY = (centerX - x) / 20; // Reduced intensity
    
    buttonRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateY(-2px)
    `;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    
    buttonRef.current.style.transform = `
      perspective(1000px) 
      rotateX(0deg) 
      rotateY(0deg) 
      translateY(0px)
    `;
  };

  const ButtonContent = () => (
    <motion.div
      ref={buttonRef}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Text content with better contrast */}
      <span className="relative z-10 flex items-center justify-center gap-2 font-medium text-white drop-shadow-lg w-full">
        {children}
      </span>
      
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={disabled ? undefined : onClick} className={`group ${disabled ? 'pointer-events-none' : ''} ${className.includes('!block') ? 'block w-full' : ''}`}>
        <ButtonContent />
      </a>
    );
  }

  return (
    <div onClick={disabled ? undefined : onClick} className={`group ${className.includes('!block') ? 'block w-full' : ''}`}>
      <ButtonContent />
    </div>
  );
};

export default ReactBits3DButton;
