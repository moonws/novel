/**
 * Created by 这家伙 on 2017/3/8.
 */
exports.checkLogin = function(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        return res.redirect('/users/login');
    }
    next();
};

exports.checkNotLogin = function(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录!');
        return res.redirect('back');//返回之前的页面
    }
    next();
};


exports.checkAdminsLogin = function(req, res, next) {
    if (!req.session.admins) {
        req.flash('error', '管理员未登陆!');
        return res.redirect('back');//返回之前的页面
    }
    next();
};