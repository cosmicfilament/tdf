'use strict';

/**
    * @file 
    * @author John Butler
    * @module 
*/

const express = require('express');
const router = express.Router();

const logs = require('../util/logs');
const TweetDB = require('../models/tweet');
const {TODAY, ONE_YEAR_AGO} = require('../util/nodeConfig');

router.get('/', (req, res) => router.paginateTweets(req, res));

router.get('/:page', (req, res) => router.paginateTweets(req, res));

// search: search string
// caseSensitive: 1 - true or 0 false
// includeRetweets: 1 - true or 0 false
// fromDate - yyyy-mm-dd
// toDate - yyyy-mm-dd
// sort: 1 - asc or -1 - desc
// limit: # of entries per page
// page: page number requested

router.paginateTweets = async (req, res) => {
	// set defaults so can be called with no query params
	const fromDate = req.query.fromDate || ONE_YEAR_AGO;
	const toDate = req.query.toDate || TODAY;
	const caseSensitive = parseInt(req.query.caseSensitive) || 0;
	const includeRetweets = parseInt(req.query.includeRetweets) || 1;

	const textSearch =
		caseSensitive === 1
			? new RegExp(req.query.search)
			: new RegExp(req.query.search, 'i');
	const SearchParams =
		includeRetweets === 1
			? {
					text: textSearch,
					created_at: {
						$gte: fromDate,
						$lte: toDate
					}
				}
			: {
					text: textSearch,
					created_at: {
						$gte: fromDate,
						$lte: toDate
					},
					is_retweet: {$eq: false}
				};

	const sort = parseInt(req.query.sort) || -1; //desc
	const limit = parseInt(req.query.limit) || 10;
	const page = parseInt(req.query.page) - 1 || 0; // zero based pages on back end
	const offset = page * limit; // offset from the first page

	const options = {
		sort: {created_at: sort},
		limit,
		offset
	};

	try {
		const count = await TweetDB.find().countDocuments(
			SearchParams,
			options
		);
		const tweets = await TweetDB.paginate(SearchParams, options);
		tweets.page = page + 1; // 1's based pages on front end
		tweets.pages = Math.ceil(count / limit);

		logs.log(
			`tweets/get: ${req.query
				.search}, caseSensitive: ${caseSensitive}, retweets: ${includeRetweets}, fromDate: ${fromDate}, toDate: ${toDate}`,
			'b',
			'green'
		);
		logs.log(
			`Page ${tweets.page} of ${count} records in ${tweets.pages} pages.`,
			'b',
			'green'
		);

		res.send({
			tweets
		});
	} catch (error) {
		logs.log(`error thrown in paginate: ${error}`, 'b', 'red');
		res.send('Query failed.');
	}
};

module.exports = router;
