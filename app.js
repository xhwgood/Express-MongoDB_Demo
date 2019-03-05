var express = require('express')
var admin=require('./routes/admin.js')
var index=require('./routes/index')
var app = new express() // 实例化

// 保存用户信息
var session = require('express-session')
// 配置中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30 * 9999
    },
    rolling: true
}))

app.use('/upload', express.static('upload'))

// 使用ejs模版引擎，默认找view目录
app.set('view engine', 'ejs')
// 配置public目录为当前的静态资源目录
app.use(express.static('public'))

app.use('/',index)
// admin
app.use('/admin',admin)

app.listen(3001, '127.0.0.1')