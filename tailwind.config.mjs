/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkmode: 'class',
	theme: {
		extend: {},
	},
	plugins: [],
	theme: {
		fontSize: {
		  sm: '0.8rem',
		  xs: '0.7rem',
		  base: '0.9rem',
		  xl: '1.25rem',
		  '2xl': '1.563rem',
		  '3xl': '1.953rem',
		  '4xl': '2.441rem',
		  '5xl': '3.052rem',
		},
	}
}
