const path = require('path');
const webpack = require('webpack');

const { PATHS, createTemplates, entryFiles } = require('./utils');

module.exports = {
    mode: 'development',
    entry: entryFiles,
    output: {
        path: path.resolve(__dirname, PATHS.dist),
        filename: 'scripts/[name].js'
    },
    devServer: {
        compress: true,
        contentBase: PATHS.dist
    },
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
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: '/node_modules/'
            },
            {
                test: /\.(njk|nunjucks)$/,
                use: [
                    {
                        loader: 'nunjucks-isomorphic-loader',
                        query: {
                            root: [path.resolve(__dirname, PATHS.src)]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: 'images/[name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            }
        ]
    },

    plugins: [
        ...createTemplates(['index', 'contacts']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ]
}