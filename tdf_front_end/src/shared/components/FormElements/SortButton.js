import React from 'react';

import { TiArrowDownThick, TiArrowUpThick } from '../../../nav/react-icons/ti';

const SortButton = props => {
	return (
		<button
			type='button'
			id='SortButton'
			title={`Sort on ${props.sortOn} ${props.sortDirection}`}
			style={{
				background: 'transparent',
				border: 'none',
				textDecoration: 'none',
				outline: 'none',
				fontSize: `${props.fontSize}`,
				color: `${props.color}`
			}}
			onClick={props.onClick}
		>
			{props.sortDirection === 'ascending' ? (
				<TiArrowDownThick />
			) : (
				<TiArrowUpThick />
			)}
		</button>
	);
};

export default SortButton;
