var electron = require('electron')

var app = electron.app
var BrowserWindow = electron.BrowserWindow

var globalShortcut = electron.globalShortcut
var {shell} = require('electron')

var mainWindow = null //声明要打开的窗口

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({width:700, 
        height:500, 
        webPreferences:{nodeIntegration:true} //全量启用node功能
    })
    // mainWindow.webContents.openDevTools() // 打开调试模式

    //在窗口嵌入页面 BrowserView
    var BrowserView = electron.BrowserView
    var view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({x:0, y:500, width:800, height:680}) //设置嵌入的位置及宽高
    view.webContents.loadURL('https://bigma.cc')

    require('./main/menu')
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', ()=>{
        mainWindow = null
    })

    // 注册全局快捷键
    globalShortcut.register('ctrl+e', ()=>{
        shell.openExternal('https://www.baidu.com')
    })

    //检查快捷键是否注册成功
    var isRegistered = globalShortcut.isRegistered('ctrl+e')
    if(isRegistered){
        console.log('Register Success!')
    }

    //注销快捷键
    app.on('will-quit', ()=>{
        globalShortcut.unregister('ctrl+e') //注销单独快捷键
        globalShortcut.unregisterAll() //注销所有快捷键
    })
})