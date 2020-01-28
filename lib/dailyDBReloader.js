'use strict';

/**
    * @file loads ephemeral data on a timer once per day
    * @author John Butler
    * @module dailyDBReloader.js
*/
const { curly } = require('node-libcurl');
const { promisify } = require('util');
const { open, close, ftruncate, writeFile } = require('fs');

// fs functions converted from node callback to promises
const openFileP = promisify(open);
const closeFileP = promisify(close);
const ftruncateFileP = promisify(ftruncate);
const writeFileP = promisify(writeFile);

const logs = require('../util/logs');
const {
	BASE_DIR,
	DB_CURRENT_LOAD_FILE,
	DB_CURRENT_LOAD_FILE_URL,
	DB_DAILY_RELOAD_TIME
} = {
	...require('../util/nodeConfig')
};
const loadHistoricTweets = require('./loadHistoricTweets');
const loadWeeklySentiment = require('./loadWeeklySentiment');
const loadDailySentiment = require('./loadDailySentiment');

// gate that allows only one update to database at a time
// probably not needed as we check only once per minute
// see the runLoop
let __BLOCKED__ = false;

const dailyDBReloader = {};

dailyDBReloader.processFile = async () => {
	const { statusCode, data, headers } = await curly.get(
		DB_CURRENT_LOAD_FILE_URL
	);
	// save it to a file for restarting of the database
	await dailyDBReloader.updateLatestFile(data);
	await loadHistoricTweets(true);
	await loadWeeklySentiment(true);
	await loadDailySentiment(true);

	__BLOCKED__ = false;
};

dailyDBReloader.updateLatestFile = async data => {
	const fName = `${BASE_DIR}/rawData/${DB_CURRENT_LOAD_FILE}`;

	const fd = await openFileP(fName, 'r+');
	await ftruncateFileP(fd);
	await writeFileP(fd, data);
	await closeFileP(fd);
};

dailyDBReloader.runLoop = () => {
	setInterval(() => {
		if (!__BLOCKED__) {
			const timeToRetrieveData = new Date();
			timeToRetrieveData.setHours(
				DB_DAILY_RELOAD_TIME[0],
				DB_DAILY_RELOAD_TIME[1],
				0
			);
			const timeNow = new Date(Date.now());
			// if hour and minute match the configuration setting
			// then fetch a new file for 2020 and add it to the database
			if (
				timeToRetrieveData.getHours() === timeNow.getHours() &&
				timeToRetrieveData.getMinutes() === timeNow.getMinutes()
			) {
				// block further access while doing long running task.
				__BLOCKED__ = true;

				logs.log('loading tweet file from Trump Twitter Archive', 'b', 'cyan');
				dailyDBReloader.processFile().catch(error => {
					logs.log(`Failed to retrieve file from TTA. ${error}`, 'b', 'red');
					__BLOCKED__ = false;
				});
			}
		}
	}, 57000); //checks every 57 seconds so basically can only happen once per minute.
};

dailyDBReloader.init = () => {
	if (DB_DAILY_RELOAD_TIME) {
		logs.log('dailyDBReloader has started', 'b', 'blue');
		dailyDBReloader.runLoop();
	}
	else {
		logs.log('Bypassing dailyDBloader', 'b', 'blue');
	}
};

module.exports = dailyDBReloader;
