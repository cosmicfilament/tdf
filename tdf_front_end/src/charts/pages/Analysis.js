import React from 'react';
import styled from 'styled-components';
import ChartWrapper from '../components/ChartWrapper';

const Analysis = () => {
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
				<ChartWrapper />
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
