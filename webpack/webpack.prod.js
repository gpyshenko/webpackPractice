const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const { PATHS } = require('./utils');
const common = require('./webpack.common');
const nunjucks = require('./loaders/nunjucks');
const css = require('./loaders/css');
const js = require('./loaders/js');
const images = require('./loaders/images');

const cleanOptions = { root: path.resolve(__dirname, '..'), verbose: true }

const prodConfig = merge([
    {
        mode: 'production',
        output: {
            path: path.resolve(__dirname, PATHS.dist),
            filename: 'scripts/[name].[hash].js'
        },
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
    console.log(env)
    return merge([
        common,
        prodConfig,
        nunjucks(PATHS),
        css(env),
        js(),
        images()
    ])
}