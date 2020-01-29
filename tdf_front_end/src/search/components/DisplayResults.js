import React, { Fragment } from 'react';

import TweetRow from './TweetRow.js';

const DisplayResults = props => {
	const list =
		props.sortDirection === 'ascending'
			? props.results
			: [ ...props.results ].reverse();

	return (
		<Fragment>
			<span className="count">{list.length}</span>
			<ol className="display-results">
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

export default DisplayResults;
