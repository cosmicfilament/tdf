import React from 'react';
import styled from 'styled-components';
import ChartWrapper from '../components/ChartWrapper';

const Analysis = () => {
	return (
		<React.Fragment>
			<EsplainItToMe>
				<h1>
					This site is an attempt to ascertain Donald Trump's state of mind by measuring the{' '}
					<a
						href='https://en.wikipedia.org/wiki/Sentiment_analysis'
						rel='noopener noreferrer'
						target='_blank'
					>
						sentiment
					</a>{' '}
					of his tweets and comparing that to the level of tweets generated.
				</h1>
			</EsplainItToMe>

			<DivWrapper>
				<ChartWrapper />
			</DivWrapper>
		</React.Fragment>
	);
};

export default Analysis;

const DivWrapper = styled.div`
	position: relative;
	width: 100%;
	height: auto;
`;

const EsplainItToMe = styled.div`margin: 2rem;`;
