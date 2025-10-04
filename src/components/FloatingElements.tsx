'use client';

import React, { useEffect, useState } from 'react';

interface FloatingIcon {
  id: number;
  icon: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface FloatingElementsProps {
  icons?: string[];
  count?: number;
  containerClass?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  icons = [
    'fas fa-robot',
    'fas fa-chart-line',
    'fas fa-lightning-bolt',
    'fas fa-cog',
    'fas fa-rocket',
    'fas fa-brain',
    'fas fa-magic',
    'fas fa-star'
  ],
  count = 12,
  containerClass = ''
}) => {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const generateIcons = () => {
      const newIcons: FloatingIcon[] = [];
      const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];

      for (let i = 0; i < count; i++) {
        newIcons.push({
          id: i,
          icon: icons[Math.floor(Math.random() * icons.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 15,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      setFloatingIcons(newIcons);
    };

    generateIcons();
  }, [count, icons]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClass}`}>
      {floatingIcons.map((floatingIcon) => (
        <div
          key={floatingIcon.id}
          className="absolute opacity-20 hover:opacity-40 transition-opacity duration-300"
          style={{
            left: `${floatingIcon.x}%`,
            top: `${floatingIcon.y}%`,
            animationDelay: `${floatingIcon.delay}s`,
            animation: `float-${floatingIcon.id} ${floatingIcon.duration}s ease-in-out infinite`
          }}
        >
          <i
            className={floatingIcon.icon}
            style={{
              fontSize: `${floatingIcon.size}px`,
              color: floatingIcon.color,
              filter: 'drop-shadow(0 0 10px currentColor)',
              animation: `glow-pulse ${floatingIcon.duration * 0.6}s ease-in-out infinite alternate`
            }}
          />
        </div>
      ))}
      
      <style jsx>{`
        ${floatingIcons.map(icon => `
          @keyframes float-${icon.id} {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateY(-20px) rotate(5deg);
            }
            50% {
              transform: translateY(-10px) rotate(-3deg);
            }
            75% {
              transform: translateY(-25px) rotate(7deg);
            }
          }
        `).join('')}
        
        @keyframes glow-pulse {
          0% {
            filter: drop-shadow(0 0 5px currentColor);
          }
          100% {
            filter: drop-shadow(0 0 20px currentColor);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingElements;






