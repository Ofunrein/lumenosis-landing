'use client'

import React from 'react'
import CountingNumber from './CountingNumber'
import TypewriterEffect from './TypewriterEffect'
import ReactBits3DButton from './ReactBits3DButton'
import StarBorderOutline from './StarBorderOutline'
import Aurora from './Aurora'
import TiltedCard from './TiltedCard'

// React Bits components - these would be imported from the react-bits package
// For now, we'll create simplified versions that match the React Bits API
interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

interface AnimatedBackgroundProps {
  children: React.ReactNode
  className?: string
  variant?: 'aurora' | 'particles' | 'gradient'
  colors?: string[]
}

// Simplified MagneticButton component with React Bits-style magnetic effect
const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  href, 
  target, 
  rel, 
  onClick 
}) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const buttonRef = React.useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {children}
    </button>
  )
}

// Simplified AnimatedBackground component with React Bits-style effects
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  children, 
  className = '', 
  variant = 'aurora',
  colors = ['#6366f1', '#8b5cf6', '#ec4899']
}) => {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'aurora':
        return {
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, ${colors[0]}15 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 80% 50%, ${colors[1]}15 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 40% 80%, ${colors[2]}15 0%, transparent 50%)
          `,
          animation: 'aurora 8s ease-in-out infinite alternate'
        }
      case 'particles':
        return {
          background: `
            radial-gradient(circle at 25% 25%, ${colors[0]}08 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, ${colors[1]}08 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${colors[2]}08 0%, transparent 50%)
          `,
          animation: 'particles 12s linear infinite'
        }
      default:
        return {
          background: `linear-gradient(-45deg, ${colors[0]}10, ${colors[1]}10, ${colors[2]}10, ${colors[0]}10)`,
          backgroundSize: '400% 400%',
          animation: 'gradient 8s ease infinite'
        }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 opacity-50"
        style={getBackgroundStyle()}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface ReactBitsHeroSectionProps {
  className?: string
}

export default function ReactBitsHeroSection({ className = '' }: ReactBitsHeroSectionProps) {
  return (
    <div className={`relative pt-20 sm:pt-32 pb-4 sm:pb-8 px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Enhanced Aurora Effect - More Visible */}
      <div className="absolute inset-0 z-0">
        <Aurora 
          colorStops={["#6366f1", "#8b5cf6", "#ec4899"]}
          blend={0.8}
          amplitude={2.0}
          speed={0.5}
          fps={30}
          pixelRatio={0.65}
          className="w-full h-full"
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10" data-aos="fade-up">
        <div className="flex flex-col items-center text-center mb-8">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-sm">
            <div className="flex text-yellow-400 mr-2">
              <i className="fas fa-star text-sm"></i>
              <i className="fas fa-star text-sm"></i>
              <i className="fas fa-star text-sm"></i>
              <i className="fas fa-star text-sm"></i>
              <i className="fas fa-star text-sm"></i>
            </div>
            <span className="text-indigo-300 text-sm font-medium">Trusted by 50+ Real Estate Professionals</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-center max-w-4xl mx-auto">
            <span className="block text-white text-4xl sm:text-5xl md:text-6xl">Get </span>
            <span className="block mt-2 typewriter-glow text-4xl sm:text-5xl md:text-6xl">
              <TypewriterEffect 
                words={["3X More Bookings", "60s Response Time", "24/7 Lead Capture", "Weekend Conversions"]}
                typeSpeed={150}
                deleteSpeed={100}
                delayBetweenWords={3000}
              />
            </span>
            <span className="block mt-2 text-white">While You Sleep</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-lg sm:text-xl text-white max-w-3xl mx-auto font-semibold">
            Lead qualification, appointment booking, follow-ups, pipeline management, and all your busywork handled intelligently 24/7.
          </p>
          <p className="mt-3 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            <span className="text-green-400 font-semibold">78% faster response</span> than competitors. 
            <span className="text-indigo-400 font-semibold"> Save 15+ hours weekly.</span>
          </p>
          
          {/* CTA Buttons with Magnetic Effects */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <StarBorderOutline color="#8b5cf6" speed="3s">
              <ReactBits3DButton
                href="https://calendly.com/lumenosis/30min" 
                target="_blank" 
                rel="noopener"
                variant="gradient"
                size="lg"
              >
                <i className="fas fa-phone mr-2"></i>
                Book Free Strategy Call
              </ReactBits3DButton>
            </StarBorderOutline>
            <StarBorderOutline color="#6366f1" speed="4s">
              <ReactBits3DButton
                href="#demos"
                variant="outline"
                size="lg"
              >
                <i className="fas fa-play mr-2"></i>
                See Live Demo
              </ReactBits3DButton>
            </StarBorderOutline>
          </div>
          
          {/* Key Metrics - Mobile Optimized Square Layout */}
          <div className="mt-8">
            {/* Top Row: 60s and 3X side by side on mobile */}
            <div className="flex justify-center gap-3 sm:gap-6 lg:gap-8 mb-4">
              <TiltedCard
                containerHeight="auto"
                containerWidth="auto"
                scaleOnHover={1.1}
                rotateAmplitude={6}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div className="glass-effect bg-indigo-500/10 border-2 border-indigo-500/30 rounded-xl px-3 py-4 sm:px-6 sm:py-4 text-center w-[140px] h-[80px] sm:w-[160px] sm:h-[90px] flex flex-col justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/50 cursor-pointer hover:bg-indigo-500/20 hover:border-indigo-400/60">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-400 transition-all duration-300 ease-out">
                    <CountingNumber end={60} suffix="s" />
                  </div>
                  <div className="text-xs sm:text-sm text-white font-medium">Response Time</div>
                </div>
              </TiltedCard>
              
              <TiltedCard
                containerHeight="auto"
                containerWidth="auto"
                scaleOnHover={1.1}
                rotateAmplitude={6}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div className="glass-effect bg-green-500/10 border-2 border-green-500/30 rounded-xl px-3 py-4 sm:px-6 sm:py-4 text-center w-[140px] h-[80px] sm:w-[160px] sm:h-[90px] flex flex-col justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/50 cursor-pointer hover:bg-green-500/20 hover:border-green-400/60">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 transition-all duration-300 ease-out">
                    <CountingNumber end={3} suffix="X" />
                  </div>
                  <div className="text-xs sm:text-sm text-white font-medium">More Bookings</div>
                </div>
              </TiltedCard>
              
              {/* Third Card - Hidden on mobile, shows inline on desktop */}
              <div className="hidden lg:block">
                <TiltedCard
                  containerHeight="auto"
                  containerWidth="auto"
                  scaleOnHover={1.1}
                  rotateAmplitude={6}
                  showMobileWarning={false}
                  showTooltip={false}
                >
                  <div className="glass-effect bg-purple-500/10 border-2 border-purple-500/30 rounded-xl px-6 py-4 text-center w-[160px] h-[90px] flex flex-col justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer hover:bg-purple-500/20 hover:border-purple-400/60">
                    <div className="text-3xl font-bold text-purple-400">24/7</div>
                    <div className="text-sm text-white font-medium">AI Working</div>
                  </div>
                </TiltedCard>
              </div>
            </div>

            {/* Bottom Row: 24/7 centered on mobile/tablet */}
            <div className="lg:hidden flex justify-center w-full">
              <div className="flex justify-center">
                <TiltedCard
                  containerHeight="auto"
                  containerWidth="auto"
                  scaleOnHover={1.1}
                  rotateAmplitude={6}
                  showMobileWarning={false}
                  showTooltip={false}
                >
                  <div className="glass-effect bg-purple-500/10 border-2 border-purple-500/30 rounded-xl px-3 py-4 sm:px-6 sm:py-4 text-center w-[140px] h-[80px] sm:w-[160px] sm:h-[90px] flex flex-col justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer hover:bg-purple-500/20 hover:border-purple-400/60">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-400">24/7</div>
                    <div className="text-xs sm:text-sm text-white font-medium">AI Working</div>
                  </div>
                </TiltedCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom keyframes for animations */}
      <style jsx>{`
        @keyframes aurora {
          0%, 100% {
            transform: translateX(0%) translateY(0%) scale(1);
          }
          25% {
            transform: translateX(5%) translateY(-10%) scale(1.05);
          }
          50% {
            transform: translateX(-5%) translateY(5%) scale(0.95);
          }
          75% {
            transform: translateX(10%) translateY(-5%) scale(1.02);
          }
        }
        
        @keyframes particles {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) rotate(120deg);
          }
          66% {
            transform: translateY(30px) rotate(240deg);
          }
          100% {
            transform: translateY(0px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
