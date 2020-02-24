var fs = require('fs')
var { shell } = require('electron')
const BrowserWindow = require('electron').remote.BrowserWindow //引入electron remote
const { dialog } = require('electron').remote
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
window.addEventListener('contextmenu', function (e) {
    e.preventDefault()
    rm.popup({ window: remote.getCurrentWindow() })
})

// 使用shell在浏览器中打开链接
var linkDom = document.querySelector('.link')

linkDom.onclick = function (e) {

    e.preventDefault()
    var url = linkDom.getAttribute('href')
    shell.openExternal(url)
}

//打开子窗口
document.querySelector('.openSubWindow').onclick = function () {
    window.open('https://bigma.cc')
}

document.querySelector('.openSubWindowMessage').onclick = function () {
    window.open('./sub.html')

}

window.addEventListener('message', function (res) {
    document.querySelector('.subWindowMessage').innerHTML = JSON.stringify(res.data)
})

// 打开文件窗口
var loadImgBtn = document.querySelector('#loadImg')
loadImgBtn.onclick = function () {
    dialog.showOpenDialog({
        title: '选择图片', //窗口的title
        defaultPath: 'zhubaba.jpg', //默认选择的文件
        buttonLabel: '打开猪爸爸', //自定义窗口打开按钮的文字
        filters: [ //过滤器
            { name: 'img', extensions: ['jpg'] }
        ]
    }).then(res => {
        console.log(res)
        document.querySelector('.imgBox').setAttribute('src', res.filePaths[0])
    }).catch(err => {
        console.log(err)
    })
}

// 保存按钮
var saveBtn = document.querySelector('#saveBtn')
saveBtn.onclick = () => {
    dialog.showSaveDialog({
        title: '保存文件',
        defaultPath: 'text.txt', //默认选择的文件
        filters: [ //过滤器
            { name: 'txt', extensions: ['txt'] }
        ]
    }).then(res => {
        console.log(res)
        fs.writeFileSync(res.filePath, 'test text')
    }).catch(err => {
        console.log(err)
    })
}

// 消息对话框
var messageBtn = document.querySelector('#messageBtn')
messageBtn.onclick = () => {
    dialog.showMessageBox({
        type:'warning', // 图标样式 none、info、error、question和warning
        title: '您确定吗？',
        message:'删除一条消息',
        buttons:['不删了', '没问题！'] //按钮数组
    }).then(res => {
        console.log(res.response) //按钮的数组下标
    }).catch(err => {
        console.log(err)
    })
}
