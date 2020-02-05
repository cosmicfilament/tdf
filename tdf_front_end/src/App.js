import React from 'react';
import Seo from './shared/util/seo';
import styled from 'styled-components';

import dump from './images/dumpsterfire.jpg';
import GlobalStyles from './shared/styles/GlobalStyles';
import Analysis from './charts/pages/Analysis';
import BannerController from './banner/BannerController';

function App () {
	return (
		<React.Fragment>
			<Seo />
			<GlobalStyles />
			<StyledApp>
				<BannerController />
				<Analysis />
			</StyledApp>
		</React.Fragment>
	);
}

export default App;

const StyledApp = styled.div`
	background-image: linear-gradient(rgba(255, 255, 225, 0.9), rgba(255, 255, 225, 0.9)),
		url(${dump});
	background-size: cover;
	height: 100vh;
	width: auto;
`;
