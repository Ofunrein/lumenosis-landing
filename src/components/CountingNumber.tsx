'use client'

import React, { useState, useEffect, useRef } from 'react'

interface CountingNumberProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export default function CountingNumber({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '', 
  className = '',
  decimals = 0 
}: CountingNumberProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
            animateCount()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  const animateCount = () => {
    const startTime = Date.now()
    const startValue = 0

    const updateCount = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (end - startValue) * easeOutQuart

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toString()
  }

  return (
    <span ref={elementRef} className={`counting-number ${className}`}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}
