'use strict';

let fs = require("fs"),
	babel = require("babel-core"),
	path = require('path')
	;

let babelOps = require('../../package.json').babel;
babelOps.presets[0] = 'es2016';

if (babelOps.plugins.indexOf('transform-es2015-modules-systemjs') === -1) {
	babelOps.plugins.push('transform-es2015-modules-systemjs');
}

module.exports = function (callback, filePath) {

	function needTransform(filename) {

		if (filename.indexOf('\\systemjs.config.js') !== -1) {
			return false;
		}

		return filename.indexOf('\\app') !== -1;

	}

	console.log(filePath);

	fs.readFile(filePath, "utf-8", function (err, file) {
		if (err) {
			callback(err);
			return;
		}

		var code = file;

		if (needTransform(filePath)) {
			//babelOps.sourceMaps = true;
			code = babel.transform(file, babelOps).code;
		}

		callback(null, code);

		// res.writeHead(200,
		//     {
		//         'Content-Type': 'application/javascript'
		//     });
		// res.write(code, "utf-8");
		// res.end();
	});

};
