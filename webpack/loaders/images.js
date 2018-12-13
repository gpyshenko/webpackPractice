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
                                name: 'img/[name].[ext]'
                            }
                        },
                        'img-loader'
                    ],
                },
            ],
        },
    };
};