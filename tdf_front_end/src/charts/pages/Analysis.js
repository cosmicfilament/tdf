import React from 'react';
import styled from 'styled-components';
import ChartWrapper from '../components/ChartWrapper';
import reactConfig from '../../shared/util/reactConfig';

const Analysis = () => {
	return (
		<React.Fragment>
			<DivWrapper>
				<ChartWrapper
					id={0}
					title='Weekly Tweet Sentiment'
					label1='Sentiment'
					label2='Tweet Count'
					from={reactConfig.TRUMP_TWEET_START_DATE}
					to={reactConfig.TODAY}
					min={reactConfig.TRUMP_TWEET_START_DATE}
					max={reactConfig.TODAY}
					path={reactConfig.WEEKLY_SENTIMENT_PATH}
				/>
			</DivWrapper>
			<DivWrapper>
				<ChartWrapper
					id={1}
					title='Daily Tweet Sentiment'
					label1='Sentiment'
					label2='Tweet Count'
					from={reactConfig.ONE_YEAR_AGO}
					to={reactConfig.TODAY}
					min={reactConfig.TRUMP_TWEET_START_DATE}
					max={reactConfig.TODAY}
					path={reactConfig.DAILY_SENTIMENT_PATH}
				/>
			</DivWrapper>
		</React.Fragment>
	);
};

export default Analysis;

const DivWrapper = styled.div`
	width: 100%;
	height: 45vh;
`;
