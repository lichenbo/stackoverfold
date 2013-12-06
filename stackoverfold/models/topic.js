/**
 * Created by lichenbo on 12/5/13.
 */

var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
    title:{type:String},
    content:{type:String},
    author_id:{type:ObjectId},
    reply_count:{type:Number, default:0},
    visit_count:{type:Number, default:0},
    create_at: {type:Date, default:Date.now},
    last_reply:{type:ObjectId, default:null},
    last_reply_at: {type:Date, default:Date.now},
    tags: {type:[String], default:[]}
});

TopicSchema.plugin(textSearch);
TopicSchema.index({
    tags:'text',
    title:'text',
    content:'text'
});
mongoose.model('Topic',TopicSchema);