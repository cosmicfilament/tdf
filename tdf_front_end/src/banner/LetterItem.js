import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { setFont, setColor, setRem } from '../styles';

const LetterItem = ({ letter, index, _screenWidth, screenWidth }) => {
	console.log(`LetterItem _screenWidth: ${_screenWidth}`);

	// starts the animation at the mouth of the tweeter in chief. So uses Banner scalefunction
	// plus some offset values
	const xScaleFactor = 10 * (_screenWidth > screenWidth.tablet ? _screenWidth * 0.01 : 1.5) + 65;

	let _sizes = {};

	switch (true) {
		case _screenWidth > screenWidth.large:
			// 1200 to ...
			_sizes = {
				fontScale: 3.0,
				xScaleFactor: xScaleFactor,
				xOffSet: -30,
				end: 3.85
			};
			break;
		case _screenWidth > screenWidth.desktop && _screenWidth <= screenWidth.large: // 1024 to 1200
			_sizes = {
				fontScale: 3.0,
				xScaleFactor: xScaleFactor,
				xOffSet: -30,
				end: 3.85
			};
			break;
		case _screenWidth > screenWidth.tablet && _screenWidth <= screenWidth.desktop: // 768 to 1024
			_sizes = {
				fontScale: 2.75,
				xScaleFactor: xScaleFactor,
				xOffSet: -25,
				end: 3.65
			};
			break;
		case _screenWidth > screenWidth.phablet && _screenWidth <= screenWidth.tablet: // 480 to 768
			_sizes = {
				fontScale: 1.5,
				xScaleFactor: xScaleFactor,
				xOffSet: -15,
				end: 4
			};
			break;
		case _screenWidth > screenWidth.phone && _screenWidth <= screenWidth.phablet: // 320 to 480
			_sizes = {
				fontScale: 1.25,
				xScaleFactor: xScaleFactor,
				xOffSet: -11,
				end: 3.0
			};
			break;
		default:
			// 0 to 320
			_sizes = {
				fontScale: 1.25,
				xScaleFactor: xScaleFactor,
				xOffSet: -11,
				end: 2.75
			};
	}

	const variants = {
		kickoff: {
			opacity: 1,
			scale: 0.1 * _sizes.fontScale,
			x: _sizes.xScaleFactor,
			y: 30
		},
		firstQuarter: {
			opacity: 1,
			scale: 0.25 * _sizes.fontScale,
			x: _sizes.xScaleFactor * 1 + _sizes.xOffSet * index,
			y: 40
		},
		halfTime: {
			opacity: 1,
			scale: 0.5 * _sizes.fontScale,
			x: _sizes.xScaleFactor * 2 + _sizes.xOffSet * index,
			y: 50
		},
		thirdQuarter: {
			opacity: 1,
			scale: 0.75 * _sizes.fontScale,
			x: _sizes.xScaleFactor * 2.75 + _sizes.xOffSet * index,
			y: 40
		},
		final: {
			opacity: 1,
			scale: _sizes.fontScale,
			x: _sizes.xScaleFactor * _sizes.end + _sizes.xOffSet * index,
			y: 20
		}
	};

	return (
		<StyledLI
			style={{ position: 'absolute', top: '20px', left: `${xScaleFactor}px` }}
			variants={variants}
			transition={{ duration: 1.5, ease: 'easeInOut' }}
		>
			{letter}
		</StyledLI>
	);
};

export default LetterItem;

const StyledLI = styled(motion.li)`
	color: ${setColor.tweetBlue};
	font-family: ${setFont.mono};
	font-weight: lighter;
	list-style-type: none;
	font-size: ${setRem(16)};
	opacity: 0;
`;
