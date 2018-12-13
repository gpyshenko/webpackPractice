const webpack = require('webpack');
const merge = require('webpack-merge');

const { PATHS } = require('./utils');
const common = require('./webpack.common');

const devConfig = merge([
    {
        mode: 'development',
        devServer: {
            compress: true,
            overlay: true,
            contentBase: PATHS.src
        }
    }
])

module.exports = function(env) {
    return merge([
        common(env),
        devConfig
    ])
}