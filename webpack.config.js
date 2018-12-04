const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

function createTemplates(files) {
    return files.map(file => {
        return new HtmlWebpackPlugin({
            filename: `${file}.html`,
            template: PATHS.src + `/${file}.njk`
        })
    });
}

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
                exclude: /node_modules/
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
        ...createTemplates(['index', 'contacts']),
        new CopyWebpackPlugin([{ from: `${PATHS.src}/assets/`, to: `${PATHS.dist}/assets/`}])
    ]
}