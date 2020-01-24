'use strict';

/**
    * @file 
    * @author John Butler
    * @module dailySentiment.js
*/

const mongoose = require('mongoose');

const DailySentimentSchema = new mongoose.Schema({
	year: {
		type: Number
	},
	end_date: {
		type: Date
	},
	score: {
		type: Number
	},
	comparative: {
		type: Number
	},
	calculation: [
		{
			type: mongoose.Schema.Types.Mixed
		}
	],
	tokens: [
		{
			type: String
		}
	],
	words: [
		{
			type: String
		}
	],
	positive: [
		{
			type: String
		}
	],
	negative: [
		{
			type: String
		}
	],
	tweetsCount: {
		type: Number
	}
});

module.exports = mongoose.model('DailySentiment', DailySentimentSchema);
