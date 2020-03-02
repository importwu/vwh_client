const {app, BrowserWindow} = require('electron')
const path = require('path')

let win = null

function createWindow () {   
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.loadFile(path.resolve(__dirname, 'dist', `index.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}.html`))
  }
  
app.whenReady().then(createWindow)


