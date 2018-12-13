module.exports = function () {
    return {
        module: {
            rules: [
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
                    ],
                },
            ],
        },
    };
};