/**
 *
 * Created by lichenbo on 12/5/13.
 */
var mongoose = require('mongoose');
var Reply = require('../models').Reply
var Topic = require('./topic')
var User = require('./user')


exports.create = function(req,res) {
    var topicid = req.param('topicid');
    var content = req.param('content');
    var reply = new Reply();
    reply.topic_id = mongoose.Types.ObjectId(topicid);
    reply.content = content;
    reply.author_id = req.session.user_id;
    console.log(reply)
    reply.save(function() {
        console.log('Reply Added');
    })
    User.getUserById(reply.author_id, function(err,user) {
        user.credit += 10;
        user.save()
    })
    res.redirect("../../view");
}

exports.pro = function(req,res) {
    var replyid = req.param('replyid');
    exports.getReplyById(replyid, function(err,reply) {
        reply.vote+=1;
        reply.save();
        User.getUserById(reply.author_id, function(err,user) {
            user.credit += 10;
            user.save()
        })
    })

    res.redirect('../../../view')
}
exports.con = function(req,res) {
    var replyid = req.param('replyid');
    exports.getReplyById(replyid, function(err,reply) {
        reply.vote-=1;
        reply.save();
    })
    res.redirect('../../../view')
}
/* callback: err,replyList */
exports.getReplyListByTopicId = function(topicid,callback) {
    Reply.find({topic_id:topicid},callback)
}

exports.getReplyListByUserId = function(userid,callback) {
    Reply.find({author_id:userid},callback)
}

exports.getReplyById = function(replyid,callback) {
    Reply.findOne({_id:replyid},callback);
}