'use strict';

const fs = require("fs"),
	sass = require('node-sass'),
	autoprefixer = require('autoprefixer'),
	postcss = require('postcss')
;

module.exports = function (callback, filePath) {

	fs.readFile(filePath, "binary", function (err, file) {

		if (!err) {
			callback(null, file);
			return;
		}

		filePath = filePath.replace('.css', '.scss');

		fs.readFile(filePath, "binary", function (err, file) {

			if (err) {
				callback(err);
				return;
			}

			sass.render({
				file: filePath
			}, function (err, result) {

				if (err) {
					callback(err);
					return;
				}

				postcss([
					autoprefixer({
						browsers: [
							'IE 10',
							'Safari 7',
							'IOS 6'
						]
					})
				]).process(result.css)
					.then(function (result) {
						result.warnings().forEach(function (warn) {
							console.warn(warn.toString());
						});
						//console.log(result.css);

						callback(null, result.css)
					});

			});

		});

	});

};
