const {join} = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 友好的错误处理
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 友好的错误处理
const setTitle = require('node-bash-title');
setTitle('🍻  开发环境配置');
const setIterm2Badge = require('set-iterm2-badge'); // 设置iterm2窗口大字
const port = '8088';
setIterm2Badge(port);

const config = {
    devServer: {
        contentBase: join(__dirname, "../dist"),
        hot: true,
        quiet: true // 为了friendly使用的
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:3000'],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
            },
            onErrors: function (severity, errors) {
            // You can listen to errors transformed and prioritized by the plugin
            // severity can be 'error' or 'warning'
            }
        }),
        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            logo: path.resolve("../lemon.jpeg"),
            suppressSuccess: true
        })
    ]
};

module.exports = config;