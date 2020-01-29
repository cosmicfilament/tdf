import React from 'react';
import styled from 'styled-components';
//import './LoadingSpinner.css';

const LoadingSpinner = props => {
	return (
		<SpinnerWrapper>
			<Spinner />
		</SpinnerWrapper>
	);
};

export default LoadingSpinner;

const SpinnerWrapper = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(255, 255, 255, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Spinner = styled.div`
	display: inline-block;
	width: 96px;
	height: 96px;

	:after {
		content: ' ';
		display: block;
		width: 76px;
		height: 76px;
		margin: 1px;
		border-radius: 50%;
		border: 5px solid #510077;
		border-color: #510077 transparent #510077 transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
