const express = require('express')
const fs = require('fs')
const path = require('path')

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
const md5 = require('md5')
const appKey = '1eebd64dff87e7ea';
const key = 'AcyAlPt6WUlI3C46m0HMlhXqjY1ccol5';

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const marked = require('marked')

var translate = function () {
    var query = '你好'
    var salt = (new Date).getTime()
    var str1 = appKey + query + salt + key
    var sign = md5(str1)
    $.ajax({
        url: 'http://openapi.youdao.com/api',
        type: 'post',
        dataType: 'jsonp',
        async: false,
        data: {
            q: query,
            appKey: appKey,
            salt: salt,
            from: '',
            to: 'en',
            sign: sign
        },
        success: function (data) {
            return (data.translation[0]);
        }
    })
}

const app = express()

app.use('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use('/static', express.static('./demo/build/static'))

app.use('/service-worker.js', express.static('./demo/build/service-worker.js'))

app.get('/build', (req, res) => {
    fs.readFile('./md.json', { encoding: 'utf-8' }, (err, files) => {
        if (err) {
            res.send([])
        }
        res.send(files)
    })
})

app.post('/docs', jsonParser, (req, res) => {

    var { title, dir } = req.body
    console.log(title, dir)
    // if (!title || !dir) {
    //     res.send()
    // }
    // else {
    var path = `./md/${dir}/${title}`
    console.log(path)
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if(err) {
            console.log('err', err)
            return
        }
        // console.log(data)
        var html = marked(data)
        res.send(JSON.stringify(html))
    })
    // res.send()
    // }
})


/**
 * 处理后台管理 admin 接口请求
 * 接受参数：无
 * 返回值：md.json --md 文件夹的的所有文件名
 * title：文件夹名称
 * docs：Markdown文件名
 * eng：对应的英文名称，使用有道云翻译 API 
 */
app.get('/admin', (req, res) => {
    var ss = translate()
    var arr = []
    var index = []
    var eng = []
    // 将当前的 md 文件夹遍历，将文件名存放在 md.json 中
    if (fs.statSync('./md').isDirectory()) {
        let lists = fs.readdirSync('./md')
        // 文件夹的名字
        lists.forEach((e) => {
            let curPath = path.join('./md', e)
            if (fs.statSync(curPath).isDirectory()) {
                // md 文件的名字
                let docs = fs.readdirSync(curPath)
                docs.forEach((element) => {
                    arr.push(element)
                    arr.slice()
                    eng.push(translate(element))
                })
                index.push({ 'title': e, 'docs': arr, 'eng': eng })
                arr = []
            }
        })
    }
    // 将读取的文件夹名称保存到 md.json 中
    var msg = JSON.stringify(index)
    fs.writeFile('./md.json', msg, () => {
        fs.readFile('./md.json', { encoding: 'utf-8' }, (err, files) => {
            if (err) {
                res.send([])
            }
            res.send(files)
        })
    })
})


app.listen(3001)