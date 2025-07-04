/** @type {import('tailwindcss').Config} */
import tailwindForms from '@tailwindcss/forms';
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/**/*.{svelte,js,ts}',
		'./src/routes/**/*.svelte'
	],
	theme: {
		extend: {}
	},
	plugins: [tailwindForms]
};
