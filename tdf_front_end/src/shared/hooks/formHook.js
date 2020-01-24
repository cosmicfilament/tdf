import { useCallback, useReducer } from 'react';

export const INPUT_CHANGED = 0;
export const SET_INPUT_DATA = INPUT_CHANGED + 1;

export const formReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGED:
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (!state.inputs[inputId]) {
					continue;
				}
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid
					}
				},
				isValid: formIsValid
			};
		case SET_INPUT_DATA:
			return {
				inputs: action.inputs,
				isValid: action.formIsValid
			};
		default:
			return state;
	}
};

export const useForm = (initialInputs, initialFormValidity) => {
	const [formState, dispatch] = useReducer(formReducer, {
		inputs: initialInputs,
		isValid: initialFormValidity
	});

	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: INPUT_CHANGED,
			value: value,
			isValid: isValid,
			inputId: id
		});
	}, []);

	const setFormData = useCallback((inputData, formValidity) => {
		dispatch({
			type: SET_INPUT_DATA,
			inputs: inputData,
			formIsValid: formValidity
		});
	}, []);

	return [formState, inputHandler, setFormData];
};
