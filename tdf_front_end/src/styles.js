import { css } from 'styled-components';

export const setColor = {
	tweetBlue: '#2cb1ff',
	hairYellow: '#fee71d',
	bkgndBlue: '#2a39f6',
	primaryColor: '#af9a7d',
	mainWhite: '#fff',
	mainBlack: '#222',
	borderClrCtrls: '#ececec',
	bgndClrCtrls: '#f7f7f7',
	disabledGrey: '#ddd',
	disabledBlack: '#6666',
	hoverGrey: '#ececea',
	greyText: '#898989',
	highLightForgnd: '#d9f2fb',
	highLightbgnd: '#007da6'
};

export const setFont = {
	main: "'Arvo', serif",
	second: "'Lato', sans-serif",
	third: "'Bree Serif', serif"
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

const sizes = {
	large: 1200,
	desktop: 1024,
	tablet: 768,
	phablet: 480,
	phone: 320
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (min-width: ${sizes[label] / 16}em) {
			${css(...args)};
		}
	`;
	return acc;
}, {});
