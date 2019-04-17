const path = require("path")
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")//引入js压缩插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpackConfigBase = require('./webpack.base.config');

const webpackConfigProd = {
    mode:'production',
    module: {
		rules: []
	},
    plugins:[],
    devtool:'cheap-module-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
            //   cache: true,
              parallel: true,
              sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSPlugin({})
        ],
        splitChunks: {
            minSize: 30000,
			cacheGroups: {
                common: {//公用文件
                    chunks: "initial",
                    // 实际路径
                    test:/[\\/]src[\\/]js[\\/]common[\\/].*\.js/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
                    name: "common",
                    minChunks: 1,
					maxInitialRequests: 5,
					minSize: 0,
					priority:1,
                    enforce: true
                }
			}
        },
    }
}

module.exports = merge(webpackConfigBase, webpackConfigProd);