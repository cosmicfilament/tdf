import React, { useEffect } from 'react';
import styled from 'styled-components';
import { setColor, setFont } from '../../../styles';
import useInputHook from '../../hooks/InputHook';

const Input = props => {
	const [ inputState, changeHandler, touchHandler ] = useInputHook(props);

	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(
		() => {
			onInput(id, value, isValid);
		},
		// eslint-disable-next-line
		[ id, value, isValid ]
	);

	const isInvalid = !inputState.isValid && inputState.isTouched;
	const errorText = () => <p>{props.errorText}</p>;

	return (
		<StyledInputWrapper
			className={isInvalid && 'form-control--invalid'}
			fontSize={props.fontSize || '1.75rem'}
		>
			<StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
			{props.type === 'date' ? (
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
			) : (
				<StyledInput
					id={id}
					type={props.type}
					disabled={props.disabled || false}
					placeholder={props.placeholder}
					onChange={changeHandler}
					onBlur={touchHandler}
					value={value}
				/>
			)}
			{isInvalid && errorText}
		</StyledInputWrapper>
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
	margin-right: 1rem;
	border: .3rem solid ${setColor.inputBorder};
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
