const path = require('path');

module.exports = function (PATHS) {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: [
                        'html-loader', 
                        'pug-html-loader'
                    ],
                },
            ],
        },
    };
};