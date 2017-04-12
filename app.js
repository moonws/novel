var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db'); //导入db模块
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var index = require('./routes/index');
//var users = require('./routes/users');
//引入自定义模块
var install=require('./routes/install');
var admins=require('./routes/admins');
var test=require('./routes/test');
var viewnovel=require('./routes/viewnovel');
var viewsection=require('./routes/viewsection');
var appindex=require('./routes/appindex');
var users = require('./routes/users');
var manage = require('./routes/manage');
var delStatus = require('./routes/delStatus');


 //自动运行全自动获取小说功能
 var novelAuto=require('./lib/novelAuto');
 //调用，递归（自己调自己）
 novelAuto.getAllNovel();

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: settings.cookieSecret,//secret 用来防止篡改 cookie
    key: settings.db,//key 的值为 cookie 的名字
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//设定 cookie 的生存期，这里我们设置 cookie 的生存期为 30 天
    resave:true,
    saveUninitialized:true,//是否保存未初始化状态
    store: new MongoStore({ //设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免重启服务器时会话丢失
//        db: settings.db,
//        host: settings.host,
//        port: settings.port
        url: settings.url
    })
}));

app.use(flash());

//添加一个中间件，用来处理flash信息
app.use(function(req,res,next){
    //是将session中保存的flash信息复制到response对象的local属性中，这样才能在模板上显示这些信息。
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    res.locals.admins = req.session.admins;
    //调用next()放行请求.
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);//路由规则
//修改路由
app.use('/install',install);
app.use('/ajax/admins',admins);
app.use('/test',test);
app.use('/viewnovel',viewnovel);
app.use('/viewsection',viewsection);
app.use('/users',users);
app.use('/manage',manage);
app.use('/delStatus',delStatus);

app.use('/app/',appindex);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
