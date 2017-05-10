
let jsConvert = require('./handlers/js-convert'),
	cssConverter = require('./handlers/css-convert'),
	path = require('path')
;

let root = path.resolve(__dirname, '../');

function precess(callback, url) {

	let filePath = path.resolve(root + url);

	if (filePath.match(/.jsx?/)) {
		jsConvert(callback, filePath);
	}
	else {
		cssConverter(callback, filePath);
	}

}

precess(function (err, result) {
	console.log(result);
}, '/app/cms/app.module.js');

module.exports = precess;


