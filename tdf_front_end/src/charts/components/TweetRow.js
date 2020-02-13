import React from 'react';
import styled from 'styled-components';

const TweetRow = ({ item }) => {
	return (
		<StyledRow>
			<span>{item.text}</span>
			<span> Source: [{item.source}] </span>
			<span> Tweeted On: [{item.created_at}] </span>
			<span>[TC: {item.favorite_count}] </span>
			<span>
				[RT: {item.retweet_count}]{' -- '}
			</span>
			<a
				href={`https://twitter.com/realdonaldtrump/status/${item.id_str}`}
				target='_blank'
				rel='noopener noreferrer'
				title='Link to tweet'
			>
				<button>
					<span> Link</span>
				</button>
			</a>
			<hr />
		</StyledRow>
	);
};

export default TweetRow;

const StyledRow = styled.div`
	margin-bottom: .5rem;
	> hr {
		margin-top: .5rem;
	}
`;
