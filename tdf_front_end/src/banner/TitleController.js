import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import uuid from 'react-uuid';

import { screenWidth } from '../styles';
import LetterItem from './LetterItem';

class ReverseSplitterRegExpinator extends RegExp {
	[Symbol.split] (str) {
		return RegExp.prototype[Symbol.split].call(this, str).reverse();
	}
}

const strName = 'Twitter Dumpster Fire'.split(new ReverseSplitterRegExpinator(/\.?/));

const Controller = ({ controls, _screenWidth }) => {
	const _variants = {
		kickoff: {
			transition: { staggerChildren: 0.15 }
		},
		firstQuarter: {
			transition: { staggerChildren: 0.15 }
		},
		halfTime: {
			transition: { staggerChildren: 0.15 }
		},
		thirdQuarter: {
			transition: { staggerChildren: 0.15 }
		},
		final: {
			transition: { staggerChildren: 0.15 }
		}
	};

	return (
		<StyledUL animate={controls} variants={_variants}>
			{strName.map((letter, index) => (
				<LetterItem
					letter={letter}
					index={index}
					key={uuid()}
					_screenWidth={_screenWidth}
					screenWidth={screenWidth}
				/>
			))}
		</StyledUL>
	);
};

export default Controller;

const StyledUL = styled(motion.ul)`
`;
