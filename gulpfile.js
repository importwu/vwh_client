const path = require('path')
const {spawn} = require('child_process')
const {watch, parallel, series} = require('gulp')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const electron = require('electron')
const minimist = require('minimist')
const dllConfig = require('./configs/webpack.config.dll')
const rendererConfig = require('./configs/webpack.config.renderer')
const mainConfig = require('./configs/webpack.config.main')

const options = minimist(process.argv.slice(2), {
    string: ['env'],
    default: {env: process.env.NODE_ENV || 'production'},
})

function build_dll(done) {
    const complier = webpack(dllConfig(options.env))

    complier.run((err, stats) => {
        if(stats.hasErrors()) {
            console.log('build dll is failed.')
        }
        console.log(stats.toString({assets: true}))
        done()
    })
}


function build_renderer(done) {
    const complier = webpack(rendererConfig(options.env))

    complier.run((err, stats) => {
        if(stats.hasErrors()) {
            console.log('build renderer is failed.')
        }
        console.log(stats.toString({assets: true}))
        done()
    })
}

function build_main(done) {
    const complier = webpack(mainConfig(options.env))

    complier.run((err, stats) => {
        if(stats.hasErrors()) {
            console.log('build main is failed.')
        }
        console.log(stats.toString({assets: true}))
        done()
    })
}



function start(done) {
    const app = path.resolve(__dirname, 'app', `main.${options.env === 'development' ? 'dev' : 'prod'}.js`)

    electron_process = spawn(electron, [app], {shell: process.platform === 'win32'})

    electron_process.on('close', () => {
        console.log('exit electron app')
    })
    done()
}

// function start_server(done) {
//     const complier = webpack(rendererConfig(options.env))
//     const devServerOptions = Object.assign({}, rendererConfig(options.env).devServer)
//     const server = new WebpackDevServer(complier, devServerOptions)
//     server.listen(8080, 'localhost', () => {
//         console.log('webpack dev server start')
//     })
//     done()
// }

function watch_renderer(done) {
    const complier = webpack(rendererConfig(options.env))

    complier.watch({},(err, stats) => {
        if(stats.hasErrors()) {
            console.log('build renderer is failed.')
        }
        console.log(stats.toString({assets: true}))
        done()
    })
}

exports.build_dll = build_dll
exports.build_renderer = build_renderer
exports.build_main = build_main
exports.build = parallel(series(build_dll, build_renderer), build_main)

exports.start = start

exports.watch_renderer = watch_renderer