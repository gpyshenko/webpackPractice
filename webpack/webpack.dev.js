const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const { PATHS } = require('./utils');
const common = require('./webpack.common');
const nunjucks = require('./loaders/nunjucks');
const js = require('./loaders/js');
const css = require('./loaders/css');
const images = require('./loaders/images');

const devConfig = merge([
    {
        mode: 'development',
        output: {
            path: path.resolve(__dirname, PATHS.dist),
            filename: 'scripts/[name].js'
        },
        devServer: {
            compress: true,
            overlay: true,
            contentBase: PATHS.dist
        }
    }
])

module.exports = function(env) {
    return merge([
        common,
        devConfig,
        nunjucks(PATHS),
        css(env),
        js(),
        images()
    ])
}