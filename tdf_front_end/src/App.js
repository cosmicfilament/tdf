import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import GlobalStyles from './shared/styles/GlobalStyles';
import Analysis from './charts/pages/Analysis';
import Search from './search/pages/Search';
import Nav from './nav/Nav';

function App () {
	let routes;

	routes = (
		<Switch>
			<Route path='/' exact>
				<Analysis />
			</Route>
			<Route path='/' exact>
				<Search />
			</Route>
			<Redirect to='/' />
		</Switch>
	);

	return (
		<React.Fragment>
			<Router>
				<Nav />
				<GlobalStyles />
				<main>{routes}</main>
			</Router>
		</React.Fragment>
	);
}

export default App;
