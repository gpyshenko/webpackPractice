const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: env === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: env === 'dev' ? true : false
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
            new MiniCssExtractPlugin({ filename: 'styles/[name].css' }),
        ],
    };
};