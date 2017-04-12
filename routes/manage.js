/**
 * Created by Administrator on 2017/4/10.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');
var middleware = require('../middleware/index');


/* GET home page. */
router.get('/', middleware.checkAdminsLogin, function(req, res, next) {
    var page=new Number(req.query.page||1);
    var rows=12;        //每页显示12条
    var searchTxt=req.query.searchTxt;
    //小说名搜索，如果不存在则为空
    var reg=new RegExp('.*'+(searchTxt||'')+'.*');
    var category=req.query.category||'';
    var regCategory=new RegExp(category);
    var query={name:reg,category:regCategory,delStatus: false};
    //查询数据库中符合条件的记录数量
    db.count('novels',query,function(total){
        //判断是否需要下一页按钮
        var isNextPage=page*rows<total;
        db.find(
            'novels',       //集合名称
            query,          //条件查询
            {
                fields:{    //fields:属性集合
                    name:1,
                    author:1,
                    description:1,
                    imgUrl:1,
                    lastUpdateTime: 1
                },
                sort:{lastUpdateTime:-1},
                limit:rows,
                skip:(page-1)*rows
            },
            function(err,cols){
                //render的作用把数据（后一个参数）绑定（传递）到ejs文件（第一个参数）
                res.render('manage', {searchTxt:searchTxt,category:category,isNextPage:isNextPage,page:page,rows:cols});
            });
    });
});

router.get('/restore', middleware.checkAdminsLogin, function(req, res, next) {
    var page=new Number(req.query.page||1);
    var rows=12;        //每页显示12条
    var searchTxt=req.query.searchTxt;
    //小说名搜索，如果不存在则为空
    var reg=new RegExp('.*'+(searchTxt||'')+'.*');
    var category=req.query.category||'';
    var regCategory=new RegExp(category);
    var query={name:reg,category:regCategory,delStatus: true};
    //查询数据库中符合条件的记录数量
    db.count('novels',query,function(total){
        //判断是否需要下一页按钮
        var isNextPage=page*rows<total;
        db.find(
            'novels',       //集合名称
            query,          //条件查询
            {
                fields:{    //fields:属性集合
                    name:1,
                    author:1,
                    description:1,
                    imgUrl:1,
                    lastUpdateTime: 1
                },
                sort:{lastUpdateTime:-1},
                limit:rows,
                skip:(page-1)*rows
            },
            function(err,cols){
                //render的作用把数据（后一个参数）绑定（传递）到ejs文件（第一个参数）
                res.render('restore', {searchTxt:searchTxt,category:category,isNextPage:isNextPage,page:page,rows:cols});
            });
    });
});

module.exports = router;
