
var express = require('express');
var router = express.Router();
var db=require('../lib/db');
var mongodb=require('mongodb');


router.get('/', function (req, res) {
    console.log('删除状态操作')
});

router.get('/deleted/:id', function (req, res) {
    var id=new mongodb.ObjectId(req.params.id);
    db.update('novels', {_id: id}, {$set: {delStatus: true}}, function (err, cols) {
        console.log(req.params.id);
        res.redirect('/manage');
    })
});

router.get('/restore/:id', function (req, res) {
    var id=new mongodb.ObjectId(req.params.id);
    db.update('novels', {_id: id}, {$set: {delStatus: false}}, function (err, cols) {
        console.log(req.params.id);
        res.redirect('/manage');
    })
});

module.exports = router;