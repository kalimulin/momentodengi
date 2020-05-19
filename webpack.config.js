var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        mdadmin: './frontend/mdadmin.js',
        lk: './client/lk.js'
    },
    output: {
        path: path.join(__dirname, 'server/public/build'),
        filename: '[name].bundle.js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'es2015',
                                'stage-0',
                                'react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ]
    },
    devServer: {
        proxy: [
            {
                path: '/md-admin',
                target: 'http://localhost:4000/'
            },
            {
                path: '/lk/',
                target: 'http://localhost:4000/'
            },
            {
                path: '/api/',
                target: 'http://localhost:4000/'
            },
            {
                path: '/token',
                target: 'http://localhost:4000/'
            },
            {
                path: '/pro_api',
                target: 'http://localhost:4000/'
            }
        ],
        historyApiFallback: true
    },
};