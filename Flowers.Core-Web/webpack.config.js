const path = require('path'),
	babelConfig = require('./package.json').babel;

//process.traceDeprecation = true

module.exports = {
	entry: {
		public: './app/public/app.js',
		cms: './app/cms/main.js'
	},
	output: {
		filename: '[name]/app.js',
		path: path.resolve(__dirname, 'dist/app/')
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: babelConfig
			},
			{
				test: /\.html?$/,
				loader: 'html-loader'
			}
		]
	}
};