const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpack = require('webpack')
const mode = process.env.mode
const ImageminPlugin = require('imagemin-webpack-plugin').default
const extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
})
function watcher (env) {
	return env !== 'production' ? true : false;
}
config = {
	mode,
}
module.exports = (env, options) => {
	return {
		entry: './src/js/app.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
			// publicPath: '/dist'
		},
		watch: watcher(options.mode),
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['latest']
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: extractPlugin.extract({
						use: ['css-loader', 'sass-loader']
					})
				},
				{
					test: /\.html$/,
					use: ['html-loader']
				},
				{
					test: /\.(jpg|png|svg)/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'img/',
								publicPath: 'img/'
							}
						}
					]
				}
			]
		},
		plugins: [
			extractPlugin,
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery"
			}),
			new HtmlWebpackPlugin({
				template: 'src/index.html'
			}),
			new ImageminPlugin({test: 'img/**'}),
			new ImageminPlugin({
				// disable: process.env.NODE_ENV !== 'production', // Disable during development
				pngquant: {
					quality: '95-100',
					optimizationLevel: 9
				},
				jpegtran: {
					optimizationLevel: 9
				}
			})
		]
	}
}
