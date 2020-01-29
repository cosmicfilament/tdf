import React, { Fragment, useState, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import Logo from './Logo';
import { screenWidth } from '../styles';

import styled from 'styled-components/macro';
import { setColor, media } from '../styles';

const Nav = () => {
	const [ isDisplayed, setDisplayed ] = useState(false);
	const [ ulClass, setUlClass ] = useState('nav-menu-normal');

	const toggleHamburgerIcon = () => {
		setUlClass(!isDisplayed ? 'nav-menu-hamburger-show' : 'nav-menu-normal');
		setDisplayed(!isDisplayed);
	};

	const handleToggleHamburgerIcon = e => {
		e.preventDefault();
		toggleHamburgerIcon();
	};

	useLayoutEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	});

	const handleWindowResize = () => {
		if (window.innerWidth >= screenWidth.phablet && isDisplayed) {
			setDisplayed(false);
			setUlClass('nav-menu-normal');
		}
	};

	const handleMenuClicked = event => {
		event.preventDefault();
		isDisplayed && toggleHamburgerIcon();
	};

	return (
		<Fragment>
			<StyledNav onClick={handleMenuClicked}>
				<div className='nav-logo'>
					<Logo />
				</div>
				<div className='nav-title'>
					<NavLink to='/'>Twitter Dumpster Fire</NavLink>
				</div>
				<div className='nav-toggle-icon'>
					<TiThMenu size={25} onClick={handleToggleHamburgerIcon} />
				</div>
				<ul className={ulClass}>
					<li>
						<NavLink to='/' exact>
							HOME
						</NavLink>
					</li>
					<li>
						<NavLink to='/search' exact>
							SEARCH
						</NavLink>
					</li>
				</ul>
			</StyledNav>
		</Fragment>
	);
};

export default Nav;

const hamburgerWidths = {
	menuWidth: '50%',
	menuOffset: '25%'
};

export const StyledNav = styled.nav`
	display: flex;
	justify-content: space-between;
	flex-wrap: nowrap;
	align-items: center;
	height: 4rem;
	background: ${setColor.bkgndBlue};

	.nav-menu-hamburger-show {
		position: absolute;
		margin-top: 4rem;
		top: 0%;
		right: ${hamburgerWidths.menuOffset};
		display: flex;
		z-index: 100;
		background: ${setColor.bkgndBlue};
		width: ${hamburgerWidths.menuWidth};
	}

	.nav-menu-normal {
		display: none;
	}

	.nav-logo {
		height: 3rem;
		padding-left: .25rem;
		order: 1;
	}

	.nav-title,
	.nav-title a:active {
		order: 2;
		font-size: 2.5vh;
		color: ${setColor.tweetBlue};
	}

	& ul,
	& ul li {
		flex-direction: column;
		list-style-type: none;
		padding: 10px;
		text-align: center;
		text-decoration: none;
		font-size: 2vh;
	}

	& ul li a,
	.nav-title a {
		color: ${setColor.tweetBlue};
		text-decoration: none;
	}

	& ul li a:active,
	& ul li a.active {
		color: ${setColor.hairYellow};
	}

	.nav-title a:hover,
	& ul li a:hover {
		color: ${setColor.hairYellow};
		font-weight: bold;
	}

	.nav-toggle-icon {
		color: ${setColor.hairYellow};
		padding-right: .25rem;
		order: 3;
	}

	${media.phone`
		.nav-toggle-icon {
			padding: .5rem;
		}
	`};

	${media.tablet`
		.nav-logo {
			order: 1;
		}

		.nav-title,
		.nav-title a:active {
			order: 2;
			font-size: 3vh;
		}

		.nav-toggle-icon {
			display: none;
		}

		.nav-menu-normal {
			display: inherit;
			order: 3;
		}

		& ul,
		& ul li {
			flex-direction: row;
			display: inherit;
			padding: 5px;
			font-size: 2vh;
		}
	`};
`;
