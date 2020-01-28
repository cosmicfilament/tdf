import { useState, useCallback, useRef, useEffect } from 'react';
import reactConfig from '../util/reactConfig';

export const makeURL = (url, path, params) => {
	let newURL = params ? `${url}${path}?` : `${url}${path}`;
	let flag = false;
	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			flag ? (newURL += '&') : (flag = true);
		}
		newURL += `${key}=${params[key]}`;
	}
	return flag ? newURL : `${url}${path}`;
};

export const useHttpClient = () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (
			path,
			params = {},
			method = 'GET',
			body = null,
			headers = {},
			mode = 'cors',
			url = reactConfig.BASE_URL
		) => {
			setIsLoading(true);
			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);

			const requestURL = makeURL(url, path, params);

			try {
				const response = await fetch(requestURL, {
					method,
					body,
					headers,
					mode,
					signal: httpAbortCtrl.signal
				});

				const responseData = await response.json();

				activeHttpRequests.current = activeHttpRequests.current.filter(
					reqCtrl => reqCtrl !== httpAbortCtrl
				);

				if (!response.ok) {
					throw new Error(responseData.message);
				}

				setIsLoading(false);
				return responseData;
			} catch (err) {
				setError(err.message);
				setIsLoading(false);
				throw err;
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};
