/**
 * Created by lichenbo on 12/5/13.
 */

var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');

var UserSchema = new mongoose.Schema({
    username:{type:String, index:true},
    password:{type:String},
    credit: {type:Number, default:0}
});

UserSchema.plugin(textSearch);
UserSchema.index({
    username:'text'
});
mongoose.model('User',UserSchema);
