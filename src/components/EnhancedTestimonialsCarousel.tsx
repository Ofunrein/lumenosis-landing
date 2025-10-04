'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface EnhancedTestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const EnhancedTestimonialsCarousel: React.FC<EnhancedTestimonialsCarouselProps> = ({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoPlay && !isHovered) {
      intervalRef.current = setInterval(() => {
        setDirection('right');
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isHovered, interval, testimonials.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fas fa-star text-sm ${
          i < rating ? 'text-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div 
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700/50">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="w-full flex-shrink-0 p-8 md:p-12"
            >
              <div className="max-w-4xl mx-auto text-center">
                {/* Rating stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial content */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 italic relative">
                  <span className="text-6xl text-indigo-400/30 absolute -top-4 -left-4 font-serif">"</span>
                  {testimonial.content}
                  <span className="text-6xl text-indigo-400/30 absolute -bottom-8 -right-4 font-serif">"</span>
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {testimonial.avatar ? (
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-400/50 animate-pulse" />
                  </div>

                  {/* Name and role */}
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">{testimonial.name}</div>
                    <div className="text-indigo-400 font-medium">{testimonial.role}</div>
                    <div className="text-white/80 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 flex items-center justify-center text-white hover:bg-gray-700/80 transition-all duration-300 hover:scale-110"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 flex items-center justify-center text-white hover:bg-gray-700/80 transition-all duration-300 hover:scale-110"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900/50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900/50 to-transparent pointer-events-none" />
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 scale-125 shadow-lg shadow-indigo-500/50' 
                : 'bg-gray-600 hover:bg-gray-500'
              }
            `}
          />
        ))}
      </div>

      {/* Background decorative elements */}
      <div className="absolute -inset-32 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default EnhancedTestimonialsCarousel;

