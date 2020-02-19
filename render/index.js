var fs = require('fs')
var {shell} = require('electron')
const BrowserWindow = require('electron').remote.BrowserWindow //引入electron remote
window.onload = function () {
    var btn = this.document.querySelector('#btn')
    var doit = this.document.querySelector('#doit')
    var open = this.document.querySelector('#open')

    // 读取文件
    btn.onclick = function () {
        fs.readFile('files/list.txt', (err, data) => {
            doit.innerHTML = data
        })
    }

    // 打开新窗口
    open.onclick = function () {
        var newWindow = new BrowserWindow({
            width: 500,
            height: 300
        })

        newWindow.loadFile('list.html')
        newWindow.on('closed', () => {
            newWindow = null
        })

    }
}

// 创建右键菜单
const { remote } = require('electron')

var rightMenuTemplate = [
    {
        label: '剪切',
        accelerator: 'ctrl+x'
    },
    {
        label: '粘贴',
        accelerator: 'ctrl+v'
    }
]

var rm = remote.Menu.buildFromTemplate(rightMenuTemplate)

// 监听右键
window.addEventListener('contextmenu', function(e){
    e.preventDefault()
    rm.popup({window:remote.getCurrentWindow()})
})

// 使用shell在浏览器中打开链接
var linkDom = document.querySelector('.link')

linkDom.onclick = function(e){
    
    e.preventDefault()
    var url = linkDom.getAttribute('href')
    shell.openExternal(url)
}

//打开子窗口
document.querySelector('.openSubWindow').onclick = function(){
    window.open('https://bigma.cc')
}