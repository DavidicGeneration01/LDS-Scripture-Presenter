module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Cinzel', 'serif']
      },
      colors: {
        navy: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        app: {
          bg: '#0f0f0f',
          'bg-secondary': '#1a1a2e',
          'bg-tertiary': '#252541',
          'bg-hover': '#2d2d4a',
          'bg-active': '#3a3a5c',
          'accent-primary': '#0066cc',
          'accent-dark': '#0052a3',
          'accent-light': '#3399ff',
          'accent-bright': '#00d4ff',
          'text-primary': '#f5f5f5',
          'text-secondary': 'rgba(255, 255, 255, 0.6)',
          'text-tertiary': 'rgba(255, 255, 255, 0.4)',
          'border': 'rgba(255, 255, 255, 0.1)',
        }
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.3)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(0, 102, 204, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-out': 'fadeOut 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-up': 'fadeInUp 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-down': 'fadeInDown 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-left': 'fadeInLeft 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-right': 'fadeInRight 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-out': 'scaleOut 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-left': 'slideInLeft 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-out-left': 'slideOutLeft 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-right': 'slideInRight 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-out-right': 'slideOutRight 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'blur-in': 'blurIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'blur-out': 'blurOut 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'glow': 'glow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeOut: {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          'from': { opacity: '0', transform: 'translateX(20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          'from': { opacity: '1', transform: 'scale(1)' },
          'to': { opacity: '0', transform: 'scale(0.95)' },
        },
        slideInLeft: {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100%)' },
        },
        slideInRight: {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(100%)' },
        },
        blurIn: {
          'from': { opacity: '0', filter: 'blur(10px)' },
          'to': { opacity: '1', filter: 'blur(0)' },
        },
        blurOut: {
          'from': { opacity: '1', filter: 'blur(0)' },
          'to': { opacity: '0', filter: 'blur(10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 102, 204, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 102, 204, 0.4)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    }
  },
  plugins: []
}
