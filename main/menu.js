const { Menu, BrowserWindow } = require('electron')
var template = [
    {
        label: '文件',
        submenu: [
            {
                label: '打开新窗口',
                accelerator:'ctrl+n', //快捷键
                click: () => {
                    win = new BrowserWindow({
                        width: 500,
                        height: 500,
                        webPreferences: { nodeIntegration: true }
                    })
                    win.loadFile('list.html')
                    win.on('closed', () => {
                        win = null
                    })
                }
            },
            { label: '关闭' },
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '保存'
            },
            {
                label: '清空'
            }
        ]
    }
]

var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)