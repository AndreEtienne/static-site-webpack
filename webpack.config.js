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
	return env !== 'production';
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
								outputPath: 'img',
								name: '[name].[ext]',
							},
						},
						{
							loader: 'image-webpack-loader',
							options: {
								mozjpeg: {
									progressive: true,
									quality: 65
								},
								// optipng.enabled: false will disable optipng
								optipng: {
									enabled: false,
								},
								pngquant: {
									quality: '65-90',
									speed: 4
								},
								gifsicle: {
									interlaced: false,
								},
								// the webp option will enable WEBP
								webp: {
									quality: 30
								}
							}
						},
					],
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
			})
		]
	}
}
