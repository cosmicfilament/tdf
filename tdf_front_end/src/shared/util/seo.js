import React from 'react';
import { Helmet } from 'react-helmet';

const Seo = () => {
	return (
		<Helmet>
			<title>Twitter Dumpster Fire aka @realdonaldtrump&#39;s tweet sh*t storm</title>
			<meta
				name='description'
				content='Analysis of Donald Trump&#39;s tweets comparing the amount of tweets to the sentiment of the tweets.'
			/>
			<link rel='canonical' href='http://twitterdumpsterfire.com' />
			<meta property='og:locale' content='en_US' />
			<meta property='og:type' content='website' />
			<meta property='og:title' content='Twitter Dumpster Fire' />
			<meta property='og:description' content='Analysis of Donald Trump&#39;s tweets' />
			<meta property='og:url' content='http://twitterdumpsterfire.com' />
			<meta property='og:site_name' content='Twitter Dumpster Fire' />
			<meta name='twitter:card' content='summary' />
			<meta name='twitter:description' content='Twitter Dumpster Fire' />
			<meta name='twitter:title' content='Twitter Dumpster Fire' />
			<meta name='robots' content='index, follow' />
			<meta
				name='keywords'
				content='twitter, @realDonaldTrump, sentiment, tweet, impeach, Pelosi, Hillary, Biden, republicans, democrats, schiff, moscow, putin, mitch, traitor, trump, ukraine'
			/>
		</Helmet>
	);
};

export default Seo;
