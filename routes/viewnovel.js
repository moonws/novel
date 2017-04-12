/**
 * Created by Administrator on 2017/1/13.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');
var mongodb=require('mongodb')
/* GET home page. */
router.get('/', function(req, res, next) {
    var id;
    var chapter=new Number(req.query.chapter||1);
//    var chapter=12;        //每页显示12章节
//    var searchTxt=req.query.searchTxt;
    var category=req.query.category||'';

    try{
        var id=new mongodb.ObjectId(req.query.id);
        db.find('novels',{_id:id},{},function(err,cols){
            if(cols.length<=0){
                res.send('小说不存在');
            }else{
                res.render('viewnovels', {data:cols[0],category:category});
            }
        });
    }catch(ex){
        res.send('非法参数');
    };

});

module.exports = router;
