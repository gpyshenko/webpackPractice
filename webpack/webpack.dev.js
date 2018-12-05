const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { PATHS, createTemplates } = require('./utils');

module.exports = {
    mode: 'development',
    entry: {
        vendors: './src/scripts/vendors.js',
        main: './src/scripts/index.js'
    },
    output: {
        path: path.resolve(__dirname, PATHS.dist),
        filename: 'scripts/[name].js'
    },
    devServer: {
        compress: true,
        // hot: true,
        contentBase: PATHS.dist
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
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
                        loader: 'css-loader'
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
        new webpack.HotModuleReplacementPlugin(),
        ...createTemplates(['index', 'contacts']),
        new CopyWebpackPlugin([{ from: `${PATHS.src}/assets/`, to: `${PATHS.dist}/assets/`}])
    ]
}