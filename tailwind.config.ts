/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

import plugin from 'tailwindcss/plugin';

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
	"./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
  	extend: {
  		colors: {
  			background: {
  				DEFAULT: '#F5F1E6'
  			},
  			pallete: {
  				red: '#800000',
  				orange: '#982B1C',
  				beige: '#DAD4B5',
  				cream: '#F3F2ED'
  			},
  			foreground: 'var(--foreground)',
  			'primary': '#7d1107',
  			'primary-container': '#9E2A1C',
  			'on-primary': '#ffffff',
  			'on-background': '#1c1b1b',
  			'on-surface': '#1c1b1b',
  			'surface': '#fcf9f8',
  			'surface-container-low': '#f6f3f2',
  			'surface-container': '#f0edec',
  			'surface-variant': '#e5e2e1',
  			'outline': '#8c716c',
  			'outline-variant': '#e0bfba',
  		},
  		fontFamily: {
  			montserrat: 'var(--font-motserrat)',
  			epilogue: ['Epilogue', 'sans-serif'],
  			body: ['"Be Vietnam Pro"', 'sans-serif'],
  		},
  		fontSize: {
  			'label-md': ['14px', { lineHeight: '1.0', fontWeight: '600' }],
  			'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
  			'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
  			'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
  			'headline-lg': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
  			'headline-xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '800' }],
  		},
  		borderRadius: {
  			DEFAULT: '0.125rem',
  			lg: '0.25rem',
  			xl: '0.5rem',
  			full: '0.75rem',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase, addComponents, addUtilities }: {
      addBase: any; 
      addComponents: any;
      addUtilities: any;
  }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-16 xl:max-w-[87.5rem]":
            {},
        },
        ".h1": {
          "@apply font-bold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem]  lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
            {},
        },
        ".h2": {
          "@apply text-[1.75rem] font-bold leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
            {},
        },
        ".h3": {
          "@apply text-[2rem] leading-normal md:text-[2.5rem] font-semibold": {},
        },
        ".h4": {
          "@apply text-[2rem] leading-normal font-semibold": {},
        },
        ".h5": {
          "@apply text-2xl leading-normal font-semibold": {},
        },
        ".h6": {
          "@apply font-semibold text-lg leading-8 font-semibold": {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
      });
    }),
  ],
};
export default config;
