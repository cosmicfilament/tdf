import React from 'react';
import styled from 'styled-components';

import { setColor } from '../../styles';
import ChartController from '../components/ChartController';

const Analysis = () => {
	return (
		<React.Fragment>
			<StyledIntro>
				<h1>
					This site analyzes the{' '}
					<a
						href='https://en.wikipedia.org/wiki/Sentiment_analysis'
						rel='noopener noreferrer'
						target='_blank'
					>
						sentiment
					</a>{' '}
					of @realDonaldTrump's tweets and compares that to the number of tweets generated
					in an attempt to measure the current state of his<StyledNormal> mind.</StyledNormal>
				</h1>
				<h2>
					Hint: Click on any point on the graph to retrieve a list of the tweets data
					underlying that point.
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

const StyledNormal = styled.span`
	display: inline;
	:hover {
		::before {
			content: ' crazy';
		}
	}
`;
