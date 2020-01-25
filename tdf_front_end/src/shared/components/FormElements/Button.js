import React from 'react';
import styled from 'styled-components';
import { setColor, setRem, setFont } from '../../../styles';

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
	border: 1px solid ${setColor.noticeMeRed};
	border-radius: 4px;
	background: ${setColor.noticeMeRed};
	color: ${setColor.mainWhite};
	cursor: pointer;
	text-decoration: none;
	display: inline-block;

	:focus {
		outline: none;
	}

	:hover,
	:active {
		background: ${setColor.hoverNoticeMeRed};
		border-color: ${setColor.hoverNoticeMeRed};
	}

	:disabled,
	:hover:disabled,
	:active:disabled {
		background: ${setColor.disabledBgnd};
		color: ${setColor.disabledColor};
		border-color: ${setColor.disabledBgnd};
		cursor: not-allowed;
	}

	.btn--small {
		font-size: 0.8em;
	}

	.btn--big {
		font-size: 1.5em;
	}
`;
