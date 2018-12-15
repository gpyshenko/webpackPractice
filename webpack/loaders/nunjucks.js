const path = require('path');

module.exports = function(PATHS) {
    return {
        module: {
            rules: [
                {
                    test: /\.(njk|nunjucks)$/,
                    use: [
                        {
                            loader: 'html-loader',
                        },
                        {
                            loader: 'nunjucks-html-loader',
                            options: {
                                searchPaths: [path.resolve(__dirname, PATHS.src)]
                            }
                        },
                    ],
                },
            ],
        },
    };
};