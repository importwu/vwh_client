import {app, BrowserWindow}  from 'electron'
import path from 'path'

let win

function createWindow () {   
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      }
    })
    win.loadFile(path.resolve(__dirname, 'dist', `index.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}.html`))
  }
  
  app.whenReady().then(createWindow)

