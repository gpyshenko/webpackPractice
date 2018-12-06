const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const { PATHS, createTemplates, entryFiles} = require('./utils');

const cleanOptions = { root: path.resolve(__dirname, '..'), verbose: true }

module.exports = {
    mode: 'production',
    entry: entryFiles,
    output: {
        path: path.resolve(__dirname, PATHS.dist),
        filename: 'scripts/[name].js'
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
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin()
        ]
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
                        loader: MiniCssExtractPlugin.loader
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
        new CleanWebpackPlugin('dist', cleanOptions),
        ...createTemplates(['index', 'contacts']),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new MinifyPlugin(),
        new CopyWebpackPlugin([{ from: `${PATHS.src}/assets/`, to: `${PATHS.dist}/assets/`}])
    ]
}