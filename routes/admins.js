var express = require('express');
var router = express.Router();
var db=require('../lib/db');


/* GET home page. */
router.post('/', function(req, res, next) {
    //req:客户端递来的数据集合
//    body:post递来的数据
//    query:get递来的数据
    var admins = {
        loginId:req.body.loginId,       //req.body接收前端post过来的数据
        loginPass:req.body.loginPass
    };
    db.find(
        'admins',
        admins,
        {},
        function(err,cols){
            if(cols.length>0){
                req.session.admins = admins;
                res.redirect('/manage');
            }else{
                req.flash('error','登陆失败，管理员账号或密码错误');
                return res.redirect('/ajax/admins');
            }
    });
});

router.get('/', function(req, res, next) {
    res.render('admLogin');
});

router.get('/logout', function (req, res) {
    req.session.admins = null;//用户信息存入 session
    req.flash('success', '管理员登陆已注销');
    res.redirect('/');//注册成功后返回主页
});

module.exports = router;
