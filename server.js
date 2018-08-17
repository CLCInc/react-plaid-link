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
}).listen(3000, 'localhost', function(err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Result: ', result);

    console.log('Listening at localhost:3000');
    opn('http://localhost:3000/examples/');
});
