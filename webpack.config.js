const webpack = require('webpack')
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const glob = require('glob');

const ENV = process.env;

const isWatchMode = ENV.WATCH === 'true';

const getEntries = (pattern, extension) => glob
    .sync(pattern)
    .reduce((entries, filename) => {
        const file = filename.split('/').pop();
        const [name] = file.match(/([a-z-A-Z-0-9]+)(?=\.[a-z]+)/g);
        const entryName = `${extension}/${name}`;
        return {...entries, [entryName]: filename};
    }, {});

module.exports = {
    mode: ENV.NODE_ENV,
    watch: isWatchMode,
    entry: {
        ...getEntries(`./src/js/selectPhoneNumTemp.js`, 'js'),
        ...getEntries(`./src/css/*.scss`, 'css'),
    },
    output: {
        path: path.resolve(__dirname, './public')
    },
    devtool: ENV.NODE_ENV === 'development' ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(s*)css$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src/css'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ]
}