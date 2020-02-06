import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';

import { setColor } from '../../styles';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import usePersistentChart from '../components/persistentChartState';
import ToggleSwitch from '../components/ToggleSwitch';
import Stats from '../components/processStats';

import LineChart from './LineChart';

const ChartWrapper = () => {
	// encapsulates the fetch request
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// result data that is returned by the fetch
	const [ data, setData ] = useState([]);
	// chart state management hook
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
				value: query.current === 'weekly' ? query.weekly.fromDate : query.daily.fromDate,
				isValid: true
			},
			toDate: {
				value: query.current === 'weekly' ? query.weekly.toDate : query.daily.toDate,
				isValid: true
			}
		},
		true
	);
	// function that uses a stats package to get the stats on the data
	const { processStats, sentimentStats, tweetcountStats } = Stats();
	// helpers
	const currentTemplate = query.current === 'daily' ? defaultDaily : defaultWeekly;
	const queryFromDate = query.current === 'weekly' ? query.weekly.fromDate : query.daily.fromDate;
	const queryToDate = query.current === 'weekly' ? query.weekly.toDate : query.daily.toDate;

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
		[ setFormData, sendRequest, processStats, queryFromDate, queryToDate, currentTemplate.path ]
	);

	const chartsSubmitHandler = async event => {
		event.preventDefault();
		const params = {
			fromDate: formState.inputs.fromDate.value,
			toDate: formState.inputs.toDate.value
		};

		try {
			const responseData = await sendRequest(currentTemplate.path, params);

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
		} catch (error) {
			console.log(`error in chartsSubmitHandler: ${error}`);
		}
	};

	return (
		<React.Fragment>
			<ToggleSwitch setName={setCurrentQueryName} current={query.current} />
			<Enchilada>
				<LineChart
					isLoading={isLoading}
					id={currentTemplate.id}
					title={currentTemplate.title}
					data={data}
					data1Label={currentTemplate.sentimentsLabel}
					data2Label={currentTemplate.tweetsLabel}
					xAxisTitle={`From ${format(new Date(queryFromDate), 'MM-yyyy')} to ${format(
						new Date(queryToDate),
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
			</Enchilada>
		</React.Fragment>
	);
};

export default ChartWrapper;

const Enchilada = styled.div`
	margin: 2rem;
	form {
		display: flex;
		margin: 1.5rem;
	}
`;
const Queso = styled.p`
	color: ${props => (props.color === 'red' ? setColor.noticeMeRed : setColor.bkgndBlue)};
	font-size: 2rem;
	font-weight: bold;
	margin: 0;
`;
