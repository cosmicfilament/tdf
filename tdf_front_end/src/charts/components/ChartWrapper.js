import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import { min, max, mean, median, standardDeviation } from 'simple-statistics';

import { setRem } from '../../styles';
import Input from '../../shared/components/FormElements/Input';
import Switch from '../../shared/components/FormElements/Switch';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import usePersistentChart from '../components/persistentChartState';
import LineChart from './LineChart';

const ChartWrapper = () => {
	// encapsulates the fetch request
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// data returned by the fetch to the server
	const [ data, setData ] = useState([]);
	// chart state
	const {
		setCurrentQuery,
		setCurrentQueryName,
		defaultDaily,
		defaultWeekly,
		query
	} = usePersistentChart();
	// hook that maintains the form state
	const [ formState, inputHandler, setFormData ] = useForm(
		{
			fromDate: {
				value:
					query.current === 'weekly'
						? query.weekly.fromDate
						: query.daily.fromDate,
				isValid: true
			},
			toDate: {
				value:
					query.current === 'weekly' ? query.weekly.toDate : query.daily.toDate,
				isValid: true
			}
		},
		true
	);
	// callback from the switch toggle
	const switchHandler = useCallback(
		(id, state) => {
			console.log(`switchHandler: id:${id} ${state}`);
			setCurrentQueryName(state === true ? 'weekly' : 'daily');
		},
		[ setCurrentQueryName ]
	);

	const [ sentimentStats, setSentimentStats ] = useState({
		_countS: 0,
		_minS: 0,
		_maxS: 0,
		_meanS: 0,
		_medianS: 0,
		_stdDevS: 0
	});

	const [ tweetcountStats, setTweetCountStats ] = useState({
		_minT: 0,
		_maxT: 0,
		_meanT: 0,
		_medianT: 0,
		_stdDevT: 0
	});

	const processStats = useCallback(
		data => {
			const _countS = data.length;
			const _minS = min(data.map(item => item.score));
			const _maxS = max(data.map(item => item.score));
			const _meanS = mean(data.map(item => item.score));
			const _medianS = median(data.map(item => item.score));
			const _stdDevS = standardDeviation(data.map(item => item.score));

			const _minT = min(data.map(item => item.tweetsCount));
			const _maxT = max(data.map(item => item.tweetsCount));
			const _meanT = mean(data.map(item => item.tweetsCount));
			const _medianT = median(data.map(item => item.tweetsCount));
			const _stdDevT = standardDeviation(data.map(item => item.tweetsCount));

			setSentimentStats({
				_countS,
				_minS,
				_maxS,
				_meanS,
				_medianS,
				_stdDevS
			});

			setTweetCountStats({
				_minT,
				_maxT,
				_meanT,
				_medianT,
				_stdDevT
			});
		},
		[ setSentimentStats, setTweetCountStats ]
	);

	const processResponse = useCallback(
		(responseData, params) => {
			let dataLabels = [],
				data1 = [],
				data2 = [];

			const data = responseData.sentiments;
			processStats(data);

			data.forEach(sentiment => {
				dataLabels.push(format(new Date(sentiment.end_date), 'MM-dd-yy'));
				data1.push(parseInt(sentiment.score));
				data2.push(parseInt(sentiment.tweetsCount));
			});
			if (dataLabels.length === 1) {
				dataLabels.push('empty');
				data1.push(0);
				data2.push(0);
			}
			params && setCurrentQuery(params.fromDate, params.toDate);
			setData({ dataLabels, data1, data2 });
		},
		[ setCurrentQuery, setData, processStats ]
	);

	const currentTemplate =
		query.current === 'daily' ? defaultDaily : defaultWeekly;
	const queryFromDate =
		query.current === 'weekly' ? query.weekly.fromDate : query.daily.fromDate;
	const queryToDate =
		query.current === 'weekly' ? query.weekly.toDate : query.daily.toDate;

	useEffect(
		() => {
			async function init () {
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

				try {
					const params = {
						fromDate: queryFromDate,
						toDate: queryToDate
					};
					const responseData = await sendRequest(currentTemplate.path, params);
					const response = responseData.sentiments;
					processStats(response);

					let dataLabels = [],
						data1 = [],
						data2 = [];

					response.forEach(sentiment => {
						dataLabels.push(format(new Date(sentiment.end_date), 'MM-dd-yy'));
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
			processStats,
			queryFromDate,
			queryToDate,
			currentTemplate.path
		]
	);

	const chartsSubmitHandler = async event => {
		event.preventDefault();
		const params = {
			fromDate: formState.inputs.fromDate.value,
			toDate: formState.inputs.toDate.value
		};

		try {
			const responseData = await sendRequest(currentTemplate.path, params);
			processResponse(responseData, params);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ToggleWrapper>
				<Switch
					id='toggle'
					labelPosition='right'
					label={
						query.current === 'daily' ? (
							'Switch to Weekly Sentiment'
						) : (
							'Switch to Daily Sentiment'
						)
					}
					onSwitch={switchHandler}
				/>
			</ToggleWrapper>
			<DivWrapper>
				<LineChart
					isLoading={isLoading}
					id={currentTemplate.id}
					title={currentTemplate.title}
					data={data}
					data1Label={currentTemplate.sentimentsLabel}
					data2Label={currentTemplate.tweetsLabel}
					xAxisTitle={`From ${format(
						new Date(queryFromDate),
						'MM-yyyy'
					)} to ${format(new Date(queryToDate), 'MM-yyyy')}`}
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
				<StatWrapper>
					{`Sentiment Stats: min: ${sentimentStats._minS}, 
						max: ${sentimentStats._maxS}, 
						mean: ${sentimentStats._meanS.toFixed(2)},
						median: ${sentimentStats._medianS.toFixed(2)},
						standard deviation: ${sentimentStats._stdDevS.toFixed(2)}`}
				</StatWrapper>
				<StatWrapper>
					{`TweetCount Stats: min: ${tweetcountStats._minT}, 
						max: ${tweetcountStats._maxT}, 
						mean: ${tweetcountStats._meanT.toFixed(2)},
						median: ${tweetcountStats._medianT.toFixed(2)},
					standard deviation: ${tweetcountStats._stdDevT.toFixed(2)}`}
				</StatWrapper>
				<StatWrapper>
					{`Number of records: ${sentimentStats._countS}`}
				</StatWrapper>
			</DivWrapper>
		</React.Fragment>
	);
};

export default ChartWrapper;

const DivWrapper = styled.div`
	margin: 20px;
	form {
		display: flex;
		margin-top: 20px;
	}
`;
const StatWrapper = styled.p`
	font-size: ${setRem(16)};
	margin: 0;
`;

const ToggleWrapper = styled.div`margin: 5px 0 5px;`;
