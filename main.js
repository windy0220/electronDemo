var electron = require('electron')

var app = electron.app
var BrowserWindow = electron.BrowserWindow

var mainWindow = null //声明要打开的窗口

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({width:700, 
        height:500, 
        webPreferences:{nodeIntegration:true} //全量启用node功能
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', ()=>{
        mainWindow = null
    })
})