
const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.config');
const webpackConfigDev = {
	mode: 'development', // 通过 mode 声明开发环境
	devServer:{
        contentBase:path.resolve(__dirname,'../dist'),
        host:'localhost',
        compress:true,
        port:8888,
        progress: true,
        open: true, // 开启自动打开浏览器
    },
	plugins: [
		//热更新
		new webpack.HotModuleReplacementPlugin(),
    ],
    devtool:'cheap-module-eval-source-map',
	// devtool: "source-map",  // 开启调试模式
	module: {
		rules: []
	},
}
module.exports = merge(webpackConfigBase, webpackConfigDev);