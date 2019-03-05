var express = require('express')
var db = require('../../modules/db')
var fs = require('fs')
var multiparty = require('multiparty') // 图片上传模块

var router=express.Router() // 可使用express.Router类创建模块化、可挂载的路由句柄

router.get('/',function (req,res) {
    db.find('product', {}, function (err, data) {
        if (err) console.log(err)
        res.render('admin/product/index', {
            list: data
        })
    })
})
router.get('/add',function (req,res) {
    res.render('admin/product/add')
})
router.post('/doAdd',function (req,res) {
    var form = new multiparty.Form({
        uploadDir: 'upload'
    })
    form.parse(req, function (err, fields, files) {
        var title = fields.title[0]
        var price = fields.price[0]
        var fee = fields.fee[0]
        var description = fields.description[0]
        var pic = files.pic[0].path
        db.insert('product', {
            title,
            price,
            fee,
            description,
            pic
        }, function (err, data) {
            if (!err) {
                res.redirect('/admin/product')
            }
        })
    })
})
router.get('/edit',function (req,res) {
    // 获取GET传值
    var id = req.query.id
    // 在数据库查询数据
    db.find('product', {
        '_id': new db.ObjectID(id)
    }, function (err, data) {
        console.log(data)
        res.render('admin/product/edit', {
            list: data[0]
        })
    })
})
router.post('/doEdit',function (req,res) {
    var form = new multiparty.Form({
        uploadDir: 'upload'
    })
    form.parse(req, function (err, fields, files) {
        var _id = fields._id[0] // 修改的条件
        var title = fields.title[0]
        var price = fields.price[0]
        var fee = fields.fee[0]
        var description = fields.description[0]
        var originalFN = files.pic[0].originalFilename
        var pic = files.pic[0].path
        if (originalFN) {
            var setData = {
                title,
                price,
                fee,
                description,
                pic
            }
        } else { // 若没有改图片
            var setData = {
                title,
                price,
                fee,
                description
            }
            // 删除临时文件（图片）
            fs.unlink(pic, function (err) {
                if(err) console.log(err)
            })
        }
        db.update('product', {
            '_id': new db.ObjectID(_id)
        }, setData, function (err, data) {
            if (!err) {
                res.redirect('/admin/product')
            }
        })
    })
})
router.get('/delete',function (req,res) {
    // 获取ID
    var id=req.query.id
    db.del('product',{'_id':new db.ObjectID(id)},function (err) {
        if(!err){
            res.redirect('/admin/product')
        }
    })
})

module.exports=router