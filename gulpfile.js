const path = require('path')
const {spawn} = require('child_process')
const {parallel} = require('gulp')
const webpack = require('webpack')
const minimist = require('minimist')
const dllCofig = require('./configs/webpack.config.dll')
const rendererConfig = require('./configs/webpack.config.renderer')
const mainConfig = require('./configs/webpack.config.main')

const options = minimist(process.argv.slice(2), {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'production'}
})

function build_dll(done) {
    const complier = webpack(dllCofig(options.env))

    complier.run((err, stats) => {
        if(stats.hasErrors()) {
            console.log('build app/dll/renderer.dll.js failed.')
        }
        console.log(stats.toString({assets: true}))
    })

    done()
}


function build_renderer(done) {
    const complier = webpack(rendererConfig(options.env))

    complier.run((err, stats) => {
        if(stats.hasErrors()) {
            console.log('build app/dist/index.bundle.js failed.')
        }
        console.log(stats.toString({assets: true}))
    })

    done()
}

function build_main(done) {
    const complier = webpack(mainConfig(options.env))

    complier.run((err, stats) => {
        if(stats.hasErrors()) {
            console.log('build app/main.js failed.')
        }
        console.log(stats.toString({assets: true}))
    })

    done()
}


function start(done) {
    const electron = path.resolve(__dirname, 'node_modules', '.bin', 'electron')
    const app = path.resolve(__dirname, 'app', `main.${options.env === 'development' ? 'dev' : 'prod'}.js`)
    electron_process = spawn(electron, [app], {shell: process.platform === 'win32'})
    electron_process.on('close', () => {
        console.log('exit electron app')
    })

    done()
}

exports.build_dll = build_dll

exports.build_renderer = build_renderer

exports.build_main = build_main

exports.build = parallel(build_dll, build_renderer, build_main)

exports.start = start


