var express = require('express');

var router = express.Router()

var db = require('../../modules/db.js')

router.get('/', function (req, res) {
    db.find('user', {}, function (err, data) {
        if (err) console.log(err)
        res.render('admin/user/index', {
            list: data
        })
    })
})

module.exports = router