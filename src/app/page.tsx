'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { analytics, useScrollTracking, useTimeTracking } from '../lib/analytics'

// Dynamically import heavy components for better performance
const HomepageWidget = dynamic(() => import('../components/HomepageWidget'), {
  ssr: false,
  loading: () => null,
})

const RealEstateAIDemo = dynamic(() => import('../components/RealEstateAIDemo'), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="text-indigo-400">Loading demo...</div>
    </div>
  ),
})

const EnhancedTestimonialsCarousel = dynamic(() => import('../components/EnhancedTestimonialsCarousel'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-indigo-400">Loading testimonials...</div>
    </div>
  ),
})

// Dynamically import ReactBitsServiceCards (uses Framer Motion)
const ReactBitsServiceCards = dynamic(() => import('../components/ReactBitsServiceCards'), {
  loading: () => (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="text-indigo-400">Loading services...</div>
    </div>
  ),
})

import ReactBitsHeroSection from '../components/ReactBitsHeroSection'
import ParticleBackground from '../components/ParticleBackground'
import MagneticButton from '../components/MagneticButton'
import FloatingElements from '../components/FloatingElements'
import AnimatedProcessTimeline from '../components/AnimatedProcessTimeline'
import Aurora from '../components/Aurora'
import TypewriterEffect from '../components/TypewriterEffect'
import EnhancedLogo from '../components/EnhancedLogo'
import ReactBits3DButton from '../components/ReactBits3DButton'
import StarBorderOutline from '../components/StarBorderOutline'
interface FAQItem {
  id: number
  question: string
  answer: string
}

