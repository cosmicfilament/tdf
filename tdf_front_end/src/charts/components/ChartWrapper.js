import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import { min, max, mean, median, standardDeviation } from 'simple-statistics';

import { setRem } from '../../styles';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_IGNORE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import reactConfig from '../../shared/util/reactConfig';
import LineChart from './LineChart';
import FileImporter from './FileImporter';

const ChartWrapper = props => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [
		chartInputs,
		setChartInputs
	] = useState({
		fromDate: props.from,
		toDate: props.to
	});
	const [
		fileImport,
		setFileImport
	] = useState([]);

	const [
		sentimentStats,
		setSentimentStats
	] = useState({
		_countS: 0,
		_minS: 0,
		_maxS: 0,
		_meanS: 0,
		_medianS: 0,
		_stdDevS: 0
	});

	const [
		tweetcountStats,
		setTweetCountStats
	] = useState({ _minT: 0, _maxT: 0, _meanT: 0, _medianT: 0, _stdDevT: 0 });

	const [
		data,
		setData
	] = useState([]);

	const [
		formState,
		inputHandler,
		setFormData
	] = useForm(
		{
			fromDate: {
				value: props.from,
				isValid: true
			},
			toDate: {
				value: props.to,
				isValid: true
			}
		},
		false
	);

	const processResponse = useCallback((responseData, params) => {
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
		setChartInputs({
			fromDate: params.fromDate,
			toDate: params.toDate
		});
		setData({ dataLabels, data1, data2 });
	}, []);

	useEffect(
		() => {
			async function init () {
				try {
					const params = {
						fromDate: props.from,
						toDate: props.to
					};
					setFormData(
						{
							fromDate: {
								value: props.from,
								isValid: true
							},
							toDate: {
								value: props.to,
								isValid: true
							}
						},
						false
					);
					const responseData = await sendRequest(props.path, params);
					processResponse(responseData, params);
				} catch (err) {}
			}
			init();
		},
		[
			sendRequest,
			setFormData,
			props.from,
			props.to,
			props.path,
			processResponse
		]
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
			const responseData = await sendRequest(props.path, params);
			await processResponse(responseData, params);
		} catch (err) {}
	};

	const fileImportHandler = async data => {
		console.log(JSON.stringify(data));
		setFileImport(data);
	};

	if (isLoading) {
		return (
			<div className='center'>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<React.Fragment>
			<DivWrapper>
				<LineChart
					id={props.id}
					lineChart={props.lineChart}
					title={props.title}
					data={data}
					extraData={fileImport}
					data1Label={props.label1}
					data2Label={props.label2}
					hAxisTitle={`From ${format(
						new Date(chartInputs.fromDate),
						'MM-yyyy'
					)} to ${format(new Date(chartInputs.toDate), 'MM-yyyy')}`}
				/>
				<FileImporter onFileImported={fileImportHandler} />
				<ErrorModal error={error} onClear={clearError} />
				<form onSubmit={chartsSubmitHandler}>
					{isLoading && <LoadingSpinner asOverlay />}
					<Input
						className='form-input'
						id='fromDate'
						type='date'
						label='From Date:'
						validators={[
							VALIDATOR_REQUIRE()
						]}
						errorText='Please select or enter a valid date.'
						onInput={inputHandler}
						initialValue={formState.inputs.fromDate.value}
						initialValid={true}
						min={reactConfig.TRUMP_TWEET_START_DATE}
						max={formState.inputs.toDate.value}
					/>
					<Input
						className='form-input'
						id='toDate'
						type='date'
						label='To Date:'
						validators={[
							VALIDATOR_REQUIRE()
						]}
						errorText='Please select or enter a valid date.'
						onInput={inputHandler}
						initialValid={true}
						initialValue={formState.inputs.toDate.value}
						min={reactConfig.TRUMP_TWEET_START_DATE}
						max={reactConfig.TODAY}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						Display Chart
					</Button>
					{/* <Input
						ClassName='form-toggle'
						id='toggle'
						type='checkbox'
						validators={[
							VALIDATOR_IGNORE()
						]}
						labelPosition='right'
						initialValid={true}
						label='Check'
						onInput={inputHandler}
						defaulChecked={true}
					/> */}
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
