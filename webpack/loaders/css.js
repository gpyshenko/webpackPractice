const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const styleLoader = { loader: 'style-loader' };

const extractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '../'
    }
};

module.exports = function (env) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        (env === 'dev') ? styleLoader : extractLoader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: (env === 'prod'),
                                sourceMap: (env === 'dev')
                            }
                        },
                        { loader: 'postcss-loader' },
                        {
                            loader: "resolve-url-loader",
                            options: {
                                absolute: true
                            }
                        }
                    ]
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: (env === 'dev') ? 'styles/[name].css' : 'styles/[name].[hash].css',
                // chunkFilename: (env === 'dev') ? 'styles/[name].css' : 'styles/[name].[hash].css' 
            }),
        ],
    };
};