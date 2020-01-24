'use strict';

/**
    * @file tweet entry schema file
    * @author John Butler
    * @module tweet.js
*/

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TweetSchema = new mongoose.Schema({
	id_str         : {
		type     : String,
		required : true,
		default  : '9999999999',
		index    : true
	},
	source         : {
		type     : String,
		required : true,
		default  : 'unknown'
	},
	created_at     : {
		type     : Date,
		required : true,
		default  : Date.now
	},
	retweet_count  : {
		type     : Number,
		required : true,
		default  : 0
	},
	favorite_count : {
		type     : Number,
		required : true,
		default  : 0
	},
	is_retweet     : {
		type     : Boolean,
		required : true,
		default  : false
	},
	text           : {
		type     : String,
		required : true,
		default  : 'empty'
	}
});

TweetSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Tweet', TweetSchema);
