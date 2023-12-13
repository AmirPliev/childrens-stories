/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: { 100: '#1E002F', 200: '#1a1a1a', 300: '#440469' }
			},
			keyframes: {
				glowing: {
					'0%, 100%': { 'box-shadow': '0px 0px 42px 2px rgba(255,255,255,1)' },
					'50%': { 'box-shadow': '0px 0px 62px -13px rgba(255,255,255,1)' }
				}
			},
			animation: {
				glowing: 'glowing 3s linear infinite'
			}
		}
	},
	plugins: []
};
