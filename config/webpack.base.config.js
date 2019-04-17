const path = require("path")
const glob = require('glob')
const HtmlWebpackPlugin = require("html-webpack-plugin");//html打包插件
const extractTextPlugin = require('extract-text-webpack-plugin')//css分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//webpack-dev-server是一个轻量级的服务器，修改文件源码后，自动刷新页面将修改同步到页面上


// 引入多页面文件列表
const { HTMLDirs } = require("./config");
let HTMLPlugins = [];
// 入口文件集合
let entries = {};
HTMLDirs.forEach((page) => {
	entries[page] = path.resolve(__dirname, `../src/js/${page}/${page}.js`);
})


module.exports = {
	entry:entries,
	output:{
		path: path.join(__dirname, '../dist'),
		filename: 'js/[name].js?v=[hash]',
	},
	resolve:{
		extensions: [".js",".css",".json"]
	},
	module:{
		rules:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			// {
			// 	test: /.(css|less)$/,
			// 	use: [
			// 	  MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
			// 	  "css-loader"
			// 	]
			// },
			{
				test:/\.css$/,
				use: extractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader","postcss-loader"]
				}),
				include: path.join(__dirname, '../src/css'), //限制范围，提高打包速度
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: extractTextPlugin.extract({
					use: ["css-loader","less-loader","postcss-loader"],
					fallback: "style-loader"
				}),
				include: path.join(__dirname, '../src/css'), //限制范围，提高打包速度
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: extractTextPlugin.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}],
					fallback: "style-loader"
				}),
				include: path.join(__dirname, '../src/css'), //限制范围，提高打包速度
				exclude: /node_modules/
			},
			{
				test: /\.(htm|html)$/i,
				use:[ 'html-withimg-loader']
			},
			{
				test:/\.(png|jpe?g|gif|svg)/,  //是匹配图片文件后缀名称
				use:[{
					loader:'url-loader', //是指定使用的loader和loader的配置参数
					options:{
						limit:8129,  //是把小于500B的文件打成Base64的格式，写入JS
						outputPath:'images/',  //打包后的图片放到images文件夹下
						publicPath:"../../images"
					}
				}]
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			minify:{ //是对html文件进行压缩
				removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
			},
			hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
			template:'./src/index.html', //是要打包的html模版路径和文件名称。
			chunks:['index','common'],
		}),
		new extractTextPlugin({
			filename: 'css/[name].css'
		}),
		// new MiniCssExtractPlugin({
		// 	// Options similar to the same options in webpackOptions.output
		// 	// both options are optional
		// 	filename: "[name].css",
		// 	chunkFilename: "[id].css"
		// })
	],
	devtool:'cheap-module-eval-source-map'
}

HTMLDirs.forEach((page) => {
	// 首页单独处理
	if(page == 'index'){
		return;
	}
    const conf = {
        filename: `pages/${page}.html`,
        template: path.resolve(__dirname, `../src/pages/${page}.html`),
		chunks: [page, 'common'],
		minify: {
			removeAttributeQuotes:true,
			removeComments: true,
			collapseWhitespace: true,
			removeScriptTypeAttributes:true,
			removeStyleLinkTypeAttributes:true
		}
	};
	module.exports.plugins.push(new HtmlWebpackPlugin(conf));
})

