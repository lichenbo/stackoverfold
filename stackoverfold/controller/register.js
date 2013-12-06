/**
 * Created by lichenbo on 12/5/13.
 */

var user = require('./user')

exports.showRegister= function(req,res) {
    res.render('../views/register.jade');
}

exports.register = function(req,res) {
    var username = req.param('username');
    var password = req.param('password');
    user.getUserByName(username,function(err,user) {
        if (err) {
            console.log('database error');
        } else if (user == null) {
            res.end("user not exist");
            user.newAndSave(username,password,function(err,user) {
                res.end('register success')
            })
        } else {
            res.end("user exist");
        }

    })
}