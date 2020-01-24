'use strict';

/**
    * @file nodejs server entry point
    * @author John Butler
    * @module server.js
*/

const express = require('express');
const path = require('path');
const tweetsRoutes = require('./routes/tweetsRoutes');
const sentimentRoutes = require('./routes/sentimentRoutes');
const userRoutes = require('./routes/userRoutes');

const HttpError = require('./util/http-error');
const { NODE_PORT, DB_RELOAD_ON_STARTUP, BASE_DIR } = {
	...require('./util/nodeConfig')
};
const logs = require('./util/logs');
const loadHistoricTweets = require('./lib/loadHistoricTweets');
const loadWeeklySentiment = require('./lib/loadWeeklySentiment');
const loadDailySentiment = require('./lib/loadDailySentiment');
const databaseConnect = require('./lib/databaseConnect');
const logWorker = require('./lib/logWorker');
const dailyDBReloader = require('./lib/dailyDBReloader');

const app = express();
// replaces body-parser
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false
	})
);
// CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

	next();
});
// routes
app.use('/dumpster/tweets', tweetsRoutes);
app.use('/dumpster/sentiment', sentimentRoutes);
app.use('/dumpster/user', userRoutes);

// static route
app.use(express.static(path.join(BASE_DIR, 'build')));
app.use(express.static(path.join(BASE_DIR, 'build', 'js')));
app.use(express.static(path.join(BASE_DIR, 'build', 'css')));
app.get('/*', (req, res) => {
	res.sendFile(path.join(BASE_DIR, 'build', 'index.html'));
});

// error handling
app.use((req, res, next) => {
	const error = new HttpError('404 - Page not found.', 404);
	throw error;
});

app.use((error, req, res, next) => {
	logs.log(` Error: ${error.message}`, 'b', 'red');
	return next(error);
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});

// orderly shutdown if during startup have critical failure
app.continueStartup = true;
app.shutdown = () => {
	app.continueStartup = false;
	setInterval(() => {
		process.exit(0);
	}, 1000 * 2);
};

// startup
app.Run = async () => {
	try {
		app.continueStartup && (await databaseConnect());
		app.continueStartup && logWorker.init();
		app.continueStartup && (await loadHistoricTweets(DB_RELOAD_ON_STARTUP));
		app.continueStartup && (await loadWeeklySentiment(DB_RELOAD_ON_STARTUP));
		app.continueStartup && (await loadDailySentiment(DB_RELOAD_ON_STARTUP));
		app.continueStartup && dailyDBReloader.init();
		app.continueStartup &&
			(await app.listen(NODE_PORT, () =>
				logs.log(`Server started on port ${NODE_PORT}.`, 'b', 'blue')
			));
	} catch (error) {
		logs.log(`aborting... ${error}`, 'b', 'red');
		app.shutdown();
	}
};

app.Run(app);
