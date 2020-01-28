import { useReducer, useCallback } from 'react';
import ChartTemplate from '../../charts/components/ChartTemplate';

/* State Changes */
//
/* 2 localStorage states loading or saving */
// loading from localstorage if previously saved query at initialize page
// or load initial from template data
// saving to localstorage when move from page or possible save interval or at key state changes on page
//
/* state changes while interacting with page */
// update from submitting new query
// update from adding a file to the chart

const chartReducer = (state, action) => {
	switch (action.type) {
		case 'NEW_ACTIVE_TEMPLATE':
			return {
				...state,
				activeTemplate: action.activeTemplate,
				activeQuery: ChartTemplate.getDailyTemplate().defaultQuery,
				dataLabels: [],
				sentimentsData: [],
				sentimentsStats: ChartTemplate.getStats(),
				tweetsData: [],
				tweetsStats: ChartTemplate.getStats(),
				timestamp: Date.now()
			};
		case 'NEW_QUERY_RESULTS':
			return {
				...state,
				activeQuery: action.chartT.activeQuery,
				dataLabels: action.chartT.dataLabels,
				sentimentsData: action.chartT.sentimentsData,
				sentimentsStats: ChartTemplate.getStats(action.chartT.sentimentsData),
				tweetsData: action.chartT.tweetsData,
				tweetsStats: ChartTemplate.getStats(action.chartT.tweetsData),
				timestamp: action.chartT.timestamp
			};
		case 'NEW_FILE_DATA':
			return {
				...state,
				fileData: action.fileData
			};
		case 'SAVE_STATE':
			return state;
		case 'LOAD_STATE':
			return state;
		default:
			return state;
	}
};

export const useChart = () => {
	const [ chartState, dispatch ] = useReducer(chartReducer, {
		activeTemplate: ChartTemplate.getDailyTemplate(),
		activeQuery: ChartTemplate.getDailyTemplate().defaultQuery,
		dataLabels: [],
		sentimentsData: [],
		sentimentsStats: ChartTemplate.getStats(),
		tweetsData: [],
		tweetsStats: ChartTemplate.getStats(),
		fileData: [],
		timestamp: Date.now()
	});

	const activeTemplateChanged = useCallback(data => {
		dispatch({
			type: 'NEW_ACTIVE_TEMPLATE',
			activeTemplate: data
		});
	}, []);

	const queryResultsChanged = useCallback(data => {
		dispatch({
			type: 'NEW_QUERY_RESULTS',
			chartT: data
		});
	}, []);

	const fileDataChanged = useCallback(data => {
		dispatch({
			type: 'NEW_FILE_DATA',
			fileData: data
		});
	}, []);

	return [
		chartState,
		activeTemplateChanged,
		queryResultsChanged,
		fileDataChanged
	];
};

export default useChart;
