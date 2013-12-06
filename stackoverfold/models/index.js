/**
 * Created by lichenbo on 12/5/13.
 */

var mongoose = require('mongoose');
var config = require('../config').config;

mongoose.connect(config.db, function(err) {
    if (err) {
        console.error('Connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

require('./user');
require('./topic');
require('./reply');

exports.User= mongoose.model('User');
exports.Topic= mongoose.model('Topic');
exports.Reply= mongoose.model('Reply');
