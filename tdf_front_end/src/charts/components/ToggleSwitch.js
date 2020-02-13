import React, { useCallback } from 'react';
import styled from 'styled-components';
import Switch from '../../shared/components/FormElements/Switch';

const ToggleSwitch = props => {
	// callback from the switch toggle
	const switchHandler = useCallback(
		(id, state) => {
			props.setName(state === true ? 'weekly' : 'daily');
		},
		[ props ]
	);

	return (
		<ToggleWrapper>
			<Switch
				id='toggle'
				labelPosition='right'
				label={
					props.current === 'daily' ? 'Switch to Weekly Sentiment' : 'Switch to Daily Sentiment'
				}
				onSwitch={switchHandler}
			/>
		</ToggleWrapper>
	);
};

export default ToggleSwitch;

const ToggleWrapper = styled.div`
	margin: .5rem 0 1.5rem;
	label {
		margin-bottom: -.5rem;
	}
`;
