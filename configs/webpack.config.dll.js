const path = require('path')
const webpack = require('webpack')
const {dependencies} = require('../package.json')

const out = path.resolve(__dirname, '..', 'app', 'dll')

module.exports = (env) => ({
    mode: `${env}`,
    target: 'electron-renderer',
    entry: {
        renderer: ['react'],
    },
    output: {
        filename: '[name].dll.js',
        path: out,
        library: '[name]_dll',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(out, '[name].manifest.json'),
            name: '[name]_dll',
            context: __dirname
        })
    ]
})