import React from 'react';
import { motion } from 'framer-motion';

import Logo from './Logo';
import styled from 'styled-components/macro';
import { setRem, screenWidth } from '../styles';

const Banner = ({ controls, _screenWidth }) => {
	// scales the horizontal movement of the tweeter in chief if screen is larger than tablet
	// otherwise gives small movement so as to not take up too much real estate.
	const scaleFactor = _screenWidth > screenWidth.tablet ? _screenWidth * 0.01 : 1.5;
	const _variants = {
		logo: {
			x: [
				0,
				1 * scaleFactor,
				4 * scaleFactor,
				4 * scaleFactor,
				4 * scaleFactor,
				6 * scaleFactor,
				6 * scaleFactor,
				6 * scaleFactor,
				8 * scaleFactor,
				8 * scaleFactor,
				8 * scaleFactor,
				10 * scaleFactor,
				10 * scaleFactor,
				10 * scaleFactor
			],
			y: [ 0, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0 ]
		}
	};

	return (
		<StyledMotion animate={controls} variants={_variants}>
			<Logo />
		</StyledMotion>
	);
};

export default Banner;

// constrain the width to a bit larger than the transition
// distance or else it can cause scrollbars to appear.
const StyledMotion = styled(motion.div)`
max-width: 200px;

> img {
		margin-top: ${setRem(8)};
		height: ${setRem(75)};
	}
`;
