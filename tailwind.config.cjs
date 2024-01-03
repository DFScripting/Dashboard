/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
		  	keyframes: {
				'shake' : {
                    '10%, 90%': {
                        transform: 'translate3d(-1px, 0, 0)'
                    },
                    '20%, 80%' : {
                        transform: 'translate3d(2px, 0, 0)'
                    },
                    '30%, 50%, 70%': {
                        transform: 'translate3d(-4px, 0, 0)'
                    },
                    '40%, 60%': {
                        transform: 'translate3d(4px, 0, 0)'
                    }
                },

				'fadeOut': {
				  '0%': { opacity: 1 },
				  '100%': { opacity: 0 },
				},

				'fadeIn': {
				  '0%': { opacity: 0 },
				  '100%': { opacity: 1 },
				},
		  	},

			animation:{
				'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
				'fadeOut': 'fadeOut 1s ease-in-out',
				'fadeIn': 'fadeIn 1s ease-in-out'
			},

			transitionProperty: {
				'rounded': 'rounded',
				'spacing': 'margin, padding',
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwind-scrollbar'),
		require('flowbite/plugin'),
		plugin(function({ addUtilities }) {
			addUtilities({
			  	'.scrollbar-hide': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none'
					}
			  	}	
			})
		})
	],
}