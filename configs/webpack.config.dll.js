const path = require('path')
const webpack = require('webpack')
const {dependencies} = require('../package.json')

const out = path.resolve(__dirname, '..', 'app', 'dll')

module.exports = (env) => ({
    mode: `${env}`,
    target: 'electron-renderer',
    entry: {
        vendors: Object.keys(dependencies || {}),
    },
    output: {
        filename: '[name].dll.js',
        path: out,
        library: '[name]_dll',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(out, '[name].manifest.json'),
            name: '[name]_dll',
            context: __dirname
        })
    ]
})