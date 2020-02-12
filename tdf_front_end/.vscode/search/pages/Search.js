import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import 'whatwg-fetch';

import SortButton from '../../../src/shared/components/FormElements/SortButton';
import DisplayTweetResults from '../../../src/charts/components/DisplayTweetResults.js';
import { SearchInput, DateInput, CheckBox } from '../components/SearchInputs';
import GlobalStyles from '../../../src/shared/styles/GlobalStyles';

// same as in app.scss
const DEFAULT_WINDOW_SIZE = 500;

let today = new Date(Date.now()).toISOString();
today = today.substr(0, today.indexOf('T'));

let aYearAgo = new Date(Date.now());
aYearAgo.setMonth(aYearAgo.getMonth() - 12);
aYearAgo = aYearAgo.toISOString();
aYearAgo = aYearAgo.substr(0, aYearAgo.indexOf('T'));

const Search = () => {
	const [ initializing, setIsInitializing ] = useState(true);
	const [ sortDirection, setSortDirection ] = useState('');
	const [ searchValue, setSearchValue ] = useState('');
	const [ fromDateValue, setFromDateValue ] = useState('2001-01-01');
	const [ toDateValue, setToDateValue ] = useState('2001-01-01');
	const [ caseSensitive, setIsCaseSenitive ] = useState(false);
	const [ includeRetweets, setIncludeRetweets ] = useState(false);
	const [ searchResults, displaySearchResults ] = useState([]);
	const [ retweetLabel, setRetweetLabel ] = useState('');
	const [ caseLabel, setCaseLabel ] = useState('');

	useEffect(
		() => {
			if (initializing) {
				setSearchValue('');
				setFromDateValue(aYearAgo);
				setToDateValue(today);
				setIsCaseSenitive(false);
				setIncludeRetweets(true);
				setSortDirection('descending');
				setIsInitializing(false);
				handleWindowResize();
			}
		},
		[ initializing ]
	);

	useLayoutEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	});

	const handleWindowResize = () => {
		if (window.innerWidth >= DEFAULT_WINDOW_SIZE) {
			setRetweetLabel('Retweets');
			setCaseLabel('Case Sensitive');
		}
		else {
			setRetweetLabel('Retweets');
			setCaseLabel('Case...');
		}
	};

	const searchSubmitHandler = event => {
		event.preventDefault();
		console.log(
			`searchValue: ${searchValue} fromDate: ${fromDateValue} toDate: ${toDateValue} caseSensitive: ${caseSensitive} includeRetweets: ${includeRetweets}`
		);

		const url = `/search?search_terms=${searchValue}
		&case_sensitive=${caseSensitive}
		&include_retweets=${includeRetweets}
		&from_date=${fromDateValue}
		&to_date=${toDateValue}`;

		window
			.fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				displaySearchResults(data);
			})
			.catch(function (error) {
				console.log(JSON.stringify(error));
			});
	};

	const changeHandler = event => {
		event.preventDefault();
		const tgt = event.target;
		switch (tgt.id) {
			case 'search':
				setSearchValue(tgt.value);
				break;
			case 'fromDate':
				setFromDateValue(tgt.value);
				break;
			case 'toDate':
				setToDateValue(tgt.value);
				break;
			default:
				break;
		}
	};

	const clickHandler = event => {
		const tgt = event.target;
		switch (tgt.id) {
			case 'caseSensitive':
				setIsCaseSenitive(tgt.checked);
				break;
			case 'includeRetweets':
				setIncludeRetweets(tgt.checked);
				break;
			default:
				break;
		}
	};

	const handleSortButtonClick = event => {
		event.preventDefault();
		setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
	};

	if (initializing) {
		return null;
	}

	return (
		<Fragment>
			<form className='search-form' onSubmit={searchSubmitHandler}>
				<div className='search-input'>
					<SearchInput
						id='search'
						type='search'
						label='Search'
						title='Search'
						defaultValue={searchValue}
						onChangeHandler={changeHandler}
						width={'30rem'}
					/>
				</div>
				<div className='from-date'>
					<DateInput
						id='fromDate'
						type='date'
						label='From'
						title='From Date'
						min='2006-03-05'
						max={today()}
						defaultValue={fromDateValue}
						onChangeHandler={changeHandler}
					/>
				</div>
				<div className='to-date'>
					<DateInput
						id='toDate'
						type='date'
						label='To'
						title='To Date'
						min='2006-03-05'
						defaultValue={toDateValue}
						max={today()}
						onChangeHandler={changeHandler}
					/>
				</div>

				<div className='case-sensitive'>
					<CheckBox
						id='caseSensitive'
						type='checkbox'
						label={caseLabel}
						title='Case Sensitive'
						defaultValue={setIsCaseSenitive}
						onClickHandler={clickHandler}
					/>
				</div>
				<div className='include-retweets'>
					<CheckBox
						id='includeRetweets'
						type='checkbox'
						label={retweetLabel}
						title='Retweets'
						defaultValue={includeRetweets}
						onClickHandler={clickHandler}
					/>
				</div>
				<div className='sort-button'>
					<SortButton
						sortOn='Date'
						onClick={handleSortButtonClick}
						sortDirection={sortDirection}
						color={'#2a39f6'}
						fontSize={'2rem'}
					/>
				</div>
				<div className='submit-button'>
					<button type='submit'>SEARCH</button>
				</div>
			</form>
			{searchResults.length > 0 && (
				<DisplayTweetResults results={searchResults} sortDirection={sortDirection} />
			)}
		</Fragment>
	);
};

export default Search;
