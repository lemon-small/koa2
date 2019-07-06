KOA2 SSR服务端渲染项目 （后端直出，node服务端页面，接口从php去拿）

vue 属于csr，koa2 + vue 属于 ssr + csr，服务端加客户端

koa2: node mvc框架 轻量可通过各种中间件构建复杂应用;
koa1写法特征：generator + yiled, this指ctx
app.use(function * (next) {
    yield next;
    console.log(1);
});

koa2写法特征: async + await, this不是ctx, 必须指明ctx
app.use(async (ctx, next) => {
    await next();
}
执行为逆栈，next找下一个next，如果没有，逆向出站回到之前每一个await暂留处

使用技能有：具体看项目
koa
koa-simple-router
koa-swig
co
koa-static
convert
log4js
jsdoc
e2e
mocha
babel
systemjs
axios
throttle
lodash
path
cross-env
函数式编程
模块化书写

C 路由:
koa-simple-router或koa-router

V 视图：
koa-swig
co：兼容koa1的generator+yield

M 数据模型: class

静态资源：
koa-static：管理静态资源文件
convert：兼容koa1的书写的插件


代码：
es6：编译 -> babel， systemjs集合type="module"浏览器支持区分加载es6和es5的文件
函数式编程，如：underscore(_), 核心方法_.mixin(将对象key和值重新挂载到_)
节流函数throttle: 控制点击次数
axios：异步请求

容错: class
errorHandler
app.use(async (ctx, next) => { // 容错方法写在app.use挂载的首行
    try {
        await next(); // next以后的只要存在报错这里都会捕获到首个try下的catch，报错不进行一步步返回
        console.log(11);
    } catch (error) {
    }
});

日志：log4js

wiki自动生成：jsdoc
/** + 回车，写好类，方法说明，参数说明，例子等，直接build后将所有js自动生成文档, 一般将model的类进行wiki维护

自动化测试：e2e + mocha, 流程自动测试 + 接口异步测试





---------------------------------------------------------------------------------
二、koa ssr前后端分离
自动化构建
自动化测试
自动化部署
CLI工具

用rollup，一定要将文件写成es6形式，否则不行，es5当作外部依赖
import 不可加载变量和表达式，一定字符串路径？

# ----Rollup编译----

# 在项目中使用async/await，编译代码的的时候, regeneratorRuntime is not defined的错
不建议使用babel-polyfill，因为这个太大了，现在6.0版本的babel改成了插件的形式，现在推荐的是transform-runtime 将其加入plugins, 

第一步：下载babel-polyfill，npm i @babel/plugin-transform-runtime -D
第二步：配置.babelrc
"plugins": [
    "@babel/plugin-transform-runtime", // 转es6 async/await
    "@babel/plugin-transform-arrow-functions" // 转es6 普通语法


# this.setDynamic is not a function // 装下这个，@babel/runtime

# gulp多task使用，需要一个default, 然后使用gulp.series()在引入其他的
gulp.task('server', function () {

});
gulp.task('default', gulp.series('server', function () {

}));

# 使用rollup-plugin-replace, 替换代码中的环境变量, 实现流清洗
// 默认rollup开启tree shaking把没有引入使用的代码去掉了，但对于变量判断的不会去因为这不是执行阶段，但可以通过replace插件实现环境变量替换触发rollup去掉那些无用的逻辑；

import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV
plugins: [
    replace({
        'process.env.NODE_ENV': JSON.stringify(env) // 需要转换命令行的字符，否则代码不当它为字符
    }),
]


# Gulp 4抛弃了依赖参数（dependency parameter），用执行函数来代替：

gulp.series 用于串行（顺序）执行
gulp.parallel 用于并行执行

https://segmentfault.com/a/1190000017571288?utm_source=tag-newest


# gulp 热编译
https://blog.csdn.net/beverley__/article/details/55213235

# rollup
https://www.cnblogs.com/tugenhua0707/p/8179686.html
https://www.codercto.com/a/38213.html



// 编译后dist目录划分

dist
    web
        assets/
        index.html
        index.js
        index.css

----------------------------------------------
jenkins:
// jenkins可以执行项目下面.sh文件，作为统一执行`sh build.sh`，就不要一条条写到jenkins中了；
webhooks自动触发构建: 开启jenkins githooks轮询, 复制jenkins webhook链接给到git代码仓库webhook配置下, 设置push触发，然后本地提交代码后即触发jenkins自动；
https://blog.csdn.net/qq_21768483/article/details/80177920

jenkins所属环境安装nvm 或者 linux下装cnpm
首次安装node_modules: npm install
npm run client:prod
npm run client:prodes5
npm run server:prod
npm run server:prodes5
cp  ./package.json ./dist


构建默认es5项目：
npm install
npm run client:prodefault
npm run server:prod
cp  ./package.json ./dist


jenkins for online:
// 备份远端生产文件

// 上传文件覆盖
scp -r ./dist/ lemon-baidu:/home/koa2/

// 登录线上服务器，安装package.json，为gulp编译server可以使用包
// ssh lemon-baidu
// cd /dist && cnpm install

// 启动服务, 线上pm2 start等
// nodemon local_app.js
--------------------------------------------

需要预先在linux服务器安装好使用包环境，然后再在jenkins中使用