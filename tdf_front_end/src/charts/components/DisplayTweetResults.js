import React, { Fragment } from 'react';
import TweetRow from './TweetRow';

const DisplayTweetResults = ({ list }) => {
	return (
		<Fragment>
			<span>Tweet Count: {list.length}</span>
			<ol>
				{list.map((result, i) => {
					return (
						<li key={i}>
							<TweetRow item={result} />
						</li>
					);
				})}
			</ol>
		</Fragment>
	);
};

export default DisplayTweetResults;
