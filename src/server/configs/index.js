import lodash from 'lodash';
import path from 'path';


// let config = {
//     'ViewDir': path.join(__dirname, '../..', 'web', 'views'),
//     'AssetsDir': path.join(__dirname, '../..', 'web', 'assets')
// };
let config = {};

if (process.env.NODE_ENV == "development") {
    config = {
        'ViewDir': path.join(__dirname, './', 'web', 'views'),
        'AssetsDir': path.join(__dirname, './', 'web', 'assets')
    }
    const localconfig = {
        port: 8081
    }
    config = lodash.extend(config, localconfig);
}

if (process.env.NODE_ENV == "production") {
    config = {
        'ViewDir': path.join(__dirname, './', 'web', 'views'),
        'AssetsDir': path.join(__dirname, './', 'web', 'assets')
    };
    const prodConfig = {
        port: 80
    }
    config = lodash.extend(config, prodConfig);
}

export default config;