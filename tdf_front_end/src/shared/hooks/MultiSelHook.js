import { useReducer } from 'react';

const selectReducer = (state, action) => {
	switch (action.type) {
		case 'IS_FOCUSED':
			return {
				...state,
				isFocused: action.isFocused
			};
		case 'IS_OPEN':
			return {
				...state,
				isOpen: action.isOpen
			};
		case 'BLUR':
			return {
				...state,
				focusedValue: action.focusedValue,
				isFocused: action.isFocused,
				isOpen: action.isOpen
			};
		case 'FOCUSED_VALUE': {
			return {
				...state,
				focusedValue: action.focusedValue
			};
		}
		case 'VALUES_ARRAY': {
			return {
				...state,
				values: action.values
			};
		}
		default:
			return state;
	}
};

const useMultiSelHook = children => {
	const [
		selectState,
		dispatch
	] = useReducer(selectReducer, {
		values: [],
		focusedValue: -1,
		isOpen: false,
		typed: '',
		isFocused: false
	});

	let _timeout = null;

	// options are the selection options in the dropdown
	const [
		..._options
	] = children;

	const clickHandler = event => {
		dispatch({
			type: 'IS_OPEN',
			isOpen: !selectState.isOpen
		});
	};

	const focusHandler = event => {
		dispatch({
			type: 'IS_FOCUSED',
			isFocused: true
		});
	};

	// close the dropdown and deselect
	const blurHandler = event => {
		dispatch({
			type: 'BLUR',
			focusedValue: -1,
			isFocused: false,
			isOpen: false
		});
	};

	const hoverOptionHandler = event => {
		// retrieves the value attribute from the dataset
		const { value } = event.currentTarget.dataset;
		const index = _options.findIndex(option => option.value === value);

		return dispatch({
			type: 'FOCUSED_VALUE',
			focusedValue: index
		});
	};

	const deleteOptionHandler = event => {
		const { value } = event.currentTarget.dataset;
		const [
			...values
		] = selectState.values;
		const index = values.indexOf(value);

		values.splice(index, 1);

		return dispatch({
			type: 'VALUES_ARRAY',
			values: values
		});
	};

	const clickOptionHandler = event => {
		const { value } = event.currentTarget.dataset;
		const [
			...values
		] = selectState.values;
		const index = values.indexOf(value);

		if (index === -1) {
			values.push(value);
		}
		else {
			values.splice(index, 1);
		}
		return dispatch({
			type: 'VALUES_ARRAY',
			values: values
		});
	};

	const keyDownHandler = event => {
		switch (event.key) {
			case ' ': {
				// space
				event.preventDefault();
				if (!selectState.isOpen) {
					return dispatch({
						type: 'IS_OPEN',
						isOpen: true
					});
				}
				// else is already open
				// either add to selection list or remove from
				if (selectState.focusedValue !== -1) {
					const value = _options[selectState.focusedValue].value;
					const [
						...values
					] = selectState.values;
					const index = values.indexOf(value);

					if (index === -1) {
						values.push(value);
					}
					else {
						values.splice(index, 1);
					}

					return dispatch({
						type: 'VALUES_ARRAY',
						values: values
					});
				}
				break;
			} // end of space clicked
			case 'Escape':
			case 'Tab': {
				if (selectState.isOpen) {
					event.preventDefault();
					return dispatch({
						type: 'IS_OPEN',
						isOpen: false
					});
				}
				break;
			} // end of Escape and Tab
			case 'Enter': {
				return dispatch({
					type: 'IS_OPEN',
					isOpen: !selectState.isOpen
				});
			} // end of Enter
			case 'ArrowDown': {
				event.preventDefault();
				let focusedValue = selectState.focusedValue;
				return dispatch({
					type: 'FOCUSED_VALUE',
					focusedValue:
						focusedValue < _options.length - 1 ? focusedValue++ : focusedValue
				});
			} // end of ArrowDown
			case 'ArrowUp': {
				event.preventDefault();
				let focusedValue = selectState.focusedValue;
				return dispatch({
					type: 'FOCUSED_VALUE',
					focusedValue: focusedValue > 0 ? focusedValue-- : focusedValue
				});
			} // end of ArrowUp
			default: {
				// begins with letter or number
				if (/^[a-z0-9]$/i.test(event.key)) {
					const char = event.key;
					// throttle the input
					clearTimeout(_timeout);
					_timeout = setTimeout(() => {
						dispatch({
							type: 'TYPED',
							focusedValue: selectState.focusedValue,
							typed: ''
						});
					}, 1000);

					const typed = selectState.typed + char;
					const re = new RegExp(`^${typed}`, 'i');
					const index = _options.findIndex(option => re.test(option.value));

					return dispatch({
						type: 'TYPED',
						focusedValue: index === -1 ? selectState.focusedValue : index,
						typed: typed
					});
				}
			} // end of default
		}
	}; // end of keyDown handler

	const stopPropagationHandler = event => {
		event.stopPropagation();
	};

	return [
		selectState,
		focusHandler,
		blurHandler,
		keyDownHandler,
		clickHandler,
		hoverOptionHandler,
		clickOptionHandler,
		deleteOptionHandler,
		stopPropagationHandler
	];
};
export default useMultiSelHook;
