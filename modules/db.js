// 数据库操作
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var url = 'mongodb://localhost:27017/'
var dbName = 'productm'

function __connectDb(cb) {
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('数据库连接失败')
            return
        }
        let db = client.db(dbName)
        // 增加、修改、删除
        cb(db, client)
        client.close()
    })
}
// 暴露ObjectID
exports.ObjectID=ObjectID

exports.find = function (collectionnm, json, cb) {
    __connectDb(function (db, client) {
        var result = db.collection(collectionnm).find(json)
        result.toArray(function (error, data) {
            client.close()
            cb(error, data) // 拿到数据，执行回调函数
        })
    })
}
// 增加数据
exports.insert = function (collectionnm, json, cb) {
    __connectDb(function (db, client) {
        db.collection(collectionnm).insertOne(json,function (error,data) {
            cb(error,data)
        })
    })
}
// 修改数据
exports.update = function (collectionnm, json1, json2, cb) {
    __connectDb(function (db, client) {
        db.collection(collectionnm).updateOne(json1,{$set:json2},function (error,data) {
            cb(error,data)
        })
    })
}
// 删除数据
exports.del = function (collectionnm, json, cb) {
    __connectDb(function (db, client) {
        db.collection(collectionnm).deleteOne(json,function (error,data) {
            cb(error,data)
        })
    })
}