import React from 'react';
import styled from 'styled-components';
import ChartWrapper from '../components/ChartWrapper';
import reactConfig from '../../shared/util/reactConfig';

const Analysis = () => {
	return (
		<React.Fragment>
			<EsplainItToMe>
				<h3>
					So what is this site all about? This site is an attempt to guage
					Donald Trump's state of mind by measuring the sentiment of his tweets.
					I think that by looking at the number of tweets over a given time and
					the sentiment of those tweets a lot can be gleaned from those values.
					For instance. Look at the Weekly sentiment and Tweet Count starting
					around the middle of December 2019 till now. Tweet count is
					progressing upwards and sentiment is progressing downwards. The
					impeachment trial in the Senate is obviously having a negative impact
					on his mood and it looks like he is obsessed with tweeting on it. If
					you set the From Date on the weekly sentiment to 01-01-2016, which is
					about when he became el Presidente. You see that he is consistently
					running above his median tweet level and is far above the standard
					deviation. This says to me that he has reached what I like to call the
					Bat Shit Crazy level.
				</h3>
			</EsplainItToMe>
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

const EsplainItToMe = styled.div`
	width: 75vw;
	height: auto;
	margin: 20px;
`;
