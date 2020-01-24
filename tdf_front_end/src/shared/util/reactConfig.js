const reactConfig = {};

reactConfig.DEPLOYED_TO = 'DEPLOYED_TO_DEVELOPMENT';

reactConfig.BASE_URL_DEVELOPMENT = 'http://localhost:5000';
reactConfig.BASE_URL_PRODUCTION = 'http://twitterdumpsterfire.com:80';

reactConfig.BASE_URL =
	reactConfig.DEPLOYED_TO === 'DEPLOYED_TO_DEVELOPMENT'
		? reactConfig.BASE_URL_DEVELOPMENT
		: reactConfig.BASE_URL_PRODUCTION;

reactConfig.WEEKLY_SENTIMENT_PATH = '/dumpster/sentiment/weekly';
reactConfig.DAILY_SENTIMENT_PATH = '/dumpster/sentiment/daily';
reactConfig.TRUMP_TWEET_START = '2009-05-03 00:00:00 GMT-0400';
reactConfig.TRUMP_TWEET_START_DATE = '2009-05-03';

reactConfig.TODAY = (function () {
	let _today = new Date(Date.now()).toISOString();
	return _today.substr(0, _today.indexOf('T'));
})();

reactConfig.ONE_YEAR_AGO = (function () {
	let aYearAgo = new Date(Date.now());
	aYearAgo.setMonth(aYearAgo.getMonth() - 12);
	aYearAgo = aYearAgo.toISOString();
	return aYearAgo.substr(0, aYearAgo.indexOf('T'));
})();

export default reactConfig;
