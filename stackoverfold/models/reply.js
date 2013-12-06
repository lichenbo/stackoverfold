/**
 * Created by lichenbo on 12/5/13.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
	content: { type: String },
	topic_id: { type: ObjectId, index: true },
	author_id: { type: ObjectId },
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now },
    vote: {type:Number, default:0}

});

mongoose.model('Reply', ReplySchema);