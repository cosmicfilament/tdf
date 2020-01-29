import { useReducer, useEffect } from 'react';
import { validate } from '../util/validators';

const CHANGE = 0;
const TOUCH = CHANGE + 1;
const RESET = TOUCH + 1;

const inputReducer = (state, action) => {
	switch (action.type) {
		case CHANGE:
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators)
			};
		case TOUCH: {
			return {
				...state,
				isTouched: true
			};
		}
		case RESET: {
			return {
				value: action.value,
				isTouched: action.isTouched,
				isValid: action.isValid
			};
		}
		default:
			return state;
	}
};

export const useInputHook = props => {
	const isCheckbox = props.checkbox || false;

	const [ inputState, dispatch ] = useReducer(inputReducer, {
		value: props.initialValue || '',
		isTouched: false,
		isValid: props.initialValid || isCheckbox || false
	});

	useEffect(
		() => {
			dispatch({
				type: RESET,
				value: props.initialValue,
				isTouched: false,
				isValid: true
			});
		},
		[ props.initialValue ]
	);

	const changeHandler = event => {
		dispatch({
			type: CHANGE,
			value:
				event.target.type !== 'checkbox'
					? event.target.value
					: event.target.checked,
			validators: props.validators
		});
	};

	const touchHandler = event => {
		event.preventDefault();
		dispatch({
			type: TOUCH
		});
	};

	return [ inputState, changeHandler, touchHandler ];
};

export default useInputHook;
