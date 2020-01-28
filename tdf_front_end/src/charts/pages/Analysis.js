import React, { useState } from 'react';
import styled from 'styled-components';
import ChartWrapper from '../components/ChartWrapper';
import { VALIDATOR_IGNORE } from '../../shared/util/validators';
import { daily, weekly } from '../components/chartTemplate';
import Input from '../../shared/components/FormElements/Input';

const Analysis = () => {
	const [ chartTemplate, setChartTemplate ] = useState(daily);

	const inputHandler = (id, value, isValid) => {
		setChartTemplate(value === true ? weekly : daily);
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
			<DivWrapper>
				<ChartWrapper currentTemplate={chartTemplate} />
			</DivWrapper>
			<ControlWrapper>
				<Input
					id='toggle'
					type='checkbox'
					validators={[ VALIDATOR_IGNORE() ]}
					labelPosition='right'
					initialValid={true}
					label={
						chartTemplate.name === 'daily' ? (
							'Switch to Weekly Sentiment'
						) : (
							'Switch to Daily Sentiment'
						)
					}
					onInput={inputHandler}
				/>
			</ControlWrapper>
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

const ControlWrapper = styled.nav`margin: 5px 0 5px;`;
