const path = require('path');
const webpack = require('webpack');

const { PATHS, createTemplates } = require('./utils');
const entry = require('./entry');

module.exports = {
    entry,
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        ...createTemplates(['index', 'contacts']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ]
}