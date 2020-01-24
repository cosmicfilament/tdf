import React from 'react';
import styled from 'styled-components';
import { setColor } from '../../styles';

import useMultiSelHook from '../../hooks/MultiSelHook';

const DropdownSelect = props => {
	const { fontSize, id, label, placeholder, children } = props;

	const [
		selectState,
		focusHandler,
		blurHandler,
		keyDownHandler,
		clickHandler,
		hoverOptionHandler,
		clickOptionHandler,
		deleteOptionHandler,
		stopPropagationHandler
	] = useMultiSelHook(children);

	const renderValues = () => {
		if (selectState.values.length === 0) {
			return <StyledSelectPlaceholder>{placeholder}</StyledSelectPlaceholder>;
		}

		return selectState.values.map(value => {
			return (
				<StyledSelectValue key={value} onClick={stopPropagationHandler}>
					{value}
					<StyledSelectDelete data-value={value} onClick={deleteOptionHandler}>
						<X />
					</StyledSelectDelete>
				</StyledSelectValue>
			);
		});
	};

	const renderOptions = () => {
		if (!selectState.isOpen) {
			return null;
		}

		return (
			<StyledOptionsWrapper>
				{props.children.map(renderOption)}
			</StyledOptionsWrapper>
		);
	};

	const renderOption = (option, index) => {
		const { value } = option;
		const isSelected = selectState.values.includes(value);

		return (
			<StyledSelectOption
				key={value}
				data-value={value}
				onMouseOver={hoverOptionHandler}
				onClick={clickOptionHandler}
				className={
					isSelected ? index === selectState.focusedValue ? (
						'selected focused'
					) : (
						'selected'
					) : (
						''
					)
				}
			>
				<StyledSelectOptionValue>
					{isSelected ? <Check /> : null}
				</StyledSelectOptionValue>
				{value}
			</StyledSelectOption>
		);
	};

	return (
		<StyledSelectWrapper
			fontSize={fontSize}
			tabIndex='0'
			onFocus={focusHandler}
			onBlur={blurHandler}
			onKeyDown={keyDownHandler}
		>
			<StyledSelectLabel htmlFor={id}>{label}</StyledSelectLabel>
			<StyledSelect className='selection' id={id} onClick={clickHandler}>
				{renderValues()}
				<StyledSelectArrow>
					{selectState.isOpen ? <ChevronUp /> : <ChevronDown />}
				</StyledSelectArrow>
			</StyledSelect>
			{renderOptions()}
		</StyledSelectWrapper>
	);
};

export default DropdownSelect;

const StyledSelectWrapper = styled.div`
	position: relative;
	display: inline-block;
	width: 320px;
	font-size: ${props => props.fontSize};
	font-family: ${setFont.main};

	&:focus {
		outline: 0;

		& .selection {
			box-shadow: 0 0 1px 1px ${setColor.borderClrCtrls};
		}
	}

	svg {
		display: block;
		width: 1em;
		height: 1em;
		fill: currentColor;
	}
`;

const StyledSelectPlaceholder = styled.div`
	padding: 5px 10px;
	color: ${setColor.greyText};
`;

const StyledSelectLabel = styled.label`
	display: block;
	margin-bottom: 3px;
	font-weight: bold;
	font-size: 1.25em;
`;

const StyledSelect = styled.div`
	position: relative;
	padding: 5px;
	border: 1px solid ${setColor.borderClrCtrls};
	background: #fff;

	:hover {
		background-color: ${setColor.hoverGrey};
	}
`;

const StyledSelectValue = styled.span`
	position: relative;
	display: inline-block;
	padding: 5px 10px;
	padding-right: 30px;
	margin-right: 20px;
	background: ${setColor.highLightForgnd};
	color: ${setColor.mainBlack};
`;

const StyledSelectDelete = styled.span`
	position: absolute;
	top: 0;
	right: 0;
	display: block;
	padding: 10px;
	font-size: 10px;
	cursor: pointer;
`;

const StyledOptionsWrapper = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	border: solid ${setColor.borderClrCtrls};
	border-width: 0 1px;
	background: #fff;
`;

const StyledSelectOption = styled.div`
	padding: 10px 15px;
	border-bottom: 1px solid ${setColor.mainGry};
	cursor: pointer;

	&.selected {
		border: 1px solid ${setColor.borderClrCtrls};
		margin: -1px -1px 0;
		background: ${setColor.highLightForgnd};
	}

	.focused,
	&:hover {
		background: ${setColor.hoverGrey};
	}
`;

const StyledSelectOptionValue = styled.span`
	content: '';
	vertical-align: top;
	display: inline-block;
	width: 16px;
	height: 16px;
	padding: 2px;
	border: 1px solid ${setColor.borderClrCtrls};
	border-radius: 2px;
	margin: 2px 12px 0 0;
	color: #fff;
	font-size: 10px;

	.selected & {
		border-color: ${setColor.borderClrCtrls};
		background: ${setColor.highLightbgnd};
	}
`;

const StyledSelectArrow = styled.span`
	position: absolute;
	top: 5px;
	right: 5px;
	display: block;
	padding: 10px;

	font-size: 10px;
	color: ${setColor.mainBlack};
`;

const ChevronDown = () => (
	<svg viewBox='0 0 10 7'>
		<path
			d='M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z'
			transform='translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) '
		/>
	</svg>
);

const ChevronUp = () => (
	<svg viewBox='0 0 10 8'>
		<path
			d='M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z'
			transform='translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) '
		/>
	</svg>
);

const X = () => (
	<svg viewBox='0 0 16 16'>
		<path d='M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z' />
	</svg>
);

const Check = () => (
	<svg viewBox='0 0 16 16'>
		<path
			d='M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z'
			transform='translate(0 1)'
		/>
	</svg>
);
