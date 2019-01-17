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
								presets: ['@babel/preset-env']
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: extractPlugin.extract({
						use: [
							{
								loader: 'css-loader'
							},
							{
								loader: 'sass-loader'
							}
							]
					})
				},
				{
					test: /\.pug$/,
					use: ['pug-loader']
				},
				{
					test: /\.(jpg|png|svg)/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'img/',
								publicPath: 'img/',
							},
						},
						{
							loader: 'image-webpack-loader',
							options: {
								mozjpeg: {
									progressive: true,
									quality: 30
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
				template: 'src/index.pug'
			})
		]
	}
}
