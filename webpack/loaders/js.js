module.exports = function () {
    return {
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
            ],
        },
    };
};