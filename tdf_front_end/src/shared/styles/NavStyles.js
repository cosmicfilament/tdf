import styled from 'styled-components/macro';
import { setColor, media } from '../../styles';

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
