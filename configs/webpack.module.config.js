// module需要进行webpack在进行html编译阶段的type=module的处理
// 自定义一个plugin插件处理
const HtmlModulePlugin = require('../plugins/html-module-plugin');


const config = {
    plugins: [
        new HtmlModulePlugin({isHack: true})
        // new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};

module.exports = config;