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

const settings = require('../settings.json');

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
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `plugin.${packageName.replace('@', '')}`;
                        }
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/
                    }
                }
            }
        },
        plugins: [
            new webpack.ProgressPlugin(),
            ...createTemplates(settings.pages),
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