import React, {useEffect} from 'react';
import styled from 'styled-components';
import { setColor, px2Rem, setFont } from '../../../styles';
import useInputHook from '../../hooks/InputHook'
import { VALIDATOR_IGNORE } from '../../util/validators';

const Input = (props) => {
	const [inputState, changeHandler, touchHandler] = useInputHook(props);

	const {id, onInput} = props;
	const {value, isValid} = inputState;

	useEffect(
		() => {
			onInput(id, value, isValid);
		},
		[ id, value, isValid, onInput ]
	);

	const isInvalid = !inputState.isValid && inputState.isTouched;
	const errorText = ()=><p>{props.errorText}</p>;

	return (
		<>
			<StyledInputWrapper className={isInvalid && 'form-control--invalid'}  fontSize={props.fontSize || '1em'}>
				{(props.type !== 'checkbox' || props.labelPosition === 'left') && <StyledLabel  htmlFor={props.id}>{props.label}</StyledLabel>}
				{props.type === 'checkbox' 
					?
						<ToggleSwitch>
							<ToggleInput
								id={id}
								type='checkbox'
								disabled={props.disabled || false}
								defaultChecked = {props.initialValue}
								onChange={changeHandler}
								onBlur={touchHandler}
								initialValid={true}
								validators={[VALIDATOR_IGNORE()]}
								errorText="Nothing to see here."
							/>
							<ToggleSlider />
						</ToggleSwitch>
					:
						props.type === 'date' 
							?
								<StyledInput
									id={id}
									type={props.type}
									disabled={props.disabled || false}
									placeholder={props.placeholder}
									onChange={changeHandler}
									onBlur={touchHandler}
									value={value}
									min={props.min}
									max={props.max}
								/>
							:
								<StyledInput
									id={id}
									type={props.type}
									disabled={props.disabled || false}
									placeholder={props.placeholder}
									onChange={changeHandler}
									onBlur={touchHandler}
									value={value}
								/>
				}
				{props.labelPosition === 'right' && <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>}
				{isInvalid && errorText}
			</StyledInputWrapper>
		</>
	);
};

export default Input;

const StyledInputWrapper = styled.div`
	display: inline-block;
	font-size: ${props => props.fontSize};
	font-family: ${setFont.controls};

	&.form-control--invalid label,
	&.form-control--invalid p {
		color: red;
	}

	&.form-control--invalid input,
	&.form-control--invalid textarea {
		border-color: red;
		background: #ffd1d1;
	}
`;

const StyledInput = styled.input`
	margin-right: 10px;
	border: 2px solid ${setColor.inputBorder};
	background: ${setColor.inputBkgnd};
	font-size: 1em;
	:hover {
		background: ${setColor.inputHover};
	}
`;

const StyledLabel = styled.label`
	font-weight: bold;
	font-size: 1.25em;
`;

const BaseWidth = 48;
const ToggleMultiplier = 0.625;
const BaseHeight = BaseWidth * ToggleMultiplier

const ToggleSwitch = styled.label`
	position: relative;
  display: inline-block;
  width: ${px2Rem(BaseWidth)};
  height: ${px2Rem(BaseHeight)};
	margin: 0 10px 0px;
	
	> input:hover + span {
			background-color: ${setColor.toggleHover};
	}
	> input:checked + span {
			background-color: ${setColor.toggleSelectedBlue};
	}
	> input:focus + span {
		box-shadow: 0 0 1px ${setColor.toggleSelectedBlue};
	}
	> input:checked + span:before {
  	-webkit-transform: translateX(${px2Rem(BaseHeight * ToggleMultiplier)});
  	-ms-transform: translateX(${px2Rem(BaseHeight * ToggleMultiplier)});
  	transform: translateX(${px2Rem(BaseHeight * ToggleMultiplier)});
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
  -webkit-transition: .4s;
  transition: .4s;
	border-radius: ${px2Rem(BaseHeight)};
	margin-bottom: 6px;  // change this to center vertically

	:before {
		position: absolute;
		content: "";
		height: ${px2Rem(BaseHeight * .8125)}; // can't figure out how
		width: ${px2Rem(BaseHeight * .8125)}; // to scale this number 
		left: 2px;			// very well. also need to mess with left
		bottom: 0px;
		background-color: white;
		-webkit-transition: .4s;
		transition: .4s;
		border-radius: 50%;
	}
`;
