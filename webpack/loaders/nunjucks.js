const path = require('path');

module.exports = function(PATHS) {
    return {
        module: {
            rules: [
                {
                    test: /\.(njk|nunjucks)$/,
                    use: [
                        {
                            loader: 'nunjucks-isomorphic-loader',
                            query: {
                                root: [path.resolve(__dirname, PATHS.src)]
                            }
                        },
                    ],
                },
            ],
        },
    };
};