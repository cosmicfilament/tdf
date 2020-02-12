import React from 'react';
import styled from 'styled-components';

import { setColor } from '../styles';

const Footer = () => {
	return <StyledFooter>footer goes here</StyledFooter>;
};

export default Footer;

const StyledFooter = styled.footer`
	height: 5rem;
	background: ${setColor.tweetBlue};
	border: .1rem solid ${setColor.bkgndBlue};
`;
