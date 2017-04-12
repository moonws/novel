/**
 * Created by Administrator on 2017/1/11.
 */
var express = require('express');
var router = express.Router();
var novelThief=require('../lib/novelThief');
/* GET home page. */
router.get('/', function(req, res, next) {
//    novelThief.getPageHtml('https://www.baidu.com',function(data){
//        res.send(data);
//    });
//    novelThief.getPageHtml('http://www.qu.la',function(data){
//        res.send(data);
//    });

//    //访问所有小说的地址
//    novelThief.getAllNovelUrl(function(arr){
//        res.send(arr.join(','));
//    });
//    //访问小说名称
//    novelThief.getNovelInfo('http://www.qu.la/book/83/',function(novel){
//        res.send(JSON.stringify(novel));
//    })
    //访问某一章节信息
        novelThief.getSection('http://www.qu.la/book/83/69739.html',function(content){
        res.send(content);
    });
});

module.exports = router;
