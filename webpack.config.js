var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getHtmlConfig = function(name){
	return {
		template : './src/view/'+name+'.html', //html的原始模板
		filename : 'view/'+name+'.html', //输出的模板
		inject   :true,
		hash     :true,
		chunks 	 :[name,'common']
	}
}
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var config = {
		entry: {
			'common':['./src/page/common/index.js'],
			'index':['./src/page/index/index.js'],
			'login':['./src/page/login/login.js']
		},
		output: {
			path: './disk/',
			publicPath:'/disk/',
			filename:'js/[name].js'
		},
		externals:{
			'jquery' : 'window.jQuery'
		},
		plugins: [
			//
			new webpack.optimize.CommonsChunkPlugin({
				name : 'common',
				filename : 'js/base.js'
			}),

			new ExtractTextPlugin("css/[name].css"),
			//html模板的处理
			new HtmlWebpackPlugin(getHtmlConfig('index')),
			new HtmlWebpackPlugin(getHtmlConfig('login'))
		],
		module: {
		    loaders: [
		      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
		      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
		    ]
  		},	
	}

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
