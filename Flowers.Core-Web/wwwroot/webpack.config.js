var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path'),
	babelConfig = require('./package.json').babel;

//process.traceDeprecation = true

let plg = new ExtractTextPlugin({ // define where to save the file
	filename: '[name]/bundle.css',
	allChunks: true,
});

module.exports = {
	entry: {
		public: './app/public/app.js',
		//cms: './app/cms/main.js',
		//styles: './app/styles/main.scss'
	},
	output: {
		filename: '[name]/app.js',
		path: path.resolve(__dirname, 'dist/app/'),
		publicPath: "/"
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
			},
			{
				test: /\.(jpe?g|png|gif|svg|woff2?)$/,
				loader: "file-loader"
			},
			{ // sass / scss loader for webpack
				test: /\.(sass|scss)$/,
				loader: plg.extract(['css-loader', 'sass-loader'])
			}
		]
	},
	plugins: [
		plg
	]
};