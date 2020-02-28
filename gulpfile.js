const path = require('path')
const gulp = require('gulp')
const webpack = require('webpack')
const minimist = require('minimist')
const dllCofig = require('./configs/webpack.config.dll')
const rendererConfig = require('./configs/webpack.config.renderer')

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



exports.build_dll = build_dll

exports.build_renderer = build_renderer

exports.clean = function(done) {
    console.log(options.env)
    done()
}

