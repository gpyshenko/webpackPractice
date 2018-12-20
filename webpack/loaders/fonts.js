module.exports = function (env) {
    return {
        module: {
            rules: [
                {
                    test: /\.(svg|eot|ttf|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: (env === 'dev') ? '[name].[hash].[ext]' : '[name].[ext]',
                            outputPath: 'assets/fonts/'
                        }
                    }
                },
            ],
        },
    };
};