import React from 'react';

const TweetRow = ({ item }) => {
	return (
		<div>
			<div className="tweetrow-row">
				<span className="tweetrow-text">{item.text}</span>
				<span className="tweetrow-source">
					{' '}
					Source: [{item.source}]{' '}
				</span>
				<span className="tweetrow-tweeted-on">
					{' '}
					Tweeted On: [{item.created_at}]{' '}
				</span>
				<span
					className="tweetrow-tweet-count"
					title="tweet count"
					role="img"
					aria-labelledby="emoji">
					💘 - {item.favorite_count}{' '}
				</span>
				<span
					className="tweetrow-retweets"
					title="retweets"
					role="img"
					aria-labelledby="emoji">
					🦜 - {item.retweet_count}{' '}
				</span>
				<a
					href={`https://twitter.com/realdonaldtrump/status/${item.id_str}`}
					target="_blank"
					rel="noopener noreferrer"
					title="Link to tweet">
					<button className="tweetrow-link-button">
						<span role="img" aria-labelledby="emoji">
							🔗
						</span>
					</button>
				</a>
				<hr />
			</div>
		</div>
	);
};

export default TweetRow;
