import { useState } from 'react';

const useRefCount = initialValue => {
	const [ count, setCount ] = useState(initialValue);

	const incrementCount = () => {
		let newCount = count + 1;
		setCount(newCount);
	};

	const decrementCount = () => {
		let newCount = count - 1;
		if (count < 0) {
			console.log('Error in useRefCount. Trying to decrement a zero count');
			newCount = 0;
		}
		setCount(newCount);
	};

	return [ count, incrementCount, decrementCount ];
};

export default useRefCount;
