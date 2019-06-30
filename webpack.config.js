// 编译src/web, 生成到dist
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

// const argv0 = process.argv.slice(2);
// console.log(argv0);
// // 默认process.argv是数组
const argv = require('yargs-parser')(process.argv.slice(2));
console.log(argv);
// yargs-parser直接将参数转成对象了，--变量为key值, 空格后的为value值
// webpack --NODE_ENV development --modules module
// { _: [], NODE_ENV: 'development', modules: 'module' }

const chalk = require('chalk');
let webpackPublicPath = '';
let webpackEnvConfig = {};
let webpackModuleConfig = {};

if (argv.NODE_ENV === 'dev') {
    webpackEnvConfig = require(`./configs/webpack.${argv.NODE_ENV}.config`);
    webpackPublicPath = '';
}

if (argv.NODE_ENV === 'prod') {
    webpackEnvConfig = require(`./configs/webpack.${argv.NODE_ENV}.config`);
    webpackPublicPath = '//globalworm.com/koa2/';
}

const _module = argv.modules;

webpackModuleConfig = require(`./configs/webpack.${ argv.modules == 'module' ? "module" : "nomodule"}.config`);


// 根据入参，是否编译成module配置
// const webpackModuleConfig = argv[modules] === 'module' ? '' : '';

// if (process.env.NODE_ENV === 'development') {
//     webpackPublicPath = '../../web/'
// }

// if (process.env.NODE_ENV === 'product') {
//     webpackPublicPath = '//globalworm.com/koa2/'
// }

let config = {
    mode: 'dev', // 或从CLI命令行
    // resolve: {
    //     modules: [modulesPath,pikNodeModulesPath],
    //     alias: alias || {}
    // },
    // resolveLoader: {
    //     modules: [pikNodeModulesPath]
    // },
    // watch: isWatch,
    entry: {
        // 'views/index': './src/web/views/index.js',
        // update: './src/web/views/update.html',
        // view: './src/web/views/view.html'
    }, // 动态添加入口
    output: {
        path: __dirname + '/dist/web/',
        filename: '[name].js',
        // filename: getMD5FileName('[name]', '[chunkhash:8]', 'js'),
        publicPath: webpackPublicPath,
        chunkFilename: `assets/chunks/${getMD5FileName('[name]', '[chunkhash:8]', 'js')}`
    },
    externals: [
        {
            'custom-elements': 'Custom-elements',
            core: 'Core',
            jquery: 'jQuery',
            axios: 'axios'
        }
    ],
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
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader',
            //     options: {
            //         babelrc: false,
            //         presets: [
            //             [
            //                 "@babel/preset-env",
            //                 {
            //                     "modules": "systemjs"
            //                 }
            //             ]
            //         ],
            //         plugins: [
            //             "@babel/plugin-transform-runtime",
            //             "@babel/plugin-transform-arrow-functions"
            //         ]
            //     }
            // },
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
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }, 
            {
                test: /\.(png|jpe?g|gif|svg|woff|eot|ttf|pkg|exe|woff2)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    outputPath: `./assets/files/`,
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

const entry = {
    entryName: 'index',
    entryPath: './src/web/views/index.js'
}
config.entry[entry.entryName]= entry.entryPath;


config.plugins.push(
    new MiniCssExtractPlugin({
        filename: getMD5FileName("[name]", "[hash:8]", "css"), //'[name].css?v=[hash]',
        chunkFilename: getMD5FileName("[id]", "[hash:8]", "css") //'[id].css?v=[hash]',
    })
);

// const htmlArray = ['index', 'update', 'view'];
const htmlArray = [entry.entryName];
htmlArray.forEach((element) => {
  const chunksArray = [element];
  const newPlugin = new HtmlWebpackPlugin({
    filename: element + '.html',
    // template: './src/web/views/' + element + '.html',   // 获取最初的html模版
    template: _module == "module" ? './src/web/views/' + element + '.html' : './dist/web/' + element + '.html', // 第一次module, 再nomodule找的是dist,最后html有2份
    chunks: chunksArray
  });
  config.plugins.push(newPlugin);
});

function getMD5FileName(srcName, md5, extName) {
    // return pikBuildConfig.md5fyAssetsName ? `${srcName}.${md5}.${extName}` : `${srcName}.${extName}?v=${md5}`;
    return  `${srcName}.${md5}.${extName}`;
}
// webpackEnvConfig
// webpack-merge 对象key值覆盖，数组值追加
// console.log('merge', merge({age: 2, list: [{age: 1}, 7, 2]}, {age: 23, name: 232, list: [{age: 5}, 10, 5]}));


module.exports = merge(config, webpackEnvConfig, webpackModuleConfig);