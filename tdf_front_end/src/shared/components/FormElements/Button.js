import React from 'react';
import styled from 'styled-components';
import { setColor, setFont } from '../../../styles';

const Button = props => {
	return (
		<StyledButton
			fontSize={props.fontSize || '1em'}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled || false}
		>
			{props.children}
		</StyledButton>
	);
};

export default Button;

const StyledButton = styled.button`
	font-family: ${setFont.controls};
	font-size: ${props => props.fontSize};
	padding: 0.25rem;
	border: .1rem solid ${setColor.noticeMeRed};
	border-radius: .5rem;
	background: ${setColor.noticeMeRed};
	color: ${setColor.mainWhite};
	cursor: pointer;
	text-decoration: none;
	display: inline-block;

	:focus {
		outline: none;
	}

	:hover {
		background: ${setColor.hoverNoticeMeRed};
		transform: translateY(-.2rem);
		box-shadow: 0 .4rem .8rem rgba(0, 0, 0, .2);
	}

	:active {
		border-color: ${setColor.hoverNoticeMeRed};
		transform: translateY(-.1rem);
		/*	when we click on it we decreased the shadow and made it less blurry 
			This gives the impression that the button was actually pushed down */
		box-shadow: 0 .2rem .4rem rgba(0, 0, 0, .2);
	}

	:disabled,
	:hover:disabled,
	:active:disabled {
		background: ${setColor.disabledBtnBkgnd};
		color: ${setColor.disabledBtnFgnd};
		border-color: ${setColor.disabledBtnBkgnd};
		cursor: not-allowed;
	}

	.btn--small {
		font-size: 0.8em;
	}

	.btn--big {
		font-size: 1.5em;
	}
`;
