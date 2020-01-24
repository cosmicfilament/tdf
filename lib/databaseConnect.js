'use strict';

/**
 * @file
 * @author John Butler
 * @module
 */

const mongoose = require('mongoose');

const logs = require('../util/logs');
const { DB_USER, DB_PWD, DB_CLUSTER, DBASE } = {
	...require('../util/nodeConfig')
};

const databaseConnect = async () => {
	const options = {
		w: 'majority',
		retryWrites: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	};

	const server = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_CLUSTER}/${DBASE}`;
	logs.log(`MongoDB server is: ${server}`, 'b', 'blue');

	//`mongodb://${DB_CLUSTER}/${DBASE}`,
	await mongoose.connect(server, options).then(() => {
		logs.log(`Connected to database [${DB_CLUSTER}/${DBASE}].`, 'b', 'blue');
	});
	return true;
};

module.exports = databaseConnect;
