import React, {useEffect} from 'react';
import styled from 'styled-components';
import { setColor, setRem, setFont } from '../../../styles';
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
			<StyledInputWrapper className={isInvalid && 'form-control--invalid'}  fontSize={props.fontSize}>
				{(props.type !== 'checkbox' || props.labelPosition === 'left') && <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>}
				{props.type === 'checkbox' 
					?
							<StyledCheckbox
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
	display: inherit;
	font-size: ${props => props.fontSize};
	font-family: ${setFont.main};

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
	border: 2px solid ${setColor.borderClrCtrls};
	background: ${setColor.bgndClrCtrls};
	font-size: 1em;
	:hover {
		background: ${setColor.hoverGrey};
	}
`;

const StyledLabel = styled.label`
	font-weight: bold;
	font-size: 1.25em;
`;

const StyledCheckbox = styled.input`
	--webkit-appearance: none;
	appearance: none;
	position: relative;
	width: 1em;
	height: 1em;
	border: none;
	background: none;
	border: 1px solid ${setColor.borderClrCtrls};
	vertical-align: -11px;
	outline: none;
	padding: ${setRem(1)} ${setRem(1)};
	margin: ${setRem(8)};

	::before {
		content: "✔";
		position: absolute;
		font-size: 1.2em;
		right: -1px;
		top: -0.3em;
		visibility: hidden;
	}

	:checked {
		background: ${setColor.highLightbgnd};
		color: ${setColor.highLightForgnd};
	}
	:checked::before {
		visibility: visible;
	}

	:hover {
		not:checked{
			background: ${setColor.hoverGrey};
		}
		:checked{
			background: ${setColor.disabledBlack}
		}
	}

	:disabled {
		border-color: ${setColor.disabledBlack};
		background: ${setColor.disabledGrey};
		color: ${setColor.borderClrCtrls};
	}
`;
