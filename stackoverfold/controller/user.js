/**
 * Created by lichenbo on 12/5/13.
 */

var User = require('../models').User;
var Topic = require('./topic');
var Reply = require('./reply');

/* callback: function(err,user) */
exports.getUserByName = function (name, callback){
    User.findOne({username: name},callback)
}

/* callback: function(err,user) */
exports.getUserById = function (id,callback) {
    User.findOne({_id:id},callback)
}

/* callback: function(err,user) */
exports.getSessionUser = function(req,callback) {
    exports.getUserById(req.session.user_id,callback);
};

exports.newAndSave = function (name,password,callback) {
    console.log('new And save begin');
    var user = new User();
    user.username = name;
    user.password= password;
    user.save(callback);
    console.log('new and save end');
}

exports.login = function(name,password,callback) {
    User.findOne({username:name, password:password},callback)
}

exports.checkAuth = function(req,res,next) {
    if(!req.session.user_id) {
        res.render('../views/login.jade',{'info':'Please login first'});
    } else {
        next();
    }
}

exports.showUser = function (req,res) {
    User.findOne({_id:req.param("userid")}, function(err,user) {
        Topic.getTopicListByUserId(user._id,function(err, topicList) {
            Reply.getReplyListByUserId(user._id, function(err,replyList) {
                res.render('../views/userShow.jade',{
                    user:user,
                    topiclist:topicList,
                    replylist:replyList
                })
            })
        })
    });
}
exports.userSearch= function(req,res) {
    var text = req.param('text')
    console.log(text)
    User.textSearch(text,function(err,userList) {
        console.log(userList.results)
        res.render('search.jade',{list:userList.results})
    })
}