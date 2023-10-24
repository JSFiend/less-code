/** @type {import('tailwindcss').Config} */
const primary = '#00C1CD';
export default {
	darkMode: 'class',
	important: '#body',
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		backgroundColor: (theme) => ({
			...theme('colors'),
			bg: '#050507',
			title: '#28282C',
			body: '#1A1A1B',
			footer: '#242427',
		}),
		textColor: (theme) => ({
			...theme('colors'),
			primary,
			'secondary': '#ffed4a',
			'danger': '#e3342f',
		}),
		borderColor: theme => ({
			...theme('colors'),
			primary,
			'secondary': '#ffed4a',
			'danger': '#e3342f',
		 })
	},
	variants: {
		extend: {
			rotate: ['group-hover'],
		},
	},
	plugins: [
		function ({ addVariant, e }) {
      addVariant('dark-important', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dark .${e(`dark-important${separator}${className}`)}!`;
        });
      });
    },
	],
	corePlugins: {
		// 关闭 tailwind 引入 preflight.css ，html 采取外联的方式引入，解决 preflight 和 element 样式的冲突
		preflight: false,
	},

}