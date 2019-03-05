var express = require('express')

var router = express.Router()

// 后台的路由，所有后台处理都要经过这里
var login = require('./admin/login')
var product = require('./admin/product')
var user = require('./admin/user')

// 权限判断
router.use(function (req, res, next) {
    // console.log(req.url)
    // next()
    if (req.url == '/login' || req.url == '/login/doLogin') {
        next()
    } else {
        if (req.session.userinfo && req.session.userinfo.username !== '') { // 判断有无登录
            // router不可设置locals，app.locals是全局变量，req.app.locals表示请求的全局
            req.app.locals['userinfo'] = req.session.userinfo // 配置全局变量，可以在任何模版里使用
            next()
        } else {
            res.redirect('/admin/login')
        }
    }
})

// 配置路由
router.use('/login', login)
router.use('/product', product)
router.use('/user', user)

module.exports = router