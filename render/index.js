var fs = require('fs')
const BrowserWindow = require('electron').remote.BrowserWindow //引入electron remote
window.onload = function(){
    var btn = this.document.querySelector('#btn')
    var doit = this.document.querySelector('#doit')
    var open = this.document.querySelector('#open')

    // 读取文件
    btn.onclick = function(){
        fs.readFile('files/list.txt', (err, data)=>{
            doit.innerHTML = data
        })
    }

    // 打开新窗口
    open.onclick = function(){
        var newWindow = new BrowserWindow({
            width:500,
            height:300
        })

        newWindow.loadFile('list.html')
        newWindow.on('closed',()=>{
            newWindow = null
        })

    }
}