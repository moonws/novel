//保存的是数据模型，也就是user和Articles两张表的结构
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    //设置User的数据模型
    User:{
        username:{type:String,required:true},   //用户名;required是否必填
        password:{type:String,required:true},   //密码
        email:{type:String,required:true},      //邮箱//
        avatar:String      //头像
    },
};