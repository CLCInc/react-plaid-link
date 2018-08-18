const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const EXAMPLES_DIR = path.resolve(__dirname, 'examples');

function isDirectory(dir) {
    return fs.lstatSync(dir).isDirectory();
}

function buildEntries() {
    return fs.readdirSync(EXAMPLES_DIR).reduce(function(entries, dir) {
        if (dir === 'build') {return entries;}

        const isDraft = dir.charAt(0) === '_';

        if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir))) {entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.js');}

        return entries;
    }, {});
}

module.exports = {
    mode: 'production',
    entry: buildEntries(),

    output: {
        filename: '[name]-bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/',
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' }},
        ],
    },

    resolve: {
        alias: {
            'react-plaid-link': path.resolve(__dirname, './src'),
        },
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};
