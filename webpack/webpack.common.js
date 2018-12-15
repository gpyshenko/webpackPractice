const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { PATHS, createTemplates } = require('./utils');
const entry = require('./entry');

const nunjucks = require('./loaders/nunjucks');
const css = require('./loaders/css');
const js = require('./loaders/js');
const fonts = require('./loaders/fonts');
const images = require('./loaders/images');

const common = function (env) {
    return {
        entry,
        output: {
            path: path.resolve(__dirname, PATHS.dist),
            filename: (env === 'prod') ? 'scripts/[name].[hash].js' : 'scripts/[name].js'
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        minChunks: 1
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/
                    }
                }
            }
        },
        plugins: [
            ...createTemplates(['index','contacts']),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
            new webpack.HashedModuleIdsPlugin()
        ]
    }
}

module.exports = function (env) {
    return merge([
        common(env),
        nunjucks(PATHS),
        css(env),
        js(),
        fonts(env),
        images(env)
    ])
}