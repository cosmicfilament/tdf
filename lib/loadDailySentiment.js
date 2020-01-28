'use strict';

/**
    * @file 
    * @author John Butler
    * @module loadDailySentiment.js
*/

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const { TWEET_START_DATE, DB_RELOAD_SENTIMENT } = {
	...require('../util/nodeConfig')
};
const DailySentimentDB = require('../models/dailySentiment');
const TweetDB = require('../models/tweet');
const logs = require('../util/logs');
const helpers = require('../util/helpers');

const loadDailySentiment = async reload => {
	if (reload) {
		try {
			logs.log('Starting to load daily Sentiment database.', 'b', 'cyan');
			// drop the current collection cause we are reloading
			await DailySentimentDB.bulkWrite([
				{ deleteMany: { filter: { end_date: { $gt: '2009-05-01' } } } }
			]);
			//
			let lastTweetDate = await TweetDB.find()
				.sort({ created_at: -1 })
				.limit(1);
			lastTweetDate = new Date(lastTweetDate[0].created_at);

			const sentiments = [];
			for (
				// sunday right before dipshit started tweeting
				let firstTweetDate = new Date(TWEET_START_DATE);
				firstTweetDate <= lastTweetDate;
				firstTweetDate.setDate(firstTweetDate.getDate() + 1)
			) {
				let tomorrow = new Date(firstTweetDate);
				tomorrow.setDate(tomorrow.getDate() + 1);

				let text = '';
				// find all of the tweets for the current day
				const tweets = await TweetDB.find(
					{
						created_at: {
							$gte: firstTweetDate,
							$lt: tomorrow
						}
					},
					{ text: 1, created_at: 1 }
				);
				for (let tweet of tweets) {
					text += tweet.text;
				}
				const tweetsCount = tweets.length;

				// score it
				let {
					score,
					comparative,
					calculation,
					tokens,
					words,
					positive,
					negative
				} = sentiment.analyze(text);
				// and push onto an array of objects
				sentiments.push({
					year: parseInt(firstTweetDate.getFullYear()),
					end_date: new Date(firstTweetDate),
					score,
					comparative,
					calculation,
					tokens,
					words,
					positive,
					negative,
					tweetsCount
				});
			}
			// store the array in the database
			if (helpers.validateArray(sentiments)) {
				await DailySentimentDB.insertMany(sentiments);
				logs.log(
					`Daily Sentiment database loaded with ${sentiments.length} records.`,
					'b',
					'cyan'
				);
			}
			else {
				throw 'Error validating daily sentiments array.';
			}
		} catch (error) {
			logs.log('Error loading daily historic sentiment data.', 'b', 'red');
			throw error;
		}
	}
	else {
		logs.log('Bypassing loading daily Historic sentiment data.', 'b', 'blue');
	}
	return true;
};

module.exports = loadDailySentiment;
