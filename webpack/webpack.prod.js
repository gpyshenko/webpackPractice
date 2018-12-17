const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const common = require('./webpack.common');

const cleanOptions = { root: path.resolve(__dirname, '..'), verbose: true }

const prodConfig = merge([
    {
        mode: 'production',
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin()
            ]
        },
        plugins: [
            new CleanWebpackPlugin('dist', cleanOptions),
            new MinifyPlugin(),
            new webpack.ProgressPlugin()
        ]
    }
])

module.exports = function (env) {
    return merge([
        common(env),
        prodConfig
    ])
}