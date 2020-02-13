import React from 'react';
import styled from 'styled-components';

import { setColor } from '../../styles';
import ChartController from '../components/ChartController';

const Analysis = () => {
	return (
		<React.Fragment>
			<StyledIntro>
				<h1>
					This site charts the{' '}
					<a
						href='https://en.wikipedia.org/wiki/Sentiment_analysis'
						rel='noopener noreferrer'
						target='_blank'
					>
						sentiment
					</a>{' '}
					level of @realDonaldTrump's tweets for a given length of time along with the corresponding
					amount of tweets over that interval.
				</h1>
				<h2>
					Hint: Click on any point on the graph to retrieve a list of the tweets data underlying
					that point.
				</h2>
			</StyledIntro>
			<StyledContent>
				<ChartController />
			</StyledContent>
		</React.Fragment>
	);
};

export default Analysis;

const StyledContent = styled.div`
	position: relative;
	width: 100%;
	height: auto;
`;

const StyledIntro = styled.section`
	margin: 2rem;
	a {
		font-weight: lighter;
		color: ${setColor.mainBlack};
	}
	a:link,
	a:visited {
		text-decoration: underline;
	}
	a:hover {
		font-weight: bold;
	}
`;
