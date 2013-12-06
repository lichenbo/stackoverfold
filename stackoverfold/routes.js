/**
 * Created by lichenbo on 12/5/13.
 */

var Site = require('./controller/site');
var Register = require('./controller/register');
var Login = require('./controller/login');
var User = require('./controller/user');
var Topic = require('./controller/topic');
var Reply = require('./controller/reply');


module.exports = function(app) {
    app.get('/',Site.index)

    app.get('/register',Register.showRegister)
    app.post('/register', Register.register)
    app.get('/login',Login.showLogin)
    app.post('/login',Login.login)
    app.get('/logout',function(req,res) {
        delete req.session.user_id;
        res.redirect('/');
    })

    app.get('/topic/create',User.checkAuth,Topic.showCreate)
    app.post('/topic/create',User.checkAuth,Topic.create)
    app.post('/topic/search',Topic.topicSearch)

    app.get('/topic/:topicid/view',User.checkAuth,Topic.showTopic)

    app.post('/topic/:topicid/reply/create',User.checkAuth,Reply.create)
    app.get('/topic/:topicid/reply/:replyid/pro', User.checkAuth, Reply.pro)
    app.get('/topic/:topicid/reply/:replyid/con', User.checkAuth, Reply.con)

    app.get('/user/:userid/view',User.checkAuth,User.showUser)
    app.post('/user/search',User.userSearch)
}