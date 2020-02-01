import { useCallback } from 'react';

import createPersistedState from 'use-persisted-state';
import reactConfig from '../../shared/util/reactConfig';
// ties us into the persistent hook at this key
const usePersistentChartState = createPersistedState('tdf');

const usePersistentChart = () => {
	// this is not persisted but is constant
	const defaultDaily = {
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
	// this is not persisted but is constant
	const defaultWeekly = {
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
	// persisted data is here
	const [ query, setQuery ] = usePersistentChartState({
		current: 'daily',
		daily: {
			fromDate: defaultDaily.defaultQuery.fromDate,
			toDate: defaultDaily.defaultQuery.toDate
		},
		weekly: {
			fromDate: defaultWeekly.defaultQuery.fromDate,
			toDate: defaultWeekly.defaultQuery.toDate
		}
	});

	const setCurrentQuery = useCallback(
		(from, to) => {
			if (query.current === 'daily') {
				setQuery({
					...query,
					daily: {
						fromDate: from,
						toDate: to
					}
				});
			}
			else {
				setQuery({
					...query,
					weekly: {
						fromDate: from,
						toDate: to
					}
				});
			}
		},
		[ query, setQuery ]
	);

	const setCurrentQueryName = name => {
		setQuery({ ...query, current: name });
	};

	return {
		setCurrentQuery,
		setCurrentQueryName,
		defaultDaily,
		defaultWeekly,
		query
	};
};

export default usePersistentChart;
