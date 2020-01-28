import { css } from 'styled-components';

export const setColor = {
	tweetBlue: '#2cb1ff',
	hairYellow: '#fee71d',
	bkgndBlue: '#2a39f6',
	noticeMeRed: '#ff0055',
	hoverNoticeMeRed: '#ff4382',
	toggleSelectedBlue: '#2a39f6',
	toggleBkgnd: '#a9a9a9',
	toggleHover: '#c9cdd0',
	inputBkgnd: '#f7f7f7',
	inputBorder: '#ececea',
	disabledBgnd: '#ccc',
	disabledColor: '#979797',
	chartYellow: '#ffffca',
	primaryColor: '#af9a7d',
	mainWhite: '#fff',
	mainBlack: '#222',
	greyText: '#898989',
	highLightForgnd: '#d9f2fb',
	highLightbgnd: '#007da6'
};

export const setFont = {
	main: "'Arvo', serif",
	second: "'Lato', sans-serif",
	controls: "'Archivo', sans-serif"
};

export const setFlex = ({ x = 'center', y = 'center' } = {}) => {
	return `display:flex;align-items:${y};justify-content:${x}`;
};

export const setRem = (number = 16) => {
	return `${number / 16}rem`;
};

export const rem2Px = (number = 1) => {
	return Number(number * 16);
};

export const px2Rem = (number = 16) => {
	return `${number / 16}rem`;
};

export const setLetterSpacing = (number = 2) => {
	return `letter-spacing:${number}px`;
};

export const screenWidth = {
	large: 1200,
	desktop: 1024,
	tablet: 768,
	phablet: 480,
	phone: 320
};

// Iterate through the sizes and create a media template
export const media = Object.keys(screenWidth).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (min-width: ${screenWidth[label] / 16}em) {
			${css(...args)};
		}
	`;
	return acc;
}, {});
