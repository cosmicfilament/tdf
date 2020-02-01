import React from 'react';
import styled from 'styled-components';
import ChartWrapper from '../components/ChartWrapper';
import { VALIDATOR_IGNORE } from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import usePersistentChart from '../components/persistentChartState';

const Analysis = () => {
	const {
		setCurrentQuery,
		setCurrentQueryName,
		defaultDaily,
		defaultWeekly,
		query
	} = usePersistentChart();

	const inputHandler = value => {
		setCurrentQueryName(value === true ? 'daily' : 'weekly');
	};

	return (
		<React.Fragment>
			<EsplainItToMe>
				<h4>
					This site is an attempt to guage Donald Trump's state of mind by
					measuring the sentiment of his tweets and comparing that to the level
					of tweets generated.
				</h4>
			</EsplainItToMe>
			<ToggleWrapper>
				<Input
					id='toggle'
					type='checkbox'
					validators={[ VALIDATOR_IGNORE() ]}
					labelPosition='right'
					label={
						query.current === 'daily' ? (
							'Switch to Weekly Sentiment'
						) : (
							'Switch to Daily Sentiment'
						)
					}
					onInput={inputHandler}
				/>
			</ToggleWrapper>
			<DivWrapper>
				{query.current === 'daily' ? (
					<ChartWrapper
						currentQuery={query.daily}
						setCurrentQuery={setCurrentQuery}
						currentTemplate={defaultDaily}
					/>
				) : (
					<ChartWrapper
						currentQuery={query.weekly}
						setCurrentQuery={setCurrentQuery}
						currentTemplate={defaultWeekly}
					/>
				)}
			</DivWrapper>
		</React.Fragment>
	);
};

export default Analysis;

const DivWrapper = styled.div`
	width: 90vw;
	height: 60vh;
`;

const EsplainItToMe = styled.div`
	width: 90vw;
	height: auto;
	margin: 20px;
`;

const ToggleWrapper = styled.div`margin: 5px 0 5px;`;
