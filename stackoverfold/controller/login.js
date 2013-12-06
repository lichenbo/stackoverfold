/**
 * Created by lichenbo on 12/5/13.
 */
var user = require('./user')

exports.showLogin= function(req,res) {
    res.render('../views/login.jade');
}

exports.login = function(req,res) {
    var username = req.param('username');
    var password = req.param('password');
    user.login(username,password,function(err,user) {
        if (err) {
            console.log('database error');
        } else if (user == null) {
            res.send("user not exist or password error");
        } else {
            req.session.user_id = user._id
            res.redirect('/');
        }

    })
}