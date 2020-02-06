import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { setColor, setFont } from '../../../styles';

const Switch = props => {
	const [ state, setState ] = useState(false);
	const switchRef = useRef();

	const changeHandler = event => {
		setState(switchRef.current.checked);
	};

	const { id, onSwitch } = props;

	useEffect(
		() => {
			onSwitch(id, state);
		},
		// eslint-disable-next-line
		[ id, state ]
	);

	return (
		<StyledToggleWrapper fontSize={props.fontSize || '1em'}>
			{props.labelPosition === 'left' && (
				<StyledToggleLabel htmlFor={props.id}>{props.label}</StyledToggleLabel>
			)}
			<ToggleSwitch>
				<ToggleInput
					id={props.id}
					type='checkbox'
					disabled={props.disabled || false}
					onChange={changeHandler}
					ref={switchRef}
				/>
				<ToggleSlider />
			</ToggleSwitch>
			{props.labelPosition === 'right' && (
				<StyledToggleLabel htmlFor={props.id}>{props.label}</StyledToggleLabel>
			)}
		</StyledToggleWrapper>
	);
};

export default Switch;

const StyledToggleWrapper = styled.div`
	display: inline-block;
	font-size: ${props => props.fontSize * 2};
	font-family: ${setFont.controls};
`;

const StyledToggleLabel = styled.label`
	font-weight: bold;
	font-size: 2em;
	vertical-align: bottom;
`;

const BaseWidth = 5;
const ToggleMultiplier = 0.625;
const BaseHeight = BaseWidth * ToggleMultiplier;

const ToggleSwitch = styled.label`
	position: relative;
  display: inline-block;
  width: ${BaseWidth}rem;
	height: ${BaseHeight}rem;
	margin: 0 1rem 0;
	
	> input:hover + span {
			/* background-color: ${setColor.toggleHover}; */
			transform: translateX(-2px);
			/* 	0 X direction, 10px Y direction 20px blur and color black at .2 opacity */
			box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
	}
	> input:checked + span {
			background-color: ${setColor.toggleSelectedBlue};
	}
	> input:focus + span {
		box-shadow: 0 0 1px ${setColor.toggleSelectedBlue};
	}
	> input:checked + span:before {
  	transform: translateX(${BaseHeight * ToggleMultiplier}rem);
}
`;

const ToggleInput = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;

const ToggleSlider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${setColor.toggleBkgnd};
	transition: .4s;
	border-radius: ${BaseHeight}rem;
	margin-bottom: .6rem; // change this to center vertically

	:before {
		position: absolute;
		content: "";
		height: ${BaseHeight * 0.8125}rem; // can't figure out how
		width: ${BaseHeight * 0.8125}rem; // to scale this number
		left: 2px; // very well. also need to mess with left
		bottom: 0;
		background-color: white;
		transition: .2s steps(1, jump-end);
		border-radius: 50%;
	}
`;
