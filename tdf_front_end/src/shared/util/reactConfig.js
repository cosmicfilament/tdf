import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

export const LOG_IT = true;

const BASE_URL_DEVELOPMENT = 'http://localhost:5000';
const BASE_URL_PRODUCTION = 'http://twitterdumpsterfire.com:80';
// tz that chart data will be referenced from
const nyTZ = 'America/New_York';

export const BASE_URL = function () {
	return process.env.NODE_ENV === 'development'
		? BASE_URL_DEVELOPMENT
		: BASE_URL_PRODUCTION;
};

export const WEEKLY_SENTIMENT_PATH = function () {
	return '/dumpster/sentiment/weekly';
};

export const DAILY_SENTIMENT_PATH = function () {
	return '/dumpster/sentiment/daily';
};

export const TWEETS_PATH = function () {
	return '/dumpster/tweets';
};

export const UtcToEtz = function (date) {
	let result = format(new Date(date), 'yyyy-MM-dd', { timeZone: nyTZ });
	//LOG_IT && console.log(`UtcToEtz: ${result}`);
	result = result.substring(0, 10);
	return result;
};

export const UtcToLocal = function (date = Date.now(), truncate = false) {
	let result = format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
	LOG_IT && console.log(`UtcToLocal: ${result}`);
	result = truncate ? result.substring(0, 10) : result;
	return result;
};

export const EtzToUtc = function (dateString, hr = 0, min = 0, sec = 0, milli = 0) {
	let result = zonedTimeToUtc(dateString, nyTZ);
	result.setHours(hr);
	result.setMinutes(min);
	result.setSeconds(sec);
	result.setMilliseconds(milli);
	result = result.toISOString();
	LOG_IT && console.log(`EtzToUtc: ${result}`);
	return result;
};

export const TRUMP_TWEET_START_DATE = function () {
	return UtcToEtz('2009-05-03 05:00:00Z');
};

export const TODAY = () => {
	const date = new Date(Date.now());
	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);
	date.setMilliseconds(999);
	return UtcToEtz(date.toISOString());
};

export const ONE_YEAR_AGO = function () {
	let aYearAgo = utcToZonedTime(new Date(Date.now()), nyTZ);
	aYearAgo.setMonth(aYearAgo.getMonth() - 12);
	return UtcToEtz(aYearAgo);
};

export const ONEHOUR = function () {
	return 1000 * 60 * 60;
};
