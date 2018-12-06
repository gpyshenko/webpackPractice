const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

function createTemplates(files) {
    return files.map(file => {
        return new HtmlWebpackPlugin({
            filename: `${file}.html`,
            template: PATHS.src + `/${file}.njk`
        })
    });
}

const entryFiles = {
    vendors: './src/scripts/other.js',
    main: './src/scripts/index.js'
}

module.exports = {
    PATHS,
    createTemplates,
    entryFiles
}