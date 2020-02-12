import { css } from 'styled-components';

export const setColor = {
	tweetBlue: '#2cb1ff',
	bkgndBlue: '#2a39f6',
	bkgndYellow: '#ffffe1',
	noticeMeRed: '#ff0055',
	hoverNoticeMeRed: '#ff4382',
	toggleSelectedBlue: '#2a39f6',
	toggleBkgnd: '#a9a9a9',
	toggleHover: '#c9cdd0',
	inputBkgnd: '#f7f7f7',
	inputBorder: '#ececea',
	disabledBtnBkgnd: '#ccc',
	disabledBtnFgnd: '#979797',
	mainWhite: '#fff',
	mainBlack: '#222'
};

export const setFont = {
	main: "'Arvo', serif",
	controls: "'Archivo', sans-serif",
	mono: "'Courier Prime', monospace"
};

export const setFlex = ({ x = 'center', y = 'center' } = {}) => {
	return `display:flex;align-items:${y};justify-content:${x}`;
};

export const screenWidth = {
	large: 1200,
	desktop: 1024,
	tablet: 768,
	phablet: 480,
	phone: 320
};

export const maxScreenWidth = 2000;
export const minScreenWidth = 320;

// Iterate through the sizes and create a media template
export const media = Object.keys(screenWidth).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (min-width: ${screenWidth[label] / 10}em) {
			${css(...args)};
		}
	`;
	return acc;
}, {});
