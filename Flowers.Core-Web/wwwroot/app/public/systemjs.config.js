(function () {

	let baseUrl = '/'
		;

	SystemJS.config({
		baseURL: baseUrl,
		defaultExtension: 'js',
		meta: {
			'*.jsx': {
				defaultExtension: 'jsx',
			}
		},
		paths: {
			// paths serve as alias
			'npm:': baseUrl + '/node_modules/'
		},
		packages: {
			app: {
				format: 'register',
				defaultExtension: 'js'
			},
			node_modules: {
				defaultExtension: 'js'
			}
		},
		map: {
			"whatwg-fetch": 'npm:whatwg-fetch/fetch',
			"react": 'npm:react/dist/react',
			"react-dom": 'npm:react-dom/dist/react-dom',
			"react-router": 'npm:react-router/umd/ReactRouter',
			"blankshield": 'npm:blankshield/blankshield',
		}
	});

}());
