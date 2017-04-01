const path = require('path'),
	babelConfig = require('./package.json').babel;

//process.traceDeprecation = true

module.exports = {
	entry: './app/public/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist/app/public')
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: babelConfig
			}
		]
	}
};