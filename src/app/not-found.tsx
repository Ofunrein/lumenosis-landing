'use client'

import Link from 'next/link'
import StarBorderOutline from '../components/StarBorderOutline'
import ReactBits3DButton from '../components/ReactBits3DButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none z-0"
           style={{
             background: `
               radial-gradient(ellipse 80% 50% at 50% 50%, #6366f108 0%, transparent 50%),
               radial-gradient(ellipse 60% 40% at 30% 60%, #8b5cf608 0%, transparent 50%)
             `
           }} />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="animate-fadeInUp">
          {/* 404 Number */}
          <h1 className="text-8xl md:text-9xl font-bold mb-6">
            <span className="gradient-text">404</span>
          </h1>
          
          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          
          <p className="text-xl text-white/80 mb-8 max-w-md mx-auto">
            Looks like this page took a vacation. Don't worry—we'll get you back on track.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Back to Home */}
            <StarBorderOutline color="#6366f1" speed="4s">
              <Link href="/">
                <ReactBits3DButton
                  variant="primary"
                  size="lg"
                >
                  <i className="fas fa-home mr-2"></i>
                  Back to Home
                </ReactBits3DButton>
              </Link>
            </StarBorderOutline>
            
            {/* Book a Demo */}
            <StarBorderOutline color="#8b5cf6" speed="4s">
              <Link href="/#contact">
                <ReactBits3DButton
                  variant="secondary"
                  size="lg"
                >
                  <i className="fas fa-calendar mr-2"></i>
                  Book a Demo
                </ReactBits3DButton>
              </Link>
            </StarBorderOutline>
          </div>
          
          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm mb-4">Quick Links:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/#solutions" className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                AI Agents
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/#demos" className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                Demos
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/lead-magnet" className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                Blog
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/#cases" className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                Case Studies
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/#about" className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

