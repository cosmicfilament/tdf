'use strict';

/**
    * @file 
    * @author John Butler
    * @module loadWeeklySentiment.js
*/

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const getWeek = require('date-fns/getWeek');

const { TWEET_START_DATE, DB_RELOAD_SENTIMENT } = {
	...require('../util/nodeConfig')
};
const WeeklySentimentDB = require('../models/weeklySentiment');
const TweetDB = require('../models/tweet');
const logs = require('../util/logs');
const helpers = require('../util/helpers');

// iterate thru each week of the tweet database
// munge the text together
// call sentiment to analyze text
// store analysis

const loadWeeklySentiment = async reload => {
	if (reload) {
		try {
			logs.log('Starting to load weekly Sentiment database.', 'b', 'cyan');
			// drop the current collection cause we are reloading
			await WeeklySentimentDB.bulkWrite([
				{ deleteMany: { filter: { start_date: { $gt: '2009-05-01' } } } }
			]);
			// latest created_at date in the tweet database
			let lastTweetDate = await TweetDB.find()
				.sort({ created_at: -1 })
				.limit(1);
			lastTweetDate = new Date(lastTweetDate[0].created_at);

			const sentiments = [];
			for (
				// sunday right before dipshit started tweeting
				let firstTweetDate = new Date(TWEET_START_DATE);
				firstTweetDate <= lastTweetDate;
				firstTweetDate.setDate(firstTweetDate.getDate() + 7)
			) {
				let endOfCurrentWeek = new Date(firstTweetDate);
				endOfCurrentWeek.setDate(endOfCurrentWeek.getDate() + 6);

				let text = '';
				// find all of the tweets for the current week
				const tweets = await TweetDB.find(
					{
						created_at: {
							$gte: firstTweetDate,
							$lte: endOfCurrentWeek
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
					year: parseInt(endOfCurrentWeek.getFullYear()),
					week: getWeek(endOfCurrentWeek),
					start_date: new Date(firstTweetDate),
					end_date: endOfCurrentWeek,
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
				await WeeklySentimentDB.insertMany(sentiments);
				logs.log(
					`Weekly Sentiment database loaded with ${sentiments.length} records.`,
					'b',
					'cyan'
				);
			}
			else {
				throw 'Error validating weekly sentiments array.';
			}
		} catch (error) {
			logs.log('Error loading weekly historic sentiment data.', 'b', 'red');
			throw error;
		}
	}
	else {
		logs.log('Bypassing loading weekly Historic sentiment data.', 'b', 'blue');
	}
	return true;
};

module.exports = loadWeeklySentiment;
