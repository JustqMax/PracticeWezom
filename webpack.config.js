const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}
const cssLoaders = extra => {
    const loaders = [{
            loader: MiniCssExtractPlugin.loader,
            options: {},
        },
        'css-loader'
    ]
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: `assets/js/[name].js`,
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        open: true,
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, './src/assets/img'),
                to: path.resolve(__dirname, 'dist/assets/img')

            }, ]
        }),
        new MiniCssExtractPlugin({
            filename: `assets/css/[name].css`,

        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })

    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: cssLoaders()
            }, {
                test: /\.(sass|scss)$/,
                use: cssLoaders('sass-loader')
            }, {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                type: 'asset/resource',
            }

            , {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/inline',

            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                useBuiltIns: 'usage',
                                corejs: 3
                            }]
                        ]
                    }
                }
            },

        ]
    }
}