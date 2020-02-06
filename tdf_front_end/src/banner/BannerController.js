import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAnimation } from 'framer-motion';

import Banner from './Banner';
import Title from './TitleController';
import styled from 'styled-components/macro';
import { setColor, maxScreenWidth } from '../styles';

const BannerController = () => {
	const [ _screenWidth, _setScreenWidth ] = useState(
		window.innerWidth <= maxScreenWidth ? window.innerWidth : maxScreenWidth
	);

	const controls = useAnimation();

	useLayoutEffect(() => {
		window.addEventListener('resize', HandleWindowResize);
		return () => {
			window.removeEventListener('resize', HandleWindowResize);
		};
	});

	const HandleWindowResize = () => {
		setTimeout(
			() =>
				_setScreenWidth(window.innerWidth <= maxScreenWidth ? window.innerWidth : maxScreenWidth),
			1500
		);
	};

	useEffect(
		() => {
			async function init () {
				await controls.start('logo');
				return await controls.start(
					('kickoff', 'firstQuarter', 'halfTime', 'thirdQuarter', 'final')
				);
			}
			init();
		},
		[ controls, _screenWidth ]
	);

	return (
		<StyledHDR>
			<Banner controls={controls} _screenWidth={_screenWidth} />
			<Title controls={controls} _screenWidth={_screenWidth} />
		</StyledHDR>
	);
};

export default BannerController;

const StyledHDR = styled.header`
	position: relative;
	height: 10rem;
	background: ${setColor.bkgndBlue};
`;
