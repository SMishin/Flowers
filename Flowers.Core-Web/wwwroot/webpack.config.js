const webpack  = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");

const path = require('path'),
	babelConfig = require('./package.json').babel;

//process.traceDeprecation = true


module.exports = {
	entry: {
		'public/global': './app/public/global/app.js',
		public: './app/public/app.js',
		cms: './app/cms/main.js'
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
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new BabiliPlugin({keepFnName:true})
	]
};