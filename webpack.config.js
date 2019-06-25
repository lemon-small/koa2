// 编译src/web, 生成到dist
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');
// const webpackPublicPath = getPublicPath(env, bizAssetsPrefix);

let buildConfig = {
    publicPath: {
        dev: './dist',
        stg: '',
        prd: ''
    },
    dist: {
        root: 'dist',

        // _assets 文件夹
        // 存放 webpack chunks、脱离 webpack 构建出来资源（如：lib.js）的路径
        assets: 'web/_assets'
    }
}


let config = {
    // mode: 'development', // 或从CLI命令行
    // resolve: {
    //     modules: [modulesPath,pikNodeModulesPath],
    //     alias: alias || {}
    // },
    // resolveLoader: {
    //     modules: [pikNodeModulesPath]
    // },
    // watch: isWatch,
    entry: {
        index: './src/web/views/index.js',
        // update: './src/web/views/update.html',
        // view: './src/web/views/view.html'
    }, // 动态添加入口
    output: {
        path: __dirname + '/dist/web/views',
        // filename: '[name].js'
        filename: getMD5FileName('[name]', '[chunkhash:8]', 'js'),
        // publicPath: webpackPublicPath,
        // chunkFilename: `${pikBuildConfig.dist.assets}/chunks/${getMD5FileName('[name]', '[chunkhash:8]', 'js')}`
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loaders: 'swig-loader'
            },
            // {
            //     test: /\.js$/,
            //     loader: 'es3ify-loader'
            // }
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "modules": "systemjs"
                            }
                        ]
                    ],
                    plugins: [
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-transform-arrow-functions"
                    ]
                }
            },
            // {
            //     test: /\.js$/,
            //     loader: 'eslint-loader',
            //     exclude: require(path.resolve(pikConfigFilesPath, 'eslintignore.js')),
            //     options: {
            //         configFile: path.resolve(pikConfigFilesPath, 'eslint.json')
            //     }
            // },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            }, 
            {
                test: /\.(png|jpe?g|gif|svg|woff|eot|ttf|pkg|exe)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    outputPath: `./dist/style/files/`,
                    name: getMD5FileName('[path][name]', '[hash:8]', '[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "ENV": process.env.NODE_ENV
        })
        // new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};

// const htmlArray = ['index', 'update', 'view'];
const htmlArray = ['index'];
htmlArray.forEach((element) => {
  const chunksArray = [element];
  const newPlugin = new HtmlWebpackPlugin({
    filename: element + '.html',
    template: './src/web/views/' + element + '.html',   // 获取最初的html模版
    chunks: chunksArray
  });
  config.plugins.push(newPlugin);
});

function getMD5FileName(srcName, md5, extName) {
    // return pikBuildConfig.md5fyAssetsName ? `${srcName}.${md5}.${extName}` : `${srcName}.${extName}?v=${md5}`;
    return  `${srcName}.${md5}.${extName}`;
}

module.exports = config;