import reactConfig from '../../shared/util/reactConfig';

export const daily = {
	id: 1,
	name: 'daily',
	title: 'Daily Tweet Sentiment',
	sentimentsLabel: 'Sentiment',
	tweetsLabel: 'Tweet Count',
	defaultQuery: {
		fromDate: reactConfig.ONE_YEAR_AGO,
		toDate: reactConfig.TODAY
	},
	min: reactConfig.TRUMP_TWEET_START_DATE,
	max: reactConfig.TODAY,
	path: reactConfig.DAILY_SENTIMENT_PATH,
	errorText: 'Please select or enter a valid date.'
};

export const weekly = {
	id: 0,
	title: 'Weekly Tweet Sentiment',
	name: 'weekly',
	sentimentsLabel: 'Sentiment',
	tweetsLabel: 'Tweet Count',
	defaultQuery: {
		fromDate: reactConfig.TRUMP_TWEET_START_DATE,
		toDate: reactConfig.TODAY
	},
	min: reactConfig.TRUMP_TWEET_START_DATE,
	max: reactConfig.TODAY,
	path: reactConfig.WEEKLY_SENTIMENT_PATH,
	errorText: 'Please select or enter a valid date.'
};
