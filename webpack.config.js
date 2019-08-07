const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { sass } = require('svelte-preprocess-sass');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const isDevelopment = mode === 'development';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte', '.scss'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: [{
					loader: 'svelte-loader',
					options: {
						hotReload: true,
						preprocess: {
							style: sass(  {
									name: 'scss',
									includePaths: ['src', 'public']
								}, // Empty sass options
								{ all: true }  // Preprocess all styles
							)
						}
					}
				}]
			},
			{
				test:/\.(s*)css$/,
				use:['style-loader','css-loader', 'sass-loader']
			}
		]
	},

	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
		})
	],
	devtool: prod ? false: 'source-map'
};
