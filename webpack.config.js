const path = require('path');
const NunjucksWebpackPlugin =  require("nunjucks-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

module.exports = {
    entry: {
        main: './src/scripts/index.js'
    },
    output: {
        path: path.resolve(__dirname, PATHS.dist),
        filename: 'bundle.js'
    },
     module: {
        loaders: [
            {
                test: /\.(njk|nunjucks)$/,
                loader: 'nunjucks-loader'
            }
        ]
    },
    plugins: [
        new NunjucksWebpackPlugin({
            templates: [
                {
                    from: `${PATHS.src}index.njk`,
                    to: "index.html"
                }
            ]
        })
    ]
}