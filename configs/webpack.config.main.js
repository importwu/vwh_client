const path = require('path')
const webpack = require('webpack')
const {dependencies} = require('../app/package.json')

const out = path.resolve(__dirname, '..', 'app')

module.exports = (env) => ({
    mode: `${env}`,
    target: 'electron-main',
    entry: {
        main: path.resolve(__dirname, '..', 'src', 'main', 'main.js'),
    },
    output: {
        filename: `[name].${env === 'development' ? 'dev' : 'prod'}.js`,
        path: out
    },
    externals: [(context, request, callback) => {
        if(dependencies.hasOwnProperty(request)) return callback(null, `commonjs ${request}`)
        callback()
    }],
    resolve: {
        modules: [path.resolve(__dirname, '..', 'app'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: env
        })
    ],
    node: {
        __dirname: false,
        __filename: false
      }
})