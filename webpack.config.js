const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpack = require('webpack')
const extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
})

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/dist'
	},
	watch: true,
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
				test: /\.(jgg|png|svg)/,
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
		new BrowserSyncPlugin({
			// browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['dist'] }
		})
	]
}
