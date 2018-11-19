const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './server.js',
    target: 'node',
    output: {
        path: path.join(__dirname, '/bundle'),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.jsx', '.js', '.css']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
}