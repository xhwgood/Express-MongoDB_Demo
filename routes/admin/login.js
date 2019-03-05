var express = require('express')
var md5 = require('md5-node')
var db = require('../../modules/db')

var router = express.Router() // 可使用express.Router类创建模块化、可挂载的路由句柄

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
router.use(bodyParser.json())

router.get('/', function (req, res) {
    res.render('admin/login')
})
router.post('/doLogin', function (req, res) {
    var username = req.body.username;
    var password = md5(req.body.password)
    db.find('user', {
        username,
        password
    }, function (err, data) {
        if (data.length > 0) {
            console.log('登录成功')
            // 保存用户信息
            req.session.userinfo = data[0]
            res.redirect('/admin/product')
        } else {
            // console.log('登录失败')
            res.send('<script>alert("登录失败");location.href="/admin/login"</script>')
        }
    })
})

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/admin/login')
        }
    })
})
module.exports = router