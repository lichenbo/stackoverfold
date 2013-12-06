/**
 * Created by lichenbo on 12/5/13.
 */

var Topic = require('../models').Topic
var User = require('./user')
var Reply = require('./reply')

exports.showCreate = function(req,res) {
    User.getSessionUser(req,function(err,user) {
        res.render('../views/topicCreate.jade',{user:user});
    });
}

exports.create = function(req,res) {
    var title = req.param('title');
    var content = req.param('content');
    var tag = req.param('tag');
    var topic = new Topic();
    topic.title = title;
    topic.content = content;
    topic.author_id = req.session.user_id;
    topic.tags = tag.split(' ');
    topic.save(function() {
        console.log('Topic Added');
    })
    User.getUserById(topic.author_id, function(err,user) {
        user.credit -= 3;
        user.save()
    })
    res.redirect('/')
}

exports.allTopics = function(callback) {
    Topic.find({},callback);
}

exports.getTopicById = function (id,callback) {
    Topic.findOne({_id:id},callback)
}

exports.getTopicListByUserId = function(userid,callback) {
    Topic.find({author_id:userid},callback)
}

exports.showTopic = function(req,res) {
    User.getSessionUser(req,function(err,user) {
        exports.getTopicById(req.param('topicid'), function(err,topic) {
                Reply.getReplyListByTopicId(topic._id, function(err, replyList) {
                    res.render('../views/topicShow.jade',{
                    topic: topic,
                    user: user,
                    replylist: replyList.sort(function(a,b) {
                        return (b.vote - a.vote);
                    })
                })
            })
        })
    })
}

exports.topicSearch = function(req,res) {
    var text = req.param('text')
    console.log(text)
    Topic.textSearch(text,function(err,topicList) {
        console.log(topicList.results)
        res.render('search.jade',{list:topicList.results})
    })
}