export default function HomePage() {
  // Force refresh - enhanced page active
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFAQs, setOpenFAQs] = useState<number[]>([])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Analytics tracking
  useEffect(() => {
    // Set up tracking for homepage
    const cleanupScroll = useScrollTracking('homepage');
    const cleanupTime = useTimeTracking('homepage');
    
    return () => {
      cleanupScroll?.();
      cleanupTime?.();
    };
  }, []);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How does your AI respond to leads in 60 seconds when I'm showing homes?",
      answer: "While you're showing homes, our AI responds to every lead inquiry within 60 seconds with personalized messages that qualify prospects and book showings directly into your calendar. It works 24/7, so weekend inquiries don't wait until Monday. Real estate agents using our system report booking 300% more showings without hiring extra staff. The AI learns your market, property types, and showing preferences to deliver qualified leads ready to buy."
    },
    {
      id: 2,
      question: "How quickly will I stop losing leads to faster agents?",
      answer: "You'll see immediate results within 24 hours. Our AI starts responding to leads in under 60 seconds from day one. Real estate agents typically see 35% more showings booked within the first week, and 78% of leads get a response before your competition even checks their phone. Home service businesses report saving 15-20 hours per week on admin tasks within the first week. The speed advantage is instant - no waiting period."
    },
    {
      id: 3,
      question: "Will this work with my MLS, CRM, and showing software?",
      answer: "Absolutely. We integrate with all major MLS systems (MLS, RMLS, CRMLS), CRMs (Follow Up Boss, Real Geeks, BoomTown), showing software (ShowingTime, Centralized Showing Service), and property management tools. Your AI automatically syncs property data, showing schedules, and lead information across all platforms. No more double-entry or missed follow-ups. We follow a \"no disruption\" philosophy - your existing workflow stays intact while becoming significantly faster."
    },
    {
      id: 4,
      question: "How do you handle fair housing compliance and client data protection?",
      answer: "Fair housing compliance is built into every AI response. Our system automatically avoids discriminatory language and ensures equal treatment for all prospects. We implement end-to-end encryption (AES-256) for client data, role-based access controls, and regular penetration testing. All systems comply with RESPA, TILA, and state-specific real estate regulations. We maintain SOC 2 Type II compliance and undergo annual audits. Your client data is protected with bank-level security standards."
    },
    {
      id: 5,
      question: "How much does it cost to stop losing deals to faster agents?",
      answer: "Our pricing is based on the deals you'll close, not just features. We have a one-time setup fee and flexible monthly investment based on your business size and goals. Most agents see 3-5x ROI within 90 days - that's significant additional commissions monthly for producers at any level. We offer outcome-based pricing where you pay based on results - if you don't see more showings and closed deals, you don't pay. All plans include complete integration, lead qualification, and 24/7 booking. No long-term contracts - we earn your business each month through results."
    },
    {
      id: 6,
      question: "How does your AI qualify leads better than my team?",
      answer: "Our AI works 24/7 without breaks and consistently follows up on every lead. It asks the right questions in the right order: property type, budget range, timeline, financing status, and motivation. The AI scores leads based on 15+ qualification factors and automatically nurtures prospects with personalized content. Real estate agents report 40% higher lead quality and 60% less time wasted on unqualified buyers. Your team focuses on closing deals while AI handles the qualification grunt work."
    },
    {
      id: 7,
      question: "How does AI help my HVAC/plumbing/roofing business book more service calls?",
      answer: "Our AI responds to service requests within 60 seconds with personalized messages, schedules estimates, and qualifies urgent vs. routine jobs. It handles after-hours emergency calls, weekend inquiries, and seasonal demand spikes without missing opportunities. Home service businesses report 45% more booked estimates and 30% higher conversion rates. The AI learns your service areas, pricing tiers, and availability to deliver qualified leads ready to book appointments."
    },
    {
      id: 8,
      question: "Can your AI handle emergency service requests and after-hours calls?",
      answer: "Absolutely. Our AI works 24/7 and recognizes emergency keywords like 'no heat', 'water leak', or 'electrical emergency'. It immediately escalates urgent requests, sends your emergency contact info, and books priority appointments. For routine inquiries after hours, it qualifies leads and schedules next-day estimates. Home service pros never lose another emergency job to competitors who respond faster at 2 AM or on weekends."
    },
    {
      id: 9,
      question: "Does your system integrate with ServiceTitan, Jobber, and other home service software?",
      answer: "Yes, we integrate with all major home service platforms including ServiceTitan, Jobber, Housecall Pro, FieldEdge, and SimPro. Your AI automatically syncs customer data, job scheduling, estimate requests, and follow-ups across all systems. No more double-entry between your CRM and scheduling software. We follow a 'no disruption' philosophy - your existing workflow stays intact while becoming significantly more efficient."
    },
    {
      id: 10,
      question: "How does lead qualification work for home service estimates vs. real estate showings?",
      answer: "Our AI adapts to each industry's unique qualification process. For home services, it asks about service type, urgency level, budget range, property access, and previous service history. For real estate, it focuses on property type, price range, timeline, financing, and motivation. Home service businesses see 50% better lead quality because the AI pre-qualifies job scope and budget before you drive to estimates. Real estate agents get qualified buyers ready to make offers, not just browsers."
    }
  ]

  const toggleFAQ = (faqId: number) => {
    setOpenFAQs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    )
  }

  useEffect(() => {
    // Ensure this only runs on client side
    if (typeof window === 'undefined') return;
    
    // AOS (Animate On Scroll) Effects
    const aosObserverOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate')
        } else {
          // Remove animation when scrolling back up for smooth re-animation
          entry.target.classList.remove('aos-animate')
        }
      })
    }

    // Create observer for AOS elements
    const aosObserver = new IntersectionObserver(animateOnScroll, aosObserverOptions)
    
    // Observe all elements with AOS classes
    const aosElements = document.querySelectorAll('[data-aos]')
    aosElements.forEach(el => aosObserver.observe(el))

    // Response Time Countdown Animation (few hours -> 60s)
    const responseTimeCounter = document.querySelector('.response-time-counter') as HTMLElement
    if (responseTimeCounter) {
      // Start with "few hours"
      responseTimeCounter.textContent = 'few hours'
      
      setTimeout(() => {
        responseTimeCounter.textContent = '2 hours'
      }, 400)
      
      setTimeout(() => {
        responseTimeCounter.textContent = '1 hour'
      }, 800)
      
      setTimeout(() => {
        responseTimeCounter.textContent = '30 min'
      }, 1200)
      
      setTimeout(() => {
        responseTimeCounter.textContent = '5 min'
      }, 1600)
      
      setTimeout(() => {
        responseTimeCounter.textContent = '60s'
        // Keep original indigo color, don't change to green
      }, 2500)
    }

    // Showings Count-Up Animation is now handled by scroll-triggered animateNumbers function

    // Number animation functionality for Real Results section
    const animateNumbers = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numberElement = entry.target as HTMLElement
          const target = parseInt(numberElement.getAttribute('data-target') || '0')
          
          // Allow re-animation when scrolling back
          numberElement.setAttribute('data-animated', 'true')

          // Store original format in data attribute if not already set
          if (!numberElement.hasAttribute('data-original-format')) {
            const originalText = numberElement.textContent
            numberElement.setAttribute('data-original-format', originalText || '')
          }
          
          const originalFormat = numberElement.getAttribute('data-original-format') || ''
          
          // Count up from 0 to target for other numbers
          let current = 0
          const duration = 2000 // milliseconds
          const increment = target / (duration / 10)
          
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(timer)
            }
            
            // Preserve prefix/suffix formatting like +, %, x, s, etc.
            const match = originalFormat.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/)
            if (match) {
              const prefix = match[1] || ''
              const suffix = match[3] || ''
              numberElement.textContent = `${prefix}${Math.floor(current)}${suffix}`
            } else {
              numberElement.textContent = Math.floor(current).toString()
            }
          }, 10)
          
          // Add animation class for visual effect
          numberElement.classList.add('animate')
        } else {
          // Reset animation when scrolling out of view
          const numberElement = entry.target as HTMLElement
          numberElement.setAttribute('data-animated', 'false')
          numberElement.classList.remove('animate')
          
          // Reset to original text
          const originalFormat = numberElement.getAttribute('data-original-format') || ''
          if (originalFormat) {
            numberElement.textContent = originalFormat
          }
        }
      })
    }

    const observerOptions = {
      threshold: 0.25 // Trigger when 25% of the element is visible
    }

    const numberObserver = new IntersectionObserver(animateNumbers, observerOptions)

    document.querySelectorAll('.animated-number').forEach(number => {
      numberObserver.observe(number)
    })

    // FAQ Accordion functionality
    const faqToggles = document.querySelectorAll('.faq-toggle')
    
    faqToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const content = this.nextElementSibling
        const icon = this.querySelector('.faq-icon')
        const isExpanded = this.getAttribute('aria-expanded') === 'true'
        
        // Update aria-expanded attribute
        this.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false')
        
        // Toggle content visibility with slide animation
        if (isExpanded) {
          // Close accordion
          content.style.maxHeight = content.scrollHeight + 'px'
          setTimeout(() => {
            content.style.maxHeight = '0px'
            content.style.opacity = '0'
            setTimeout(() => {
              content.classList.add('hidden')
              content.style.maxHeight = ''
              // Rotate icon back
              if (icon) icon.style.transform = 'rotate(0deg)'
            }, 200)
          }, 10)
        } else {
          // Open accordion
          content.classList.remove('hidden')
          content.style.maxHeight = '0px'
          content.style.opacity = '0'
          setTimeout(() => {
            content.style.maxHeight = content.scrollHeight + 'px'
            content.style.opacity = '1'
            // Rotate icon to show minus
            if (icon) icon.style.transform = 'rotate(45deg)'
          }, 10)
        }
      })
    })

    // Auto-scroll functionality for qualification videos carousel
    const carouselTrack = document.querySelector('.group-hover\\:pause-animation');
    if (carouselTrack) {
      let scrollPosition = 0;
      const scrollStep = 1;
      const scrollInterval = 50; // Adjust speed here
      
      // Disabled auto-scroll - was causing unwanted page movement
      /*
      const autoScroll = setInterval(() => {
        if (carouselTrack.scrollLeft >= carouselTrack.scrollWidth - carouselTrack.clientWidth) {
          // Reset to beginning when reaching the end
          carouselTrack.scrollLeft = 0;
        } else {
          carouselTrack.scrollLeft += scrollStep;
        }
      }, scrollInterval);

      // Pause on hover
      carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
      });

      carouselTrack.addEventListener('mouseleave', () => {
        // Restart auto-scroll
        setInterval(() => {
          if (carouselTrack.scrollLeft >= carouselTrack.scrollWidth - carouselTrack.clientWidth) {
            carouselTrack.scrollLeft = 0;
          } else {
            carouselTrack.scrollLeft += scrollStep;
          }
        }, scrollInterval);
      });
      */

      // return () => clearInterval(autoScroll);
    }


    // Contact form functionality
    const contactForm = document.getElementById('contact-form')
    
    // Generate a unique form ID for tracking
    const formIdField = document.getElementById('form_id') as HTMLInputElement
    if (formIdField) {
      const timestamp = new Date().getTime()
      const random = Math.floor(Math.random() * 1000)
      formIdField.value = `form_${timestamp}_${random}`
    }

    // Contact form submission handler
    const handleContactFormSubmit = async (event: Event) => {
      event.preventDefault()
      
      const form = event.target as HTMLFormElement
      const submitContainer = document.getElementById('submit-container')
      
      if (submitContainer) {
        submitContainer.innerHTML = `
          <button type="submit" disabled class="
            inline-flex items-center justify-center font-semibold rounded-full
            relative overflow-hidden cursor-pointer select-none
            transition-all duration-200 transform-gpu text-shadow-sm 
            px-8 py-4 text-lg
            bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-800 text-white
            border-t border-indigo-400/50 border-b-2 border-indigo-900
            shadow-lg shadow-indigo-900/50 w-full
          " aria-label="Sending...">
            <span class="relative z-10 flex items-center gap-2 font-semibold text-white drop-shadow-lg">
              <span class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></span>
              Sending...
            </span>
            <div class="absolute inset-1 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
          </button>
        `
      }

      const formData = new FormData(form)
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        business: formData.get('business'),
        message: formData.get('message'),
        form_id: formData.get('form_id'),
        _cc: formData.get('_cc'),
        _subject: "🚀 New Lead from Lumenosis AI Website",
        _template: "table",
        _format: "html",
        _autoresponse: "Thank you for contacting Lumenosis AI! We'll get back to you within 24 hours to discuss how we can help automate your business processes and boost your efficiency.",
        _next: "https://lumenosis.com/thank-you"
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/martin@lumenosis.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        // Show success message
        if (submitContainer) {
          submitContainer.innerHTML = `
            <button type="button" disabled class="
              inline-flex items-center justify-center font-semibold rounded-full
              relative overflow-hidden cursor-pointer select-none
              transition-all duration-200 transform-gpu text-shadow-sm 
              px-8 py-4 text-lg
              bg-gradient-to-b from-green-500 via-green-600 to-green-800 text-white
              border-t border-green-400/50 border-b-2 border-green-900
              shadow-lg shadow-green-900/50 w-full
            " aria-label="Sent">
              <span class="relative z-10 flex items-center gap-2 font-semibold text-white drop-shadow-lg">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Message Sent!
              </span>
              <div class="absolute inset-1 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            </button>
          `
        }

        // Disable form fields
        Array.from(form.elements).forEach(input => {
          if ((input as HTMLElement).tagName !== 'BUTTON') {
            (input as HTMLInputElement).disabled = true
          }
        })

        // Reset after 5 seconds
        setTimeout(() => {
          if (submitContainer) {
            submitContainer.innerHTML = `
              <div class="relative block w-full md:mobile-normal mobile-subtle">
                <div class="absolute overflow-hidden rounded-full -inset-[1px] sm:-inset-[2px]">
                  <div class="absolute w-[300%] h-[40%] opacity-100 top-[-8px] left-[-250%] rounded-full animate-star-movement-top"
                    style="background: radial-gradient(circle at center, #8b5cf6 0%, #8b5cf688 15%, transparent 30%);
                           animation-duration: 3s;
                           filter: blur(0.5px) brightness(1.5) saturate(1.5);
                           box-shadow: 0 0 15px #8b5cf6, 0 0 30px #8b5cf666;">
                  </div>
                  <div class="absolute w-[300%] h-[40%] opacity-100 bottom-[-8px] right-[-250%] rounded-full animate-star-movement-bottom"
                    style="background: radial-gradient(circle at center, #8b5cf6 0%, #8b5cf688 15%, transparent 30%);
                           animation-duration: 3s;
                           filter: blur(0.5px) brightness(1.5) saturate(1.5);
                           box-shadow: 0 0 15px #8b5cf6, 0 0 30px #8b5cf666;">
                  </div>
                </div>
                <div class="relative z-10">
                  <button type="submit" class="w-full block" style="all: unset; width: 100%; display: block;">
                    <div class="
                      inline-flex items-center justify-center font-semibold rounded-full
                      relative overflow-hidden cursor-pointer select-none
                      transition-all duration-200 transform-gpu text-shadow-sm 
                      px-8 py-4 text-lg w-full
                      bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-800 text-white
                      border-t border-indigo-400/50 border-b-2 border-indigo-900
                      shadow-lg shadow-indigo-900/50 hover:brightness-110 hover:translate-y-[-2px]
                      active:brightness-95 active:translate-y-[1px] active:shadow-md
                    " aria-label="Send message">
                      <span class="relative z-10 font-semibold text-white drop-shadow-lg">
                        Send Message
                      </span>
                      <div class="absolute inset-1 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                    </div>
                  </button>
                </div>
              </div>
            `
          }
          
          Array.from(form.elements).forEach(input => {
            if ((input as HTMLElement).tagName !== 'BUTTON') {
              (input as HTMLInputElement).disabled = false
            }
          })
          
          form.reset()
        }, 5000)

      } catch (error) {
        console.error('Error submitting form:', error)
        
        if (submitContainer) {
          submitContainer.innerHTML = `
            <div class="relative block w-full md:mobile-normal mobile-subtle">
              <div class="absolute overflow-hidden rounded-full -inset-[1px] sm:-inset-[2px]">
                <div class="absolute w-[300%] h-[40%] opacity-80 top-[-8px] left-[-250%] rounded-full animate-star-movement-top"
                  style="background: radial-gradient(circle at center, #8b5cf6 0%, #8b5cf688 10%, transparent 25%);
                         animation-duration: 3s;
                         filter: blur(1px) brightness(1.3) saturate(1.3);
                         box-shadow: 0 0 10px #8b5cf6;">
                </div>
                <div class="absolute w-[300%] h-[40%] opacity-80 bottom-[-8px] right-[-250%] rounded-full animate-star-movement-bottom"
                  style="background: radial-gradient(circle at center, #8b5cf6 0%, #8b5cf688 10%, transparent 25%);
                         animation-duration: 3s;
                         filter: blur(1px) brightness(1.3) saturate(1.3);
                         box-shadow: 0 0 10px #8b5cf6;">
                </div>
              </div>
              <div class="relative z-10">
                <button type="submit" class="w-full block" style="all: unset; width: 100%; display: block;">
                  <div class="
                    inline-flex items-center justify-center font-semibold rounded-full
                    relative overflow-hidden cursor-pointer select-none
                    transition-all duration-200 transform-gpu text-shadow-sm 
                    px-8 py-4 text-lg w-full
                    bg-gradient-to-b from-red-500 via-red-600 to-red-800 text-white
                    border-t border-red-400/50 border-b-2 border-red-900
                    shadow-lg shadow-red-900/50 hover:brightness-110 hover:translate-y-[-2px]
                    active:brightness-95 active:translate-y-[1px] active:shadow-md
                  " aria-label="Try again">
                    <span class="relative z-10 font-semibold text-white drop-shadow-lg">
                      Try Again
                    </span>
                    <div class="absolute inset-1 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                  </div>
                </button>
              </div>
            </div>
          `
        }
      }
    }

    contactForm?.addEventListener('submit', handleContactFormSubmit)

    // Cleanup function
    return () => {
      // Clean up AOS observer
      aosObserver.disconnect()
      
      faqToggles.forEach(toggle => {
        toggle.removeEventListener('click', () => {})
      })
      contactForm?.removeEventListener('submit', handleContactFormSubmit)
      
      // Cleanup scroll animation observer
      const scrollObserver = (window as any).scrollAnimationObserver
      if (scrollObserver) {
        scrollObserver.disconnect()
      }
    }
  }, [])


  return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Fixed Aurora Effect that follows scroll - stays behind all content */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <Aurora 
            colorStops={["#6366f1", "#8b5cf6", "#ec4899"]}
            blend={0.8}
            amplitude={2.0}
            speed={0.5}
            className="w-full h-full opacity-60"
          />
        </div>
        
        {/* Mobile tint overlay for better readability */}
        <div className="mobile-tint-overlay md:hidden" />
        
        {/* Aurora Effect handled in ReactBitsHeroSection - removed duplicate for performance */}
        
        {/* Subtle background gradients layer */}
        <div className="absolute inset-0 pointer-events-none z-[1]"
             style={{
               background: `
                 radial-gradient(ellipse 80% 50% at 20% 40%, #6366f108 0%, transparent 50%),
                 radial-gradient(ellipse 80% 50% at 80% 50%, #8b5cf608 0%, transparent 50%),
                 radial-gradient(ellipse 80% 50% at 40% 80%, #ec489908 0%, transparent 50%)
               `
             }} />
      {/* Clean Professional Background */}
      
      {/* AOS Styles */}
      <style jsx global>{`
        [data-aos] {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        [data-aos].aos-animate {
          opacity: 1;
          transform: translateY(0);
        }
        [data-aos="fade-up"] {
          transform: translateY(50px);
        }
        [data-aos="fade-down"] {
          transform: translateY(-50px);
        }
        [data-aos="fade-left"] {
          transform: translateX(50px);
        }
        [data-aos="fade-right"] {
          transform: translateX(-50px);
        }
        [data-aos="zoom-in"] {
          transform: scale(0.8);
        }
        [data-aos="zoom-in"].aos-animate {
          transform: scale(1);
        }
        [data-aos][data-aos-delay="100"] {
          transition-delay: 0.1s;
        }
        [data-aos][data-aos-delay="200"] {
          transition-delay: 0.2s;
        }
        [data-aos][data-aos-delay="300"] {
          transition-delay: 0.3s;
        }
        [data-aos][data-aos-delay="400"] {
          transition-delay: 0.4s;
        }
      `}</style>
      {/* Navigation */}
      <nav className="fixed w-full z-[200] flex justify-center px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center space-x-4 sm:space-x-8 flex-wrap
                     shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]
                     border border-white/10 relative overflow-hidden">
          {/* 3D gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-full" />
          <div className="flex-shrink-0 flex items-center">
            <EnhancedLogo />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex space-x-6">
              <a href="#overview" className="text-white hover:text-white px-2 py-1 rounded-md text-sm font-medium transition-colors">Overview</a>
              <a href="#solutions" className="text-white hover:text-white px-2 py-1 rounded-md text-sm font-medium transition-colors">Solutions</a>
              <a href="#demos" className="text-white hover:text-white px-2 py-1 rounded-md text-sm font-medium transition-colors">Demos</a>
              <a href="#about" className="text-white hover:text-white px-2 py-1 rounded-md text-sm font-medium transition-colors">About</a>
              <Link href="/lead-magnet" className="text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded-md text-sm font-medium transition-colors">Resources</Link>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <StarBorderOutline color="#6366f1" speed="4s">
              <ReactBits3DButton 
                href="https://calendly.com/lumenosis/30min" 
                target="_blank" 
                rel="noopener"
                variant="primary"
                size="md"
              >
              Book a Demo
              </ReactBits3DButton>
            </StarBorderOutline>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700/50 transition-colors"
              suppressHydrationWarning
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
        </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 -mt-[1px]" suppressHydrationWarning>
            <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl px-4 py-3 
                         shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]
                         border border-white/10 relative overflow-hidden">
              {/* 3D gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-3xl" />
              <div className="flex flex-col space-y-2 relative z-10">
                <a href="#overview" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" onClick={toggleMobileMenu}>Overview</a>
                <a href="#solutions" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" onClick={toggleMobileMenu}>Solutions</a>
                <a href="#demos" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" onClick={toggleMobileMenu}>Demos</a>
                <a href="#about" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" onClick={toggleMobileMenu}>About</a>
                <a href="#contact" className="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" onClick={toggleMobileMenu}>Contact</a>
                <Link href="/lead-magnet" className="text-indigo-400 hover:text-indigo-300 px-3 py-2 rounded-md text-sm font-medium transition-colors" onClick={toggleMobileMenu}>Resources</Link>
                <div className="w-full mt-4">
                  <StarBorderOutline color="#8b5cf6" speed="3s" className="w-full block p-0">
                    <ReactBits3DButton 
                      href="https://calendly.com/lumenosis/30min" 
                      target="_blank" 
                      rel="noopener"
                      variant="primary"
                      size="lg"
                      className="w-full !block !rounded-full"
                    >
                    Book a Demo
                    </ReactBits3DButton>
                  </StarBorderOutline>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <ReactBitsHeroSection />

      {/* AIDA Framework Overview - Real Estate Focus */}
      <section id="overview" className="pt-24 py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* ATTENTION - Grab their focus */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Stop Losing <span className="gradient-text">$50,000+ in Commissions</span> to Faster Agents
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              At <strong>Lumenosis AI</strong>, we help real estate professionals respond to leads in 60 seconds, book 3X more showings, and never miss a deal again.
            </p>
          </div>

          <div className="space-y-4">
            {/* INTEREST - AI Agents for Real Estate */}
            <a href="#solutions" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      AI Agents for Real Estate
                    </h2>
                    <p className="text-white/80 text-lg">
                      AI agents that respond to leads instantly, qualify buyers automatically, and book showings 24/7 - so you never lose another deal to competitors who respond faster.
                    </p>
                  </div>
                  <div className="ml-6 text-indigo-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* DESIRE - See it working */}
            <a href="#demos" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                      Live Demo Videos
                    </h2>
                    <p className="text-white/80 text-lg">
                      Watch real AI agents qualify leads via SMS, generate property videos in 3 minutes, and book appointments automatically - see exactly how it works for your business.
                    </p>
                  </div>
                  <div className="ml-6 text-green-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Free Resources */}
            <a href="/lead-magnet" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      Blog & Free Resources
                    </h2>
                    <p className="text-white/80 text-lg">
                      Get 2000+ free automation workflows, real estate lead templates, AI agent setup guides, and step-by-step tutorials to start automating your business today.
                    </p>
                  </div>
                  <div className="ml-6 text-purple-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* Case Studies */}
            <a href="#cases" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Real Results & Case Studies
                    </h2>
                    <p className="text-white/80 text-lg">
                      See how agents went from 3 to 12 deals in 90 days, brokerages increased conversions by 48%, and teams booked 212% more weekend showings with our AI agents.
                    </p>
                  </div>
                  <div className="ml-6 text-blue-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* ACTION - Book now */}
            <a href="#contact" className="group block">
              <div className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 relative overflow-hidden">
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-orange-500/10 animate-pulse" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors flex items-center gap-2">
                      Book Your Free Strategy Call
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-orange-500/20 text-orange-300 rounded-full">
                        Limited Slots
                      </span>
                    </h2>
                    <p className="text-white/80 text-lg">
                      Schedule a 30-minute call to see exactly how AI agents can help you close more deals. We'll analyze your current process and show you where you're losing money.
                    </p>
                  </div>
                  <div className="ml-6 text-orange-400 group-hover:translate-x-2 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* CTA at bottom */}
          <div className="text-center mt-12">
            <a 
              href="#contact" 
              className="inline-block text-indigo-400 hover:text-indigo-300 text-lg font-medium transition-colors hover:underline"
            >
              More results from lumenosis.com »
            </a>
          </div>
        </div>
      </section>

      {/* AI Demo Section - Real Estate Lead Qualification */}
      <RealEstateAIDemo />

      
      {/* Services Section */}
      <section id="solutions" className="pt-16 py-12 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              While Your Competition Sleeps, <span className="gradient-text">We're Closing Your Deals</span>
            </h2>
            <p className="mt-2 max-w-3xl mx-auto text-white opacity-100">
              Lead management, client communication, scheduling, follow-ups, pipeline tracking, and operational workflows - all powered by intelligent AI
            </p>
          </div>
          
          <ReactBitsServiceCards />
        </div>
      </section>

          {/* Stop Losing Leads to Fast Agents Section - Service Card Styling */}
          <section id="industries" className="pt-16 py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Stop Losing Deals to <span className="gradient-text">Faster Competition</span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-white">
              Businesses who respond within 60 seconds, book more appointments, and close more deals
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2">
                {/* Real Estate - Service Card Style */}
                <motion.div
                  className="cursor-pointer h-full"
                  data-aos="fade-up"
                  data-aos-delay="0"
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    rotateX: 2,
                    rotateY: 2
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="glass-effect card-depth rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 border border-white/10 hover:border-indigo-500/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Card header with enhanced icon */}
                    <div className="flex items-center space-x-4 relative z-10">
                      <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-indigo-500 text-white transition-all duration-300 group-hover:bg-indigo-400 group-hover:scale-105 shadow-lg shadow-indigo-500/30">
                  <i className="fas fa-home text-xl"></i>
                </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-indigo-100 transition-colors duration-300">
                        Real Estate Pros
                      </h3>
                </div>
                    
                    {/* Original Content */}
                    <div className="mt-6 space-y-4 relative z-10 flex-grow">
                      <p className="text-white">
                Every minute you wait costs you $500-2,000 in commissions. While you're sleeping or with clients, competitors with AI are booking YOUR leads in 60 seconds.
              </p>
                      <p className="text-white">
                        <strong className="text-white">We turn your lead handling into a 24/7 sales engine that responds, qualifies, and books showings automatically.</strong>
              </p>
                      
                      <div className="grid gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-indigo-400 text-xs"></i>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-white">Respond to leads in 60 seconds before competitors wake up</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-indigo-400 text-xs"></i>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-white">Book 300% more showings without hiring extra staff</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-indigo-400 text-xs"></i>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-white">Never miss a follow-up that could close your next deal</p>
                </div>
              </div>
            </div>
            
                    {/* Book a Demo Button */}
                    <div className="mt-6 relative z-10">
                      <StarBorderOutline color="#8b5cf6" speed="3s" className="w-full">
                        <ReactBits3DButton
                          href="https://calendly.com/lumenosis/30min"
                          target="_blank"
                          rel="noopener"
                          variant="primary"
                          size="md"
                          className="w-full"
                        >
                          <i className="fas fa-calendar mr-2"></i>
                          Book a Demo
                        </ReactBits3DButton>
                      </StarBorderOutline>
                </div>
                </div>
                </motion.div>
                
                {/* Home Services - Service Card Style */}
                <motion.div
                  className="cursor-pointer h-full"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    rotateX: 2,
                    rotateY: -2
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="glass-effect card-depth rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 border border-white/10 hover:border-green-500/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Card header with enhanced icon */}
                    <div className="flex items-center space-x-4 relative z-10">
                      <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-green-500 text-white transition-all duration-300 group-hover:bg-green-400 group-hover:scale-105 shadow-lg shadow-green-500/30">
                        <i className="fas fa-tools text-xl"></i>
              </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-green-100 transition-colors duration-300">
                        Home Service Pros
                      </h3>
                    </div>
                    
                    {/* Original Content */}
                    <div className="mt-6 space-y-4 relative z-10 flex-grow">
                      <p className="text-white">
                While you're on the job, leads are calling and competitors are quoting. Every missed opportunity is money left on the table.
              </p>
                      <p className="text-white">
                        <strong className="text-white">We automate your entire sales process from first call to signed contract, so you focus on what you do best.</strong>
              </p>
                      
                      <div className="grid gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-green-400 text-xs"></i>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-white">Qualify leads and book estimates while you're working</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-green-400 text-xs"></i>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-white">Send follow-ups and reminders automatically</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-green-400 text-xs"></i>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-white">Convert more leads to paying customers</p>
                </div>
              </div>
            </div>

                    {/* Book a Demo Button */}
                    <div className="mt-6 relative z-10">
                      <StarBorderOutline color="#8b5cf6" speed="3s" className="w-full">
                        <ReactBits3DButton
                          href="https://calendly.com/lumenosis/30min"
                          target="_blank"
                          rel="noopener"
                          variant="primary"
                          size="md"
                          className="w-full"
                        >
                          <i className="fas fa-calendar mr-2"></i>
                          Book a Demo
                        </ReactBits3DButton>
                      </StarBorderOutline>
          </div>
              </div>
                </motion.div>
            </div>
              </div>
          </section>

      {/* Enhanced Process Timeline Section */}
      <section className="relative pt-24 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" data-aos="fade-up">
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-purple-300 text-sm font-medium">How it works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
              Getting started is simple
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto font-normal">
              A simple, three step process to make your life easier.
            </p>
          </div>
          
          <AnimatedProcessTimeline 
            steps={[
              {
                number: "1",
                title: "Discovery & Strategy",
                description: "We'll identify your business goals, analyze communication challenges, and find inefficiencies to wireframe a tailored solution for your needs",
                color: "indigo"
              },
              {
                number: "2", 
                title: "Creation & Launch",
                description: "We'll develop, test and integrate a custom AI Agent that seamlessly integrates with your existing systems and workflows",
                color: "green"
              },
              {
                number: "3",
                title: "Optimize", 
                description: "We'll monitor, adjust and optimize your AI Agent based on real-world data, ensuring consistent performance and outstanding results for your business",
                color: "purple"
              }
            ]}
            className="mt-12"
          />
        </div>
      </section>

      {/* Combined About Section - Who We Are + Real Estate Focus */}
      <section id="about" className="pt-24 py-16 px-4 sm:px-6 lg:px-8" data-aos="zoom-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl mb-4">
              Who We <span className="gradient-text">Are</span>
            </h2>
            <p className="mt-3 text-xl font-semibold text-white">
              Your 24/7 Closing Partner
            </p>
            <p className="text-xl text-white max-w-3xl mx-auto mt-4">
              While your competition sleeps, you're <span className="text-indigo-400 font-semibold">capturing leads</span>, <span className="text-green-400 font-semibold">booking appointments</span>, and closing deals. Real estate and home service professionals trust us to turn every lead into revenue automatically.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 items-stretch">
            {/* MLS/CRM Integrations - React Bits 3D */}
            <motion.div 
              className="text-center cursor-pointer h-full"
              data-aos="fade-up" 
              data-aos-delay="100"
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                z: 50
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="glass-effect card-depth rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-indigo-500/30 to-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fas fa-link text-indigo-400 text-3xl"></i>
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-4">MLS/CRM Integrations</h3>
                  <p className="text-white flex-grow text-base"><span className="text-indigo-400 font-semibold">Seamless integration</span> with all major platforms including <span className="text-white font-medium">MLS, RMLS, CRMLS, Follow Up Boss, Real Geeks, BoomTown, HubSpot, Pipedrive, LionDesk, Wise Agent, Salesforce, Freshsales, Realvolve, GHL, ServiceTitan, Jobber, Housecall Pro, and more</span>.</p>
              </div>
              </div>
            </motion.div>
            
            {/* Market Language AI - React Bits 3D */}
            <motion.div 
              className="text-center cursor-pointer h-full"
              data-aos="fade-up" 
              data-aos-delay="200"
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: -5,
                z: 50
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="glass-effect card-depth rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group hover:shadow-2xl hover:shadow-green-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fas fa-comments text-green-400 text-3xl"></i>
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-4">AI That Speaks Your Market</h3>
                  <p className="text-white flex-grow text-base">Our AI understands <span className="text-green-400 font-semibold">real estate terminology</span>, <span className="text-green-400 font-semibold">market conditions</span>, and speaks the language your <span className="text-white font-medium">clients expect from professionals</span>.</p>
              </div>
              </div>
            </motion.div>
            
            {/* Proven Results - React Bits 3D */}
            <motion.div 
              className="text-center cursor-pointer h-full"
              data-aos="fade-up" 
              data-aos-delay="300"
              whileHover={{ 
                scale: 1.05,
                rotateX: -5,
                rotateY: 5,
                z: 50
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="glass-effect card-depth rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fas fa-chart-bar text-purple-400 text-3xl"></i>
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Proven Increase in Results</h3>
                  <p className="text-white flex-grow text-base"><span className="text-white font-medium">Real estate agents</span> using our system report <span className="animated-number text-purple-400 font-semibold" data-target="3">3</span><span className="text-purple-400 font-semibold">x more bookings</span> and <span className="animated-number text-purple-400 font-semibold" data-target="35">35</span><span className="text-purple-400 font-semibold">% increase in deals closed</span> within the <span className="text-white font-medium">first month</span>.</p>
              </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-8">
            <StarBorderOutline color="#6366f1" speed="4s">
              <ReactBits3DButton 
                href="#contact"
                variant="gradient"
                size="lg"
              >
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </ReactBits3DButton>
            </StarBorderOutline>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="pt-16 py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Real Results from <span className="gradient-text">Real Estate Professionals</span>
            </h2>
            <p className="mt-2 text-white">Case studies with exact metrics - not just testimonials</p>
          </div>
          
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Transactions Card - React Bits 3D Style */}
              <motion.div 
                className="glass-effect card-depth rounded-2xl p-8 text-center relative overflow-hidden cursor-pointer group"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  z: 50
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20 
                }}
                data-aos="fade-up" 
                data-aos-delay="100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-indigo-500/30 to-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)'
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fas fa-home text-indigo-400 text-3xl"></i>
                  </motion.div>
                  <motion.div 
                    className="text-5xl font-semibold text-blue-400 mb-4 animated-number" 
                    data-target="9"
                    whileHover={{ scale: 1.03 }}
                  >
                    +9
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3">Transactions in 90 Days</h3>
                  <p className="text-white text-sm mb-2">Solo agent case study</p>
                  <p className="text-white text-xs italic">"Went from 3 to 12 deals in one quarter using Lumenosis AI"</p>
              </div>
              </motion.div>
              
              {/* Brokerage Conversions Card - React Bits 3D Style */}
              <motion.div 
                className="glass-effect card-depth rounded-2xl p-8 text-center relative overflow-hidden cursor-pointer group"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: -5,
                  z: 50
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20 
                }}
                data-aos="fade-up" 
                data-aos-delay="200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/20"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)'
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fas fa-building text-green-400 text-3xl"></i>
                  </motion.div>
                  <motion.div 
                    className="text-5xl font-semibold text-green-400 mb-4 animated-number" 
                    data-target="48"
                    whileHover={{ scale: 1.03 }}
                  >
                    48%
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3">Increase in Brokerage Conversions</h3>
                  <p className="text-white text-sm mb-2">Brokerage case study</p>
                  <p className="text-white text-xs italic">"40-agent office saw conversion rates jump from 12% to 18%"</p>
                </div>
              </motion.div>
              
              {/* Weekend Showings Card - React Bits 3D Style */}
              <motion.div 
                className="glass-effect card-depth rounded-2xl p-8 text-center relative overflow-hidden cursor-pointer group"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: -5,
                  rotateY: 5,
                  z: 50
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20 
                }}
                data-aos="fade-up" 
                data-aos-delay="300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)'
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fas fa-users text-purple-400 text-3xl"></i>
                  </motion.div>
                  <motion.div 
                    className="text-5xl font-semibold text-orange-400 mb-4 animated-number" 
                    data-target="212"
                    whileHover={{ scale: 1.03 }}
                  >
                    212%
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3">More Weekend Showings</h3>
                  <p className="text-white text-sm mb-2">Team case study</p>
                  <p className="text-white text-xs italic">"6-agent team went from 8 to 25 weekend showings monthly"</p>
                </div>
              </motion.div>
              </div>
            </div>
          </div>
      </section>

      {/* Enhanced Testimonials Carousel */}
      <section className="relative pt-16 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-normal text-white mb-4">
              Join 50+ Real Estate & Home Service Pros Who <span className="gradient-text">300% Their Bookings</span>
            </h2>
            <p className="text-xl text-white">Real feedback from real estate professionals who transformed their business</p>
          </div>
          
          <EnhancedTestimonialsCarousel 
            testimonials={[
              {
                id: 1,
                name: "Real Estate Professional",
                role: "Senior Agent",
                company: "Leading Brokerage",
                content: "Lumenosis AI completely transformed my business. I went from losing weekend leads to booking <strong>300% more showings</strong>. The <strong>60-second response time</strong> gives me a massive competitive advantage.",
                rating: 5
              },
              {
                id: 2,
                name: "Brokerage Owner", 
                role: "Managing Broker",
                company: "Multi-Agent Office",
                content: "Our 40-agent office saw conversion rates jump from <strong>12% to 18% in just 90 days</strong>. The <strong>ROI was immediate</strong> and the system integrates perfectly with our existing workflow.",
                rating: 5
              },
              {
                id: 3,
                name: "Home Services Manager",
                role: "Operations Director",
                company: "HVAC Company", 
                content: "We're booking <strong>212% more weekend appointments</strong> since implementing Lumenosis. Our competitors are still manually responding hours later while our AI books qualified leads <strong>in under 60 seconds</strong>.",
                rating: 5
              },
              {
                id: 4,
                name: "Team Leader",
                role: "Real Estate Team Lead", 
                company: "Top Production Team",
                content: "From <strong>3 to 12 deals in one quarter</strong> - that's the Lumenosis difference. The AI doesn't just respond fast, it qualifies leads better than most humans and books appointments <strong>24/7</strong>.",
                rating: 5
              }
            ]}
            autoPlay={true}
            interval={6000}
            className="mt-8"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="pt-16 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Your <span className="gradient-text">Questions Answered</span>
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-white">
              Remove doubts about pricing, setup, and results. Get clear answers before booking your strategy call.
            </p>
          </div>
          
          <div className="mt-6 space-y-3">
            {faqItems.map((faq) => {
              const isOpen = openFAQs.includes(faq.id)
              return (
                <div key={faq.id} className="card-gradient card-ambient ambient-indigo rounded-xl overflow-hidden" data-aos="fade-up" data-aos-delay={`${faq.id * 100}`}>
                  <div className={`${isOpen ? '' : 'hover:bg-white/5'} transition-colors`}>
                  <button 
                      className="w-full px-5 py-4 flex items-center justify-between focus:outline-none transition-colors"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                  >
                      <span className="text-left text-base font-medium text-white pr-4">{faq.question}</span>
                    <svg 
                        className={`w-6 h-6 flex-shrink-0 text-indigo-400 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="px-5 pb-4">
                        <p className="text-white text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </section>




      {/* Contact Section */}
      <section id="contact" className="pt-16 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8" id="calendly-section">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ready to Stop Losing Deals to <span className="gradient-text">Faster Competitors?</span>
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-white">
              Schedule your discovery call and see exactly how many more deals you could be closing.
            </p>
          </div>

          {/* Calendly inline widget begin */}
          <div className="w-full mx-auto mt-8 px-1 sm:px-4">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="bg-gray-900/50 rounded-2xl overflow-hidden shadow-inner">
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/lumenosis/30min?hide_landing_page_details=1&hide_gdpr_banner=1&embed_domain=lumenosis.com&embed_type=Inline&hide_event_type_details=0&text_color=%23ffffff&primary_color=%236366f1" 
                  style={{minWidth:'320px',height:'650px'}}
                ></div>
                
                {/* Bottom buttons integrated directly - no separation */}
                <div className="py-6 flex flex-col items-center space-y-3 text-center">
                  <a 
                    href="https://calendly.com/lumenosis/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-300 hover:text-indigo-200 hover:underline text-lg md:text-xl font-medium transition-colors cursor-pointer"
                  >
                    Can't see the booking form? Click here
                  </a>
                  <button 
                    onClick={() => {
                      const questionSection = document.getElementById('question-section');
                      if (questionSection) {
                        questionSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-white hover:text-gray-200 text-lg md:text-xl font-medium transition-colors cursor-pointer"
                  >
                    Can't find a time that works?
                  </button>
                </div>
              </div>
            </div>
          </div>
          <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          {/* Calendly inline widget end */}
          
          <div className="mt-12 max-w-2xl mx-auto" id="question-section">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl text-center mb-8">
              Still Have a <span className="gradient-text">Question</span>
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-white text-center mb-8">
              We would love to chat!
            </p>
            
            <div className="bg-gray-800/30 rounded-lg shadow-xl overflow-hidden mb-12" data-aos="fade-up">
              <div className="px-6 py-8 sm:p-10">
                <form className="space-y-6" id="contact-form" action="https://formspree.io/f/xdkowrek" method="POST">
                  <input type="hidden" name="_subject" value="🚀 New Lead from Lumenosis AI Website" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://lumenosis.com/thank-you" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="form_id" id="form_id" value="" />
                  <input type="hidden" name="_cc" value="ofunrein123@gmail.com" />
                  <input type="hidden" name="_autoresponse" value="Thank you for contacting Lumenosis AI! We'll get back to you within 24 hours to discuss how we can help automate your business processes and boost your efficiency." />
                  <input type="hidden" name="_format" value="html" />
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                    <div className="mt-1">
                      <input type="text" id="name" name="name" required className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                    <div className="mt-1">
                      <input type="email" id="email" name="email" required className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-sm font-medium text-white">Business Type</label>
                    <div className="mt-1 relative">
                      <input 
                        type="text" 
                        id="business" 
                        name="business" 
                        list="business-options"
                        placeholder="Type to search business types..."
                        className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
                        autoComplete="off"
                      />
                      <datalist id="business-options">
                        <option value="">Select Your Business Type</option>
                        <option>🚀 Founder/Startup</option>
                        <option>📈 Agency</option>
                        <option>🧠 Coach/Educator</option>
                        <option>🛠️ Service Business</option>
                        <option>📊 E-commerce</option>
                        <option>🏢 B2B Company</option>
                        <option>💼 Consultant</option>
                        <option>🏠 Real Estate</option>
                        <option>❄️ HVAC Services</option>
                        <option>☀️ Solar Installation</option>
                        <option>🔧 Plumbing Services</option>
                        <option>⚡ Electrical Services</option>
                        <option>🏠 Roofing</option>
                        <option>🌿 Landscaping</option>
                        <option>🧹 Home Cleaning</option>
                        <option>🏡 Other Home Services</option>
                        <option>🎯 Marketing Agency</option>
                        <option>💻 SaaS Company</option>
                        <option>🏥 Healthcare</option>
                        <option>🎓 Education</option>
                        <option>🏦 Financial Services</option>
                        <option>🚗 Automotive</option>
                        <option>🍕 Restaurant/Food</option>
                        <option>💪 Fitness/Wellness</option>
                        <option>🎨 Creative Services</option>
                        <option>⚖️ Legal Services</option>
                        <option>🔐 Security Services</option>
                        <option>📞 Call Center/Support</option>
                        <option>📦 Manufacturing</option>
                        <option>🚚 Logistics/Shipping</option>
                        <option>🛍️ Retail</option>
                        <option>🏗️ Construction</option>
                        <option>🔄 Other</option>
                      </datalist>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white">How can we help?</label>
                    <div className="mt-1">
                      <textarea id="message" name="message" rows={4} required className="py-3 px-4 block w-full bg-gray-700/50 border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                  </div>
                  <div id="submit-container" className="w-full -mx-6 sm:mx-0">
                    <StarBorderOutline color="#8b5cf6" speed="3s" className="w-full block md:mobile-normal mobile-subtle">
                      <button type="submit" className="w-full block" style={{ all: 'unset', width: '100%', display: 'block' }}>
                        <ReactBits3DButton 
                          variant="primary"
                          size="lg"
                          className="w-full !block"
                        >
                          Send Message
                        </ReactBits3DButton>
                    </button>
                    </StarBorderOutline>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-start">
                    <StarBorderOutline color="#8b5cf6" speed="5s">
                      <ReactBits3DButton
                        href="mailto:martin@lumenosis.com"
                        variant="secondary"
                        size="md"
                        className="!rounded-full !w-16 !h-16 !p-0"
                      >
                        <i className="fas fa-envelope text-xl"></i>
                      </ReactBits3DButton>
                    </StarBorderOutline>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <a href="mailto:martin@lumenosis.com" className="mt-1 block text-white hover:text-indigo-400 transition-colors">martin@lumenosis.com</a>
                </div>
              </div>
              <div className="flex items-start">
                    <StarBorderOutline color="#6366f1" speed="5s">
                      <ReactBits3DButton
                        href="tel:+15125712595"
                        variant="secondary"
                        size="md"
                        className="!rounded-full !w-16 !h-16 !p-0"
                      >
                        <i className="fas fa-phone-alt text-xl"></i>
                      </ReactBits3DButton>
                    </StarBorderOutline>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <a href="tel:+15125712595" className="mt-1 block text-white hover:text-purple-400 transition-colors">(512) 571-2595</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demos" className="py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              See Our <span className="gradient-text">AI Automation</span> In Action
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-white">
              Real results from real clients using our AI automation systems
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Real Estate Video Automation Demo */}
            <div className="glass-effect card-depth rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 border border-white/10 hover:border-indigo-500/30 group" data-aos="fade-up" data-aos-delay="100">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden rounded-lg flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <i className="fas fa-play-circle text-white/60 text-6xl"></i>
                  </div>
                  <video 
                    className="w-full h-full object-cover demo-video relative z-20" 
                    controls 
                    preload="none"
                  >
                    <source src="/videos/demos/Real_Estate_Video_Demo_compressed.mp4" type="video/mp4" />
                    <p className="text-white text-center p-4">
                      Your browser doesn't support video playback. 
                      <a href="/videos/demos/Real_Estate_Video_Demo_compressed.mp4" className="text-indigo-400 hover:text-indigo-300">Download the video</a>
                    </p>
                  </video>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    <i className="fas fa-home text-indigo-400 mr-2"></i>
                    Cinematic Real Estate Videos in 3 Minutes
                  </h3>
                  <p className="text-white text-sm mb-4 leading-relaxed">
                    Watch how we transformed property images into a stunning cinematic video using AI automation with Make.com, ChatGPT, Runway, and ElevenLabs.
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Automated video generation from property images</span>
                    </div>
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>AI-generated professional voiceovers</span>
                    </div>
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Complete workflow automation</span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/90">
                      <i className="fas fa-clock mr-1"></i>
                      Under 3 minutes
                    </div>
                    <a href="#contact" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                      Get This Automation
                      <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Email Agent Demo */}
            <div className="glass-effect card-depth rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 border border-white/10 hover:border-emerald-500/30 group" data-aos="fade-up" data-aos-delay="200">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-emerald-500 to-green-600 relative overflow-hidden rounded-lg flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <i className="fas fa-play-circle text-white/60 text-6xl"></i>
                  </div>
                  <video 
                    className="w-full h-full object-cover demo-video relative z-20" 
                    controls 
                    preload="none"
                  >
                    <source src="/videos/demos/Automating_real_estate_agent_inquiries_AI_DEMO_compressed.mp4" type="video/mp4" />
                    <p className="text-white text-center p-4">
                      Your browser doesn't support video playback. 
                      <a href="/videos/demos/Automating_real_estate_agent_inquiries_AI_DEMO_compressed.mp4" className="text-emerald-400 hover:text-emerald-300">Download the video</a>
                    </p>
                  </video>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    <i className="fas fa-envelope text-emerald-400 mr-2"></i>
                    24/7 AI Email Assistant for Real Estate
                  </h3>
                  <p className="text-white text-sm mb-4 leading-relaxed">
                    Watch how our AI email agent handles property inquiries instantly, turning repetitive questions into qualified leads while you focus on closing deals.
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Instant response to property inquiries</span>
                    </div>
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Personalized, human-like replies</span>
                    </div>
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Saves $8,235+ annually per agent</span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/90">
                      <i className="fas fa-clock mr-1"></i>
                      24/7 availability
                    </div>
                    <a href="#contact" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                      Get Email AI
                      <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Voice Assistant Demo */}
            <div className="glass-effect card-depth rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 border border-white/10 hover:border-purple-500/30 group" data-aos="fade-up" data-aos-delay="300">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden rounded-lg flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <i className="fas fa-play-circle text-white/60 text-6xl"></i>
                  </div>
                  <video 
                    className="w-full h-full object-cover demo-video relative z-20" 
                    controls 
                    preload="none"
                  >
                    <source src="/videos/demos/ai_voice_demo_compressed.mp4" type="video/mp4" />
                    <p className="text-white text-center p-4">
                      Your browser doesn't support video playback. 
                      <a href="/videos/demos/ai_voice_demo_compressed.mp4" className="text-purple-400 hover:text-purple-300">Download the video</a>
                    </p>
                  </video>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    <i className="fas fa-headset text-purple-400 mr-2"></i>
                    24/7 AI Appointment Booking
                  </h3>
                  <p className="text-white text-sm mb-4 leading-relaxed">
                    Experience a live conversation with our AI voice assistant seamlessly booking a dental appointment with natural conversation flow.
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Natural conversation handling</span>
                    </div>
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Real-time appointment scheduling</span>
                    </div>
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Lead qualification & confirmation</span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/90">
                      <i className="fas fa-clock mr-1"></i>
                      Available 24/7
                    </div>
                    <a href="#contact" className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                      Get Voice AI
                      <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* SMS Lead Qualification Demo */}
            <div className="glass-effect card-depth rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 border border-white/10 hover:border-orange-500/30 group" data-aos="fade-up" data-aos-delay="400">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden rounded-lg flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <i className="fas fa-play-circle text-white/60 text-6xl"></i>
                  </div>
                  <video 
                    className="w-full h-full object-cover demo-video relative z-20" 
                    controls 
                    preload="none"
                  >
                    <source src="/videos/demos/Qualify_Real_Estate_Leads_SMS_Demo_compressed.mp4" type="video/mp4" />
                    <p className="text-white text-center p-4">
                      Your browser doesn't support video playback. 
                      <a href="/videos/demos/Qualify_Real_Estate_Leads_SMS_Demo_compressed.mp4" className="text-orange-400 hover:text-orange-300">Download the video</a>
                    </p>
                  </video>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    <i className="fas fa-sync-alt text-orange-400 mr-2"></i>
                    Complete Lead Lifecycle Automation
                  </h3>
                  <p className="text-white text-sm mb-4 leading-relaxed">
                    Watch the full lead journey: SMS + Voice AI agents that qualify leads, book showings, track progress, and send notifications - all automated from first contact to closed deal.
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>SMS + Voice AI agents work together</span>
                    </div>
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Auto-qualify leads & book showings</span>
                    </div>
                    <div className="flex items-start text-xs text-white">
                      <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5"></i>
                      <span>Track leads & send smart notifications</span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/90">
                      <i className="fas fa-clock mr-1"></i>
                      End-to-end automation
                    </div>
                    <a href="#contact" className="inline-flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                      Get Complete System
                      <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800/50 border border-gray-700/50">
              <i className="fas fa-lightbulb text-yellow-400 mr-3"></i>
              <span className="text-white text-sm">Want to see your business automated like this?</span>
              <StarBorderOutline color="#6366f1" speed="4s" className="ml-4">
                <ReactBits3DButton
                  href="#contact"
                  variant="primary"
                  size="md"
                  className=""
                >
                Book a Demo
                </ReactBits3DButton>
              </StarBorderOutline>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Center Logo */}
            <div className="flex items-center justify-center mb-6">
              <Image src="/lumenosis-logo.png" alt="Lumenosis AI - AI Automation Software for Real Estate and Home Services" width={48} height={48} className="h-12 w-auto" loading="lazy" />
            </div>
            
            {/* Horizontal Nav */}
            <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-8 mb-6">
              <a href="#solutions" className="text-white hover:text-white px-2 py-1 text-sm font-medium transition-colors">Solutions</a>
              <a href="#cases" className="text-white hover:text-white px-2 py-1 text-sm font-medium transition-colors">Cases</a>
              <a href="#about" className="text-white hover:text-white px-2 py-1 text-sm font-medium transition-colors">About</a>
              <a href="#contact" className="text-white hover:text-white px-2 py-1 text-sm font-medium transition-colors">Contact</a>
            </nav>
            
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mb-6">
              <a href="https://www.linkedin.com/in/martn-ai/" aria-label="LinkedIn" className="text-white hover:text-white transition-all hover:scale-110">
                <div className="h-8 w-8 rounded-full bg-gray-800/70 flex items-center justify-center">
                  <i className="fab fa-linkedin-in text-sm"></i>
                </div>
              </a>
              <a href="#" aria-label="X (Twitter)" className="text-white hover:text-white transition-all hover:scale-110">
                <div className="h-8 w-8 rounded-full bg-gray-800/70 flex items-center justify-center">
                  <i className="fab fa-x-twitter text-sm"></i>
                </div>
              </a>
              <a href="http://tiktok.com/martn.ai" aria-label="TikTok" className="text-white hover:text-white transition-all hover:scale-110" target="_blank" rel="noopener">
                <div className="h-8 w-8 rounded-full bg-gray-800/70 flex items-center justify-center">
                  <i className="fab fa-tiktok text-sm"></i>
                </div>
              </a>
              <a href="#" aria-label="Facebook" className="text-white hover:text-white transition-all hover:scale-110">
                <div className="h-8 w-8 rounded-full bg-gray-800/70 flex items-center justify-center">
                  <i className="fab fa-facebook-f text-sm"></i>
                </div>
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-white">
              &copy; 2023 Lumenosis AI. All rights reserved.
            </p>

          </div>
        </div>
      </footer>

      {/* Homepage-Only Widget Component */}
      <HomepageWidget />

    </div>
  )
}

