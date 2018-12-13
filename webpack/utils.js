const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

function createTemplates(files) {
    return files.map(file => {
        return new HtmlWebpackPlugin({
            chunks: [file,'vendor'],
            filename: `${file}.html`,
            template: PATHS.src + `/${file}.njk`
            // template: PATHS.src + `/${file}.pug`
        })
    });
}

module.exports = {
    PATHS,
    createTemplates
}