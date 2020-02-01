import { useReducer } from 'react';
import { validate } from '../util/validators';

const CHANGE = 0;
const TOUCH = CHANGE + 1;

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
		default:
			return state;
	}
};

export const useInputHook = props => {
	const [ inputState, dispatch ] = useReducer(inputReducer, {
		value: props.initialValue || '',
		isTouched: false,
		isValid: props.initialValid || false
	});

	const changeHandler = event => {
		dispatch({
			type: CHANGE,
			value: event.target.value,
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
