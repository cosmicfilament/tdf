import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import { min, max, mean, median, standardDeviation } from 'simple-statistics';

import { setRem } from '../../styles';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import LineChart from './LineChart';

const ChartWrapper = ({ currentQuery, setCurrentQuery, currentTemplate }) => {
	// encapsulates the fetch request
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// data returned by the fetch to the server
	const [ data, setData ] = useState([]);
	// chart state

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
	// hook that maintains the form state
	const [ formState, inputHandler, setFormData ] = useForm(
		{
			fromDate: {
				value: currentTemplate.fromDate,
				isValid: true
			},
			toDate: {
				value: currentTemplate.toDate,
				isValid: true
			}
		},
		true
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
		[ setCurrentQuery ]
	);

	useEffect(
		() => {
			async function init () {
				try {
					setFormData(
						{
							fromDate: {
								value: currentTemplate.fromDate,
								isValid: true
							},
							toDate: {
								value: currentTemplate.toDate,
								isValid: true
							}
						},
						true
					);
					const responseData = await sendRequest(
						currentTemplate.path,
						currentQuery
					);
					processResponse(responseData, null);
				} catch (err) {}
			}
			init();
		},
		[ processResponse, sendRequest, setFormData, currentTemplate ]
	);

	const processStats = async data => {
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
	};
	const chartsSubmitHandler = async event => {
		event.preventDefault();
		const params = {
			fromDate: formState.inputs.fromDate.value,
			toDate: formState.inputs.toDate.value
		};

		try {
			const responseData = await sendRequest(currentTemplate.path, params);
			await processResponse(responseData, params);
		} catch (err) {}
	};

	if (isLoading) {
		return <h1>loading...</h1>;
	}

	return (
		<React.Fragment>
			<DivWrapper>
				<LineChart
					isLoading={isLoading}
					id={currentTemplate.id}
					title={currentTemplate.title}
					data={data}
					data1Label={currentTemplate.sentimentsLabel}
					data2Label={currentTemplate.tweetsLabel}
					xAxisTitle={`From ${format(
						new Date(currentTemplate.defaultQuery.fromDate),
						'MM-yyyy'
					)} to ${format(
						new Date(currentTemplate.defaultQuery.toDate),
						'MM-yyyy'
					)}`}
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
						initialValue={currentTemplate.defaultQuery.fromDate}
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
						initialValue={currentTemplate.defaultQuery.toDate}
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
