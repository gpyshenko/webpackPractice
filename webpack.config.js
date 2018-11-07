const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};


function createTemplates(files) {
    var arr = []
    files.forEach(file => {
        arr.push(new HtmlWebpackPlugin({
            filename: `${file}.html`,
            template: PATHS.src + `/${file}.njk`
        }))
    });
    return arr;
}

module.exports = {
    mode: 'development',
    entry: {
        vendors: './src/scripts/vendors.js',
        main: './src/scripts/index.js'
    },
    output: {
        path: path.resolve(__dirname, PATHS.dist),
        filename: 'scripts/[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
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
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: PATHS.dist,
        hot: true
    },
    plugins: [
        ...createTemplates(['index', 'contacts'])
    ]
}