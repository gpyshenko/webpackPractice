const webpack = require('webpack');
const merge = require('webpack-merge');

const { PATHS } = require('./utils');
const common = require('./webpack.common');

const devConfig = merge([
    {
        mode: 'development',
        devServer: {
            hot: true,
            compress: true,
            overlay: true,
            contentBase: PATHS.src
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
])

module.exports = function(env) {
    return merge([
        common(env),
        devConfig
    ])
}