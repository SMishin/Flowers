(function () {

	let baseUrl = '/static',
		appUrl = baseUrl + '/app/cms'
		;

	SystemJS.config({
		baseURL: baseUrl,
		defaultExtension: 'js',
		paths: {
			// paths serve as alias
			'npm:': baseUrl + '/node_modules/'
		},
		packages: {
			app: {
				format: 'register',
				defaultExtension: 'js'
			},
			core: {
				format: 'register',
				defaultExtension: 'js'
			},
			common: {
				format: 'register',
				defaultExtension: 'js'
			},
			node_modules: {
				defaultExtension: 'js'
			}
		},
		map: {
			app: appUrl,
			core: baseUrl + '/app/core',
			common: baseUrl + '/app/common',
			text: baseUrl + '/node_modules/systemjs-plugin-text/text',
			"@angular": 'npm:@angular',
			"@angular/common": 'npm:@angular/common/bundles/common.umd',
			"@angular/core": 'npm:@angular/core/bundles/core.umd',
			"@angular/core/src": baseUrl + '/node_modules/@angular/core/src',
			"@angular/router": 'npm:@angular/router/bundles/router.umd',
			'@angular/http': 'npm:@angular/http/bundles/http.umd.js',
			"@angular/compiler": 'npm:@angular/compiler/bundles/compiler.umd',
			"@angular/platform-browser": 'npm:@angular/platform-browser/bundles/platform-browser.umd',
			"@angular/platform-browser-dynamic": 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd',
			"@angular/forms": 'npm:@angular/forms/bundles/forms.umd',
			"ng2-translate": 'npm:ng2-translate/bundles/ng2-translate.umd',
			'eventemitter3': 'npm:eventemitter3/index',
			"whatwg-fetch": 'npm:whatwg-fetch/fetch',
			"fastest-clone": 'npm:fastest-clone/index',
			rxjs: baseUrl + '/node_modules/rxjs',

		},
		meta: {
			'*.html': {
				loader: 'text'
			}
		}
	});

}());
