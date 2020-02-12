import { useCallback } from 'react';

import createPersistedState from 'use-persisted-state';
import {
	ONE_YEAR_AGO,
	TODAY,
	ONEHOUR,
	TRUMP_TWEET_START_DATE,
	WEEKLY_SENTIMENT_PATH,
	DAILY_SENTIMENT_PATH,
	UtcToLocal,
	LOG_IT
} from '../../shared/util/reactConfig';
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
			fromDate: ONE_YEAR_AGO(),
			toDate: TODAY()
		},
		min: TRUMP_TWEET_START_DATE(),
		max: TODAY(),
		path: DAILY_SENTIMENT_PATH(),
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
			fromDate: TRUMP_TWEET_START_DATE(),
			toDate: TODAY()
		},
		min: TRUMP_TWEET_START_DATE(),
		max: TODAY(),
		path: WEEKLY_SENTIMENT_PATH(),
		errorText: 'Please select or enter a valid date.'
	};
	// persisted data is here
	const [ query, setQuery ] = usePersistentChartState({
		// limit the time that a query is valid to one hour
		timestamp: UtcToLocal(),
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
				LOG_IT && console.log(`setCurrentQuery daily`);
				setQuery({
					...query,
					timestamp: UtcToLocal(),
					daily: {
						fromDate: from,
						toDate: to
					}
				});
			}
			else {
				LOG_IT && console.log(`setCurrentQuery weekly`);
				setQuery({
					...query,
					timestamp: UtcToLocal(),
					weekly: {
						fromDate: from,
						toDate: to
					}
				});
			}
		},
		[ query, setQuery ]
	);

	const getCurrentQuery = () => {
		let queryTime = new Date(query.timestamp);
		let queryTimeNumber = queryTime.getTime();
		let currentTime = new Date(Date.now());
		const currentTimeNumber = currentTime.getTime();
		const result = currentTimeNumber - queryTimeNumber;
		// revert to default if last persist was > 1 hour
		if (Math.abs(result) > ONEHOUR()) {
			LOG_IT && console.log(`getCurrentQuery calling setQuery`);
			setQuery({
				// limit the time that a query is valid to one hour
				timestamp: UtcToLocal(),
				current: query.current,
				daily: {
					fromDate: defaultDaily.defaultQuery.fromDate,
					toDate: defaultDaily.defaultQuery.toDate
				},
				weekly: {
					fromDate: defaultWeekly.defaultQuery.fromDate,
					toDate: defaultWeekly.defaultQuery.toDate
				}
			});
			return query.current === 'weekly'
				? defaultWeekly.defaultQuery
				: defaultDaily.defaultQuery;
		}
		return query.current === 'weekly' ? query.weekly : query.daily;
	};

	const setCurrentQueryName = name => {
		setQuery({ ...query, current: name });
	};

	return {
		setCurrentQuery,
		getCurrentQuery,
		setCurrentQueryName,
		defaultDaily,
		defaultWeekly,
		query
	};
};

export default usePersistentChart;
