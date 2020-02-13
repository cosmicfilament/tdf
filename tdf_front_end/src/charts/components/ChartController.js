import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { setColor } from '../../styles';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import usePersistentChart from './persistentChartState';
import ToggleSwitch from './ToggleSwitch';
import Stats from './processChartStats';
import { EtzToUtc, UtcToEtz, TWEETS_PATH, LOG_IT } from '../../shared/util/reactConfig';
import LineChart from './LineChart';
import DisplayTweetResults from './DisplayTweetResults';

// all browser instance times will be in Eastern US time zone as that is trump's hangout
// server data is all on UTC time

const ChartController = () => {
	// encapsulates the fetch request
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// result data that is returned by the fetch request
	const [ data, setData ] = useState([]);
	// search results when selecting point on chart
	const [ searchResults, displaySearchResults ] = useState([]);
	// chart state management hook
	const {
		setCurrentQuery,
		getCurrentQuery,
		setCurrentQueryName,
		defaultDaily,
		defaultWeekly,
		query
	} = usePersistentChart();
	// form state management hook
	const [ formState, inputHandler, setFormData ] = useForm(
		{
			fromDate: {
				value: getCurrentQuery().fromDate,
				isValid: true
			},
			toDate: {
				value: getCurrentQuery().toDate,
				isValid: true
			}
		},
		true
	);
	// manages the statistics that are printed at the end of the chart
	const { ProcessChartStats, sentimentStats, tweetcountStats } = Stats();
	// helpers
	const currentTemplate = query.current === 'daily' ? defaultDaily : defaultWeekly;
	const queryFromDate = getCurrentQuery().fromDate;
	const queryToDate = getCurrentQuery().toDate;

	useEffect(
		() => {
			async function init () {
				LOG_IT && console.log(`useEffect`);

				displaySearchResults('');

				setFormData(
					{
						fromDate: {
							value: queryFromDate,
							isValid: true
						},
						toDate: {
							value: queryToDate,
							isValid: true
						}
					},
					true
				);
				/* programatically updating an input kicked my ass
						until I found this snippet online, of course */
				const fromDateInput = document.getElementById('fromDate');
				const nativeInputValueSetterFrom = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetterFrom.call(fromDateInput, queryFromDate);
				const inputEventFrom = new Event('input', { bubbles: true });
				fromDateInput.dispatchEvent(inputEventFrom);
				const toDateInput = document.getElementById('toDate');
				const nativeInputValueSetterTo = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				).set;
				nativeInputValueSetterTo.call(toDateInput, queryToDate);
				const inputEventTo = new Event('input', { bubbles: true });
				toDateInput.dispatchEvent(inputEventTo);
				/* end of ass kicking */

				try {
					// server data is on UTC time so need to convert
					const params = {
						fromDate: EtzToUtc(queryFromDate),
						toDate: EtzToUtc(queryToDate, 23, 59, 59, 999)
					};
					const responseData = await sendRequest(currentTemplate.path, params);
					const response = responseData.sentiments;
					ProcessChartStats(response);

					let dataLabels = [],
						data1 = [],
						data2 = [];
					// convert response to ETZ
					response.forEach(sentiment => {
						dataLabels.push(UtcToEtz(sentiment.end_date));
						data1.push(parseInt(sentiment.score));
						data2.push(parseInt(sentiment.tweetsCount));
					});
					if (dataLabels.length === 1) {
						dataLabels.push('empty');
						data1.push(0);
						data2.push(0);
					}
					setData({ dataLabels, data1, data2 });
				} catch (err) {}
			}
			init();
		},
		[
			setFormData,
			sendRequest,
			ProcessChartStats,
			queryFromDate,
			queryToDate,
			currentTemplate.path
		]
	);

	const chartClickHandler = async date => {
		let params = { fromDate: EtzToUtc(date), toDate: '' };

		if (query.current === 'daily') {
			params.toDate = EtzToUtc(date, 23, 59, 59, 999);
		}
		else {
			let _toDate = new Date(date);
			_toDate.setDate(_toDate.getDate() + 6);
			params.toDate = EtzToUtc(_toDate, 23, 59, 59, 999);
		}

		try {
			const responseData = await sendRequest(TWEETS_PATH(), params);

			const tweets = responseData.tweets;
			displaySearchResults(tweets);
		} catch (error) {
			console.log(`error in chartClickHandler: ${error}`);
		}
	};

	const chartsSubmitHandler = async event => {
		event.preventDefault();
		// server data is on UTC time so need to convert
		const params = {
			fromDate: EtzToUtc(formState.inputs.fromDate.value),
			toDate: EtzToUtc(formState.inputs.toDate.value, 23, 59, 59, 999)
		};

		try {
			const responseData = await sendRequest(currentTemplate.path, params);

			let dataLabels = [],
				data1 = [],
				data2 = [];

			const data = responseData.sentiments;
			ProcessChartStats(data);

			// convert response to ETZ
			data.forEach(sentiment => {
				dataLabels.push(UtcToEtz(sentiment.end_date));
				data1.push(parseInt(sentiment.score));
				data2.push(parseInt(sentiment.tweetsCount));
			});
			if (dataLabels.length === 1) {
				dataLabels.push('empty');
				data1.push(0);
				data2.push(0);
			}
			params && setCurrentQuery(UtcToEtz(params.fromDate), UtcToEtz(params.toDate));
			setData({ dataLabels, data1, data2 });
		} catch (error) {
			console.log(`error in chartsSubmitHandler: ${error}`);
		}
	};

	return (
		<React.Fragment>
			<Burrito>
				<ToggleSwitch setName={setCurrentQueryName} current={query.current} />
				<LineChart
					isLoading={isLoading}
					id={currentTemplate.id}
					title={currentTemplate.title}
					data={data}
					data1Label={currentTemplate.sentimentsLabel}
					data2Label={currentTemplate.tweetsLabel}
					xAxisTitle={`From ${queryFromDate} to ${queryToDate}`}
					clickHandler={chartClickHandler}
				/>
				<ErrorModal error={error} onClear={clearError} />
				<form onSubmit={chartsSubmitHandler}>
					<Input
						className='form-input'
						id='fromDate'
						type='date'
						label='From Date:'
						validators={[ VALIDATOR_REQUIRE() ]}
						errorText='Please select or enter a valid date.'
						onInput={inputHandler}
						initialValue={queryFromDate}
						initialValid={true}
						min={currentTemplate.min}
						max={currentTemplate.max}
					/>
					<Input
						className='form-input'
						id='toDate'
						type='date'
						label='To Date:'
						validators={[ VALIDATOR_REQUIRE() ]}
						errorText='Please select or enter a valid date.'
						onInput={inputHandler}
						initialValid={true}
						initialValue={queryToDate}
						min={currentTemplate.min}
						max={currentTemplate.max}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						Display Chart
					</Button>
				</form>
				<Queso color='blue'>
					{`Sentiment Stats: min: ${sentimentStats._minS}, 
						max: ${sentimentStats._maxS}, 
						mean: ${sentimentStats._meanS.toFixed(2)},
						median: ${sentimentStats._medianS.toFixed(2)},
						standard deviation: ${sentimentStats._stdDevS.toFixed(2)}`}
				</Queso>
				<Queso color='red'>
					{`Tweet Count Stats: min: ${tweetcountStats._minT}, 
						max: ${tweetcountStats._maxT}, 
						mean: ${tweetcountStats._meanT.toFixed(2)},
						median: ${tweetcountStats._medianT.toFixed(2)},
					standard deviation: ${tweetcountStats._stdDevT.toFixed(2)}`}
				</Queso>
				<Queso>{`Number of records: ${sentimentStats._countS}`}</Queso>
				<Guacamole>
					{searchResults.length > 0 && <DisplayTweetResults list={searchResults} />}
				</Guacamole>
			</Burrito>
		</React.Fragment>
	);
};

export default ChartController;

const Burrito = styled.section`
	margin: 2rem;
	form {
		display: flex;
		margin: 2rem .5rem 1rem;
	}
`;
const Queso = styled.h2`
	color: ${props => (props.color === 'red' ? setColor.noticeMeRed : setColor.bkgndBlue)};
	margin: 0;
`;

const Guacamole = styled.section`
	/* background-color: ${setColor.bkgndYellow}; */
	margin: 1rem;
	font-size: 2rem;
`;
