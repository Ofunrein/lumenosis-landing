/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Extra small devices
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'aurora': 'aurora 8s ease-in-out infinite alternate',
        'particles': 'particles 12s linear infinite',
        'magnetic': 'magnetic 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translateX(0%) translateY(0%) scale(1)' },
          '25%': { transform: 'translateX(5%) translateY(-10%) scale(1.05)' },
          '50%': { transform: 'translateX(-5%) translateY(5%) scale(0.95)' },
          '75%': { transform: 'translateX(10%) translateY(-5%) scale(1.02)' },
        },
        particles: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) rotate(120deg)' },
          '66%': { transform: 'translateY(30px) rotate(240deg)' },
          '100%': { transform: 'translateY(0px) rotate(360deg)' },
        },
        magnetic: {
          '0%': { transform: 'translate(0px, 0px)' },
          '100%': { transform: 'var(--magnetic-transform)' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
    },
  },
  safelist: [
    // React Bits component classes
    'rb-magnetic-button',
    'rb-animated-bg',
    'rb-aurora',
    'rb-particles',
    'rb-gradient-bg',
    // Animation classes
    'animate-aurora',
    'animate-particles',
    'animate-magnetic',
    // Backdrop blur classes for enhanced effects
    'backdrop-blur-sm',
    'backdrop-blur-md',
    'backdrop-blur-lg',
    // Dynamic color classes for service cards - explicit classes
    'bg-indigo-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-pink-500', 'bg-red-500', 'bg-cyan-500', 'bg-orange-500',
    'group-hover:bg-indigo-400', 'group-hover:bg-purple-400', 'group-hover:bg-green-400', 'group-hover:bg-yellow-400', 'group-hover:bg-blue-400', 'group-hover:bg-pink-400', 'group-hover:bg-red-400', 'group-hover:bg-cyan-400', 'group-hover:bg-orange-400',
    'group-hover:text-indigo-100', 'group-hover:text-purple-100', 'group-hover:text-green-100', 'group-hover:text-yellow-100', 'group-hover:text-blue-100', 'group-hover:text-pink-100', 'group-hover:text-red-100', 'group-hover:text-cyan-100', 'group-hover:text-orange-100',
    'hover:border-indigo-500/30', 'hover:border-purple-500/30', 'hover:border-green-500/30', 'hover:border-yellow-500/30', 'hover:border-blue-500/30', 'hover:border-pink-500/30', 'hover:border-red-500/30', 'hover:border-cyan-500/30', 'hover:border-orange-500/30',
    'bg-gradient-to-br', 'from-indigo-500/10', 'from-purple-500/10', 'from-green-500/10', 'from-yellow-500/10', 'from-blue-500/10', 'from-pink-500/10', 'from-red-500/10', 'from-cyan-500/10', 'from-orange-500/10',
    'to-indigo-600/10', 'to-purple-600/10', 'to-green-600/10', 'to-yellow-600/10', 'to-blue-600/10', 'to-pink-600/10', 'to-red-600/10', 'to-cyan-600/10', 'to-orange-600/10',
    'bg-gradient-to-r', 'from-indigo-500', 'from-purple-500', 'from-green-500', 'from-yellow-500', 'from-blue-500', 'from-pink-500', 'from-red-500', 'from-cyan-500', 'from-orange-500',
    'to-indigo-400', 'to-purple-400', 'to-green-400', 'to-yellow-400', 'to-blue-400', 'to-pink-400', 'to-red-400', 'to-cyan-400', 'to-orange-400',
    'shadow-lg', 'shadow-indigo-500/30', 'shadow-purple-500/30', 'shadow-green-500/30', 'shadow-yellow-500/30', 'shadow-blue-500/30', 'shadow-pink-500/30', 'shadow-red-500/30', 'shadow-cyan-500/30', 'shadow-orange-500/30',
    'text-indigo-400', 'text-purple-400', 'text-green-400', 'text-yellow-400', 'text-blue-400', 'text-pink-400', 'text-red-400', 'text-cyan-400', 'text-orange-400',
    'ambient-indigo', 'ambient-purple', 'ambient-green', 'ambient-yellow', 'ambient-blue', 'ambient-pink', 'ambient-red', 'ambient-cyan', 'ambient-orange',
  ],
  plugins: [],
}
