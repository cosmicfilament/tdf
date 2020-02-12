import { useState, useCallback } from 'react';
import { min, max, mean, median, standardDeviation } from 'simple-statistics';

const Stats = () => {
	const [ sentimentStats, setSentimentStats ] = useState({
		_countS: 0,
		_minS: 0,
		_maxS: 0,
		_meanS: 0,
		_medianS: 0,
		_stdDevS: 0
	});

	const [ tweetcountStats, setTweetCountStats ] = useState({
		_minT: 0,
		_maxT: 0,
		_meanT: 0,
		_medianT: 0,
		_stdDevT: 0
	});

	const ProcessChartStats = useCallback(
		data => {
			const _countS = data.length;
			const _minS = min(data.map(item => item.score));
			const _maxS = max(data.map(item => item.score));
			const _meanS = mean(data.map(item => item.score));
			const _medianS = median(data.map(item => item.score));
			const _stdDevS = standardDeviation(data.map(item => item.score));

			const _minT = min(data.map(item => item.tweetsCount));
			const _maxT = max(data.map(item => item.tweetsCount));
			const _meanT = mean(data.map(item => item.tweetsCount));
			const _medianT = median(data.map(item => item.tweetsCount));
			const _stdDevT = standardDeviation(data.map(item => item.tweetsCount));

			setSentimentStats({
				_countS,
				_minS,
				_maxS,
				_meanS,
				_medianS,
				_stdDevS
			});

			setTweetCountStats({
				_minT,
				_maxT,
				_meanT,
				_medianT,
				_stdDevT
			});
		},
		[ setSentimentStats, setTweetCountStats ]
	);

	return { ProcessChartStats, sentimentStats, tweetcountStats };
};

export default Stats;
