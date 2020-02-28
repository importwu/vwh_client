const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {dependencies} = require('../package.json')

const out = path.resolve(__dirname, '..', 'app', 'dist')
const index = path.resolve(__dirname, '..', 'src', 'renderer', 'index.jsx')
const src = path.resolve(__dirname, '..', 'src')

module.exports = (env) => ({
    mode: `${env}`,
    entry: index,
    target: 'electron-renderer',
    output: {
        path: out,
        filename: 'index.bundle.js'
    },
    // externals: ['react', 'react-dom', 'styled-components'],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.join(src, 'components'),
            '@pages': path.join(src, 'pages')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require('../app/dll/renderer.manifest.json'),
            sourceType: 'var',
            context: __dirname,
            name: 'renderer_dll'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'renderer', 'index.html'),
        })
    ]
})