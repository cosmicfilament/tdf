import React from 'react';

const SearchInput = props => {
	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				style={{ width: props.width, margin: '.5rem' }}
				id={props.id}
				type='search'
				placeholder={props.placeholder}
				title={props.title}
				value={props.value}
				label={props.label}
				defaultValue={props.defaultValue}
				onChange={props.onChangeHandler}
			/>
		</div>
	);
};

const DateInput = props => {
	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				style={{ width: props.width, margin: '.5rem' }}
				id={props.id}
				type='date'
				placeholder={props.placeholder}
				title={props.title}
				value={props.value}
				label={props.label}
				min={props.min}
				max={props}
				defaultValue={props.defaultValue}
				onChange={props.onChangeHandler}
			/>
		</div>
	);
};

const CheckBox = props => {
	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				style={{ width: props.width, margin: '.5rem' }}
				id={props.id}
				type='checkbox'
				placeholder={props.placeholder}
				title={props.title}
				label={props.labelhandler}
				defaultChecked={props.defaultValue}
				onClick={props.onClickHandler}
			/>
		</div>
	);
};

export { SearchInput, DateInput, CheckBox };
