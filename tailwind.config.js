/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors extracted from Smart Yatra reference site analysis
        background: "#F9FBFB", // Very light cool gray/off-white background
        foreground: "#374151", // Gray-700 for main text

        primary: {
          DEFAULT: "#16A286", // The specific Teal Green from the site
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E0F2F1", // Light teal background for secondary actions
          foreground: "#16A286", // Teal text on light background
        },

        // Standard UI Colors
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#374151",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#374151",
        },
        muted: {
          DEFAULT: "#F3F4F6", // Gray-100
          foreground: "#6B7280", // Gray-500
        },
        border: "#E5E7EB", // Gray-200
        input: "#E5E7EB",
        ring: "#16A286", // Primary Teal ring

        // Semantic Status Colors
        accent: {
          DEFAULT: "#0F766E", // Darker teal 
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444", // Red-500
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#10B981", // Emerald-500
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B", // Amber-500
          foreground: "#FFFFFF",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'], // Added Plus Jakarta Sans
      },
      borderRadius: {
        'xl': '12px', // Specific radius from analysis
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0,0,0,0.1)', // Subtle card shadow
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}
