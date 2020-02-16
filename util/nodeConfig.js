'use strict';

/**
    * @file configuration variables and constants specific to nodejs
    * @author John Butler
    * @module nodeConfig.js
*/

require('dotenv').config();

const nodeConfig = {};

nodeConfig.DEBUG = true;
nodeConfig.DEPLOYED_TO = String(process.env.DEPLOYED_TO);

// base directory
nodeConfig.BASE_DIR =
	nodeConfig.DEPLOYED_TO === 'DEVELOPMENT'
		? process.env.BASE_DIR_DEVELOPMENT
		: process.env.BASE_DIR_PRODUCTION;

// node server
nodeConfig.NODE_PORT = process.env.NODE_PORT;
// log file directory
nodeConfig.LOG_DIR = 'logs';
nodeConfig.LOG_ROTATION_CHECK = 1000 * 60 * 59;

// mongodb
nodeConfig.USE_LOCAL_DB = process.env.USE_LOCAL_DB === 'true' ? true : false;
nodeConfig.DB_CLUSTER = process.env.DB_CLUSTER;
nodeConfig.DBASE = process.env.DBASE;
nodeConfig.DB_USER = process.env.DB_USER;
nodeConfig.DB_PWD = process.env.DB_PWD;
// loading data
nodeConfig.DB_RELOAD_ON_STARTUP =
	process.env.DB_RELOAD_ON_STARTUP === 'true' ? true : false;
// test at 1 minute interval for now
nodeConfig.DB_DAILY_RELOAD_TIME_ARRAY = process.env.DB_DAILY_RELOAD_TIME.split(',');
nodeConfig.DB_CURRENT_LOAD_FILE = '2020.json';
nodeConfig.DB_CURRENT_LOAD_FILE_URL =
	'http://www.trumptwitterarchive.com/data/realdonaldtrump/2020.json';
nodeConfig.DB_CURRENT_LOAD_FILE_ARRAY = [
	'2020.json',
	'2019.json',
	'2018.json',
	'2017.json',
	'2016.json',
	'2015.json',
	'2014.json',
	'2013.json',
	'2012.json',
	'2011.json',
	'2010.json',
	'2009.json'
];

nodeConfig.TWEET_START_DATE = String(process.env.TWEET_START_DATE);

nodeConfig.TODAY = (function (startOfDay = true) {
	let _today = new Date(Date.now());
	_today.setUTCHours(startOfDay ? 0 : 23);
	_today.setUTCMinutes(startOfDay ? 0 : 59);
	_today.setUTCSeconds(startOfDay ? 0 : 59);
	_today.setUTCMilliseconds(startOfDay ? 0 : 999);
	return _today;
})();

nodeConfig.ONE_YEAR_AGO = (function () {
	let aYearAgo = new Date(Date.now());
	aYearAgo.setMonth(aYearAgo.getMonth() - 12);
	aYearAgo.setUTCHours(0);
	aYearAgo.setUTCMinutes(0);
	aYearAgo.setUTCSeconds(0);
	aYearAgo.setUTCMilliseconds(0);
	return aYearAgo;
})();

module.exports = nodeConfig;
