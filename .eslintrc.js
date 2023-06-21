module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true,
		'vue/setup-compiler-macros': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'parser': '@typescript-eslint/parser',
		'sourceType': 'module'
	},
	'plugins': [
		'vue',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'vue/html-self-closing': [
			'error',
			{
				'html': {
					'void': 'never',
					'normal': 'never',
					'component': 'never'
				},
				'svg': 'always',
				'math': 'always'
			},
		],
		'vue/multi-word-component-names': ['off'],
		'vue/no-multiple-template-root': ['off'],
	}
};
