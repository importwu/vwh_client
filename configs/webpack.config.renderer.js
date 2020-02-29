const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const out = path.resolve(__dirname, '..', 'app', 'dist')
const index = path.resolve(__dirname, '..', 'src', 'renderer', 'index.jsx')
const src = path.resolve(__dirname, '..', 'src')

module.exports = (env) => ({
    mode: `${env}`,
    entry: index,
    target: 'electron-renderer',
    output: {
        path: out,
        filename: `index.${env === 'development' ? 'dev' : 'prod'}.js`
    },
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
        new webpack.DllReferencePlugin({
            manifest: require('../app/dll/vendors.manifest.json'),
            sourceType: 'var',
            context: __dirname,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'renderer', 'index.html'),
            filename: `index.${env === 'development' ? 'dev' : 'prod'}.html`
        })
    ]
})