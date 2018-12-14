const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: (env === 'dev') ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: (env === 'dev')
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({ 
                filename: (env === 'dev') ? 'styles/[name].css' : 'styles/[name].[hash].css' ,
                // chunkFilename: (env === 'dev') ? 'styles/[name].css' : 'styles/[name].[hash].css' 
            }),
        ],
    };
};