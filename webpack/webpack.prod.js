const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const { PATHS } = require('./utils');
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
            new CopyWebpackPlugin([{ from: `${PATHS.src}/assets/`, to: `${PATHS.dist}/assets/` }])
        ]
    }
])

module.exports = function (env) {
    return merge([
        common(env),
        prodConfig
    ])
}