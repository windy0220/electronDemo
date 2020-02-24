var electron = require('electron')

var app = electron.app
var BrowserWindow = electron.BrowserWindow

var mainWindow = null //声明要打开的窗口

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({width:700, 
        height:500, 
        webPreferences:{nodeIntegration:true} //全量启用node功能
    })
    mainWindow.webContents.openDevTools() // 打开调试模式

    //在窗口嵌入页面 BrowserView
    var BrowserView = electron.BrowserView
    var view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({x:0, y:120, width:800, height:680}) //设置嵌入的位置及宽高
    view.webContents.loadURL('https://bigma.cc')

    require('./main/menu')
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', ()=>{
        mainWindow = null
    })
})