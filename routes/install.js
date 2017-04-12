///**
// * Created by Administrator on 2017/1/9.
// */
//var express = require('express');
//var router = express.Router();
////引入mongodb,monk;
//var mongodb=require('mongodb');
//var monk=require('monk');
//
///* GET home page. */
//router.get('/', function(req, res, next) {
//    //增加数据
//    //连接数据库
//    var db=new monk('127.0.0.1:27017/novel');
//    //获取集合
//    var cols=db.get('admins');
//    //插入数据到集合
//    cols.insert({
//        loginId:'admin',
//        loginPass:'123456'
//    })
////    res.send('数据库安装成功'+JSON.stringify(cols.find()));
//
//    res.send('数据库安装成功'+cols.length);
//});
//
//module.exports = router;


//另外一种方法
//var express = require('express');
//var router = express.Router();
//var mongodb=require('mongodb');
/* GET home page. */
//router.get('/', function(req, res, next) {
    //增加数据
    //连接数据库
//    var server = new mongodb.Server("127.0.0.1",27017,{});
//    var db=new mongodb.Db('novel',server,{})    //直接连
//    db.open(function(error,db){                 //数据库：mongotest
//        if(error) throw error;
//        db.collection('admins',{safe:true}, function(err, collection){
//            if(err){
//                console.log(err);
//            }else{
//                增
//                collection.insert({
//                    loginId:'admin',
//                    loginPass:'12345678'
//                })
//                查
//                collection.find({loginPass:'12345678'}).toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                });
//                //条件查询
//                var ObjectID = require('mongodb').ObjectID;
//                collection.find({_id:ObjectID('58733fe36b471911a441c044')}).toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                });
                //增
//                 collection.insert({
//                     loginId:'admin2',
//                     loginPass:'123456'
//                 });
//
//                collection.insert({
//                    loginId:'admin3',
//                    loginPass:'888888'
//                })
//                var ObjectID = mongodb.ObjectID;
                //改，一般第二个参数是查询出来的对象作为修改值递进去
//                collection.update(
//                    {_id:ObjectID('5873418ec3c7c7157045803a')},
//                    {
//                        loginId:'admin888',
//                        loginPass:'654321'
//                    }
//                );

                //删
//                collection.remove({_id:ObjectID('58733fd36b471911a441c041')});
//                collection.remove({_id:ObjectID('58733fe06b471911a441c042')});
//                //改
//                collection.update(
//                {_id:ObjectID('58733fe36b471911a441c044')},
//                {
//                    loginId:'admin6',
//                    loginPass:'666666'
//                }
//                );
//
//                //查
//                collection.find().toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                });
                //模糊查询:{loginId:{$regex:/.*88.*/i}}或者{loginId:{$regex:'88'}}
//                collection.find({loginId:{$regex:/.*88.*/i}}).toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                })
//                collection.find({loginId:{$regex:'88'}}).toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                })
                //limit()与skip()
//                collection.find().limit(3).toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                });
//                collection.find().limit(3).skip(4).toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                });
//            }
//        });
//    });
////    res.send('安装成功');
//});


//module.exports = router;


///直接连自己写的数据库模块db.js
var express = require('express');
var router = express.Router();
var db=require('../lib/db')
router.get('/', function(req, res, next) {
//    db.find('admins',{},{},function(err,cols){
//        db.insert('admins',{loginId:'wusha',loginPass:'666666'},function(){
//            res.send(JSON.stringify(cols));
//
//        })
//
//    })
    db.remove('admins',{},function(){

    });
    db.insert('admins',{loginId:'admin',loginPass:'12345678'},function(){
        res.send('初始化成功');
    });

});
module.exports = router;
