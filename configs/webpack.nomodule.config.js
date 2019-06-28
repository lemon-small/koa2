// nomodule非模块处理，需要编译为es5

const config = {
    module: {
        output: {
            filename: '[name]-bundle.js',
        },
        rules: [
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
            }
        ]
    }
};

module.exports = config;