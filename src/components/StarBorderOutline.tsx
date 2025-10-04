import React from 'react';

interface StarBorderOutlineProps {
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
}

const StarBorderOutline: React.FC<StarBorderOutlineProps> = ({
  className = '',
  color = '#8b5cf6',
  speed = '6s',
  children,
}) => {
  return (
    <div className={`relative ${className?.includes('w-full') ? 'block' : 'inline-block'} ${className}`}>
      {/* Create padding space for the border effect */}
      <div className={`absolute overflow-hidden rounded-full ${className?.includes('mobile-subtle') ? '-inset-[1px] sm:-inset-[2px]' : '-inset-[2px]'}`}>
        {/* Top moving star */}
        <div
          className="absolute w-[300%] h-[40%] opacity-100 top-[-8px] left-[-250%] rounded-full animate-star-movement-top"
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, ${color}88 15%, transparent 30%)`,
            animationDuration: speed,
            filter: 'blur(0.5px) brightness(1.5) saturate(1.5)',
            boxShadow: `0 0 15px ${color}, 0 0 30px ${color}66`,
          }}
        />
        {/* Bottom moving star */}
        <div
          className="absolute w-[300%] h-[40%] opacity-100 bottom-[-8px] right-[-250%] rounded-full animate-star-movement-bottom"
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, ${color}88 15%, transparent 30%)`,
            animationDuration: speed,
            filter: 'blur(0.5px) brightness(1.5) saturate(1.5)',
            boxShadow: `0 0 15px ${color}, 0 0 30px ${color}66`,
          }}
        />
      </div>
      {/* Button content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StarBorderOutline;
