'use strict';

/**
    * @file 
    * @author John Butler
    * @module weeklySentiment.js
*/

const mongoose = require('mongoose');

const WeeklySentimentSchema = new mongoose.Schema({
	year: {
		type: Number
	},
	week: {
		type: Number
	},
	start_date: {
		type: Date
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

module.exports = mongoose.model('WeeklySentiment', WeeklySentimentSchema);
