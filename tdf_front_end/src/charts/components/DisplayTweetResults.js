import React from 'react';
import styled from 'styled-components';

import TweetRow from './TweetRow';

const DisplayTweetResults = ({ list }) => {
	return (
		<StyledSection>
			<span>TC: tweet count</span>
			<span>{' -- '}RT: number of retweets</span>
			<span>{' -- '}Link: link to the original tweet on Twitter.</span>
			<ol>
				{list.map((result, i) => {
					return (
						<li key={i}>
							<TweetRow item={result} />
						</li>
					);
				})}
			</ol>
		</StyledSection>
	);
};

export default DisplayTweetResults;

const StyledSection = styled.section`
	font-size: 2rem;
	> span {
		font-weight: bold;
	}

	> ol {
		margin-top: .5rem;
	}
`;
