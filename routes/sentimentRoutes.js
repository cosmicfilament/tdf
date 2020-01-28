'use strict';

/**
    * @file 
    * @author John Butler
    * @module 
*/

const express = require('express');
const router = express.Router();

const logs = require('../util/logs');
const helpers = require('../util/helpers');
const WeeklySentimentDB = require('../models/weeklySentiment');
const DailySentimentDB = require('../models/dailySentiment');
const { TODAY, ONE_YEAR_AGO } = require('../util/nodeConfig');

router.get('/weekly', (req, res) => router.getWeeklySentiments(req, res));
router.get('/daily', (req, res) => router.getDailySentiments(req, res));
// fromDate: begin range of sentiment computation
// toDate: end range of sentiment computation
// projection: document fields to include in the result
// sort - best to default to asc as this is what is quickest

router.getWeeklySentiments = async (req, res) => {
	// set defaults so that can be called with no query params
	let fromDate = req.query.fromDate || ONE_YEAR_AGO;
	let toDate = req.query.toDate || TODAY;
	fromDate += 'T00:00:00.000Z';
	toDate += 'T23:59:59.999Z';
	// fields to include in the query to database
	const projection = helpers.validateString(req.query.fields)
		? String(req.query.fields).replace(',', ' ')
		: '';

	const searchParams = {
		start_date: { $gte: fromDate },
		end_date: { $lte: toDate }
	};

	const sort = parseInt(req.query.sort) || 1;
	const options = {
		sort: { end_date: sort },
		lean: true
	};

	try {
		const sentiments = await WeeklySentimentDB.find(
			searchParams,
			projection,
			options
		).catch(error => {
			console.log(error);
		});
		logs.log(
			`Weekly get returned: ${sentiments.length} records for query: ${fromDate}:${toDate}.`,
			'b',
			'green'
		);
		res.send({ sentiments });
	} catch (error) {
		logs.log(`error thrown in weekly sentiments get: ${error}, 'b','red`);
		res.send('Query failed.');
	}
};

router.getDailySentiments = async (req, res) => {
	// set defaults so that can be called with no query params
	let fromDate = req.query.fromDate || ONE_YEAR_AGO;
	let toDate = req.query.toDate || TODAY;
	fromDate += 'T00:00:00.000Z';
	toDate += 'T23:59:59.999Z';
	// fields to include in the query to database
	const projection = helpers.validateString(req.query.fields)
		? String(req.query.fields).replace(',', ' ')
		: '';

	const searchParams = {
		end_date: { $gte: fromDate, $lte: toDate }
	};

	const sort = parseInt(req.query.sort) || 1;
	const options = {
		sort: { end_date: sort },
		lean: true
	};

	try {
		const sentiments = await DailySentimentDB.find(
			searchParams,
			projection,
			options
		).catch(error => {
			console.log(error);
		});
		logs.log(
			`Daily get returned: ${sentiments.length} records for query: ${fromDate}:${toDate}.`,
			'b',
			'green'
		);
		res.send({ sentiments });
	} catch (error) {
		logs.log(`error thrown in daily sentiments get: ${error}, 'b','red`);
		res.send('Query failed.');
	}
};

module.exports = router;
