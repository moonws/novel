var express = require('express');
var middleware = require('../middleware/index');

var router = express.Router();

//访问登陆页面
router.get('/login', middleware.checkNotLogin, function(req, res, next) {
    console.log('打开登陆页面');
    res.render('users/login', {title: "登陆"});
});

//使用post方式提交登陆信息
router.post('/login', function (req, res) {
    var user = req.body;
    user.password = md5(user.password);
    //查询数据库，找到是否有匹配的记录
    Model('User').findOne(user,function(err,user){
        if(err){
            req.flash('error',err);
            return res.redirect('/users/login');
        }
        if (user) {
            //用户登陆成功，将用户的信息保存到session中。
            req.flash('success', '登陆成功');
            req.session.user = user;
            return res.redirect('/');//注册成功后返回主页
        }
        req.flash('error','登陆失败，用户名或密码错误');
        return res.redirect('/users/login');
    });
});

//打开注册页面
router.get('/reg', middleware.checkNotLogin, function (req, res, next) {
    console.log('打开注册页面');
    res.render('users/reg', {title: "注册"});

});

//提交注册信息
router.post('/reg', function (req, res, next) {
    //就是 POST 请求信息解析过后的对象，例如我们要访问 POST 来的表单内的 name="username" 域的值，只需访问 req.body['username'] 或 req.body.username 即可。
    var user = req.body;//获得用户提交的表单信息
    if(user.password != user.repassword){
        req.flash('error','两次输入的密码不一致');
        return res.redirect('/users/reg');
    }
    //由于repassword不需要保存，所以可以删除
    delete user.repassword;
    //对密码进行md5加密
    user.password = md5(user.password);
    //得到用户的头像,根据邮箱生成头像
    user.avatar = "https://secure.gravatar.com/avatar/"+md5(user.email)+"?s=48";
    //将user对象保存到数据库中。
    new Model('User')(user).save(function(err,user){
        if(err){
            req.flash('error','注册失败');
            return res.redirect('/users/reg');
        }
        req.flash('success', '注册成功');
        req.session.user = user;//用户信息存入 session
        res.redirect('/');//注册成功后返回主页
    });
});

//注销用户登陆
router.get('/logout', function (req, res) {
    req.session.user = null;//用户信息存入 session
    req.flash('success', '用户登陆已注销');
    res.redirect('/');//注册成功后返回主页
});

function md5(val){
    return require('crypto')
        .createHash('md5')
        .update(val)
        .digest('hex');
};

module.exports = router;