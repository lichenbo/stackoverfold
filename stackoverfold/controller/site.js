/**
 * Created by lichenbo on 12/5/13.
 */

var User = require('./user')
var Topic = require('./topic')

exports.index = function (req,res) {
    Topic.allTopics(function(err,topiclist){
        User.getSessionUser(req,function(err,user) {
                res.render('../views/index.jade', {
                    'title': 'StackOverfold',
                    'topiclist' : topiclist,
                    'user': user
                //'taglist': taglist
                });
        })

    });

}
