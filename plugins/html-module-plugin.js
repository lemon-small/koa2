const pluginName = 'htmlPluginModule';
class HtmlPluginModule {
    constructor ({ isHack } = options) {
        this.isHack = isHack;
    }
    apply (compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            console.log('构建开始');
            // 既支持module又支持nomodule的浏览器，既不支持module又不支持nomodule浏览器，支持module但不支持nomodule的浏览器
            // 以上可以通过两个script标签解决
            // <script src="abc.js" nomodule></script>
            // <script type="module" src="abc.js"></script>
            // 第一个script, nomodule不支持的浏览器都会加载src, type形式则不会加载，唯一存在问题：增加支持module，不支持nomodule的浏览器，会加载两次，需要做兼容处理    
            
            // compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing

            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pluginName, (htmlPluginData, cb) => {
                // / htmlWebpackPluginAlterAssetTags 把钩子写在这
                htmlPluginData.body.forEach(tag => {
                    if (tag.tagName == "script"){
                        if (/-bundle./.test(tag.attributes.src)) {
                            delete tag.attributes.type;
                            tag.attributes.nomodule = "";
                        } else {
                           tag.attributes.type = "module";
                        }
                    }
                });
                cb(null, htmlPluginData);
            });
        });
    }
}
module.exports = HtmlPluginModule;
