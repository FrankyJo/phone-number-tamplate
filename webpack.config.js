const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const ENV = process.env;

const isWatchMode = ENV.WATCH === 'true';

console.log(ENV.NODE_ENV);

const PATHS = {
    src: path.resolve(__dirname, 'src'),
    dev: path.resolve(__dirname, 'src/js'),
    src_css: path.resolve(__dirname, 'src/css'),
    src_img: path.resolve(__dirname, 'src/images'),
    public_img: path.resolve(__dirname, 'public/'),
};

module.exports = {
    mode: ENV.NODE_ENV,
    watch: isWatchMode,
    entry: {
        pnt: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: ENV.NODE_ENV === 'development' ? path.resolve(__dirname, './dev') : path.resolve(__dirname, './public'),
        filename: '[name].min.js',
    },
    devtool: ENV.NODE_ENV === 'development' ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}