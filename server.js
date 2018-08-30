'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');

const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    compress: true,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    open: true,
    openPage: '/examples',
}).listen(9808, 'localhost', function(err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Result: ', result);

    console.log('Listening at localhost:9808');
    opn('http://localhost:9808/examples/');
});
