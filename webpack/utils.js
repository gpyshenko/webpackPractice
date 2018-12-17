const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

function createTemplates(files) {
    return files.map(file => {
        return new HtmlWebpackPlugin({
            chunks: ['styles', 'vendor', file],
            filename: `${file}.html`,
            template: PATHS.src + `/${file}.njk`
        })
    });
}

module.exports = {
    PATHS,
    createTemplates
}