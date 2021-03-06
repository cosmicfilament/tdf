//'use strict';
/* eslint no-console: off */
/* eslint-disable no-restricted-globals */

/**
 * @file various helper functions
 * @module helpers.js
 * @description various helper functions that are needed across modules
 *	@exports helpers
 */
(function () {
	const root =
		(typeof self == 'object' && self.self === self && self) ||
		(typeof global == 'object' && global.global === global && global) ||
		this ||
		{};

	// Container for all the helpers
	const helpers = {};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = helpers;
		}
		exports.helpers = helpers;
	} else {
		root.helpers = helpers;
	}

	// is this a node js module?
	const has_require = typeof require !== 'undefined';
	let nodeConfig = root.nodeConfig;

	if (typeof nodeConfig === 'undefined') {
		if (has_require) {
			nodeConfig = require('./nodeConfig.js');
		} else {
			throw new Error('Missing requires: nodeConfig.js');
		}
	}

	/**
     * @summary parseJsonToObject
     * @param string
     * @returns object
     * @throws nothing
     */
	// Parse a JSON string to an object in all cases, without throwing
	helpers.parseJsonToObject = (str = '') => {
		// string or false
		// gets rid of nuisance error output when there is no JSON data
		if (!str) return false;

		try {
			return JSON.parse(str);
		} catch (err) {
			return {};
		}
	};
	/**
     * @summary validateBool
     * @description validate is a boolean
     * @param value
     * @returns value or false on fail
     */
	// validate boolean request inputs
	// value: boolean
	// returns result or false if value != boolean
	helpers.validateBool = (value = false) => {
		//boolean
		return helpers.TYPEOF(value) === 'boolean' ? !!value : false;
	};

	// validate string input
	// str: string
	// len: length. minimum length of the string if equ is false or exact length if equ is true
	// equ: boolean if true len = str.len else str greater than or equal to len
	// returns false if validation fails
	/**
     * @summary validateString
     * @description validates if is a string and is empty and within length criteria
     * @param str
     * @param len
     * @param comparator
     * @returns string or false on fail
     */
	helpers.validateString = (
		str = '',
		retval = false,
		len = 0,
		comparator = '>'
	) => {
		// if it isn't a valid string why waste time
		if (helpers.TYPEOF(str) !== 'string' || str.length === 0) {
			return false;
		}
		const _str = str.trim();

		switch (comparator) {
			case '<':
				return _str.length < len ? _str : retval;
			case '<=':
				return _str.length <= len ? _str : retval;
			case '=':
				return _str.length === len ? _str : retval;
			case '>':
				return _str.length > len ? _str : retval;
			case '>=':
				return _str.length >= len ? _str : retval;
			default:
				return retval;
		}
	};
	/**
     * @summary validateStringArray
     * @description checks for existance of a string in an array
     * @param string, array
     * @returns string on match or false
     */
	helpers.validateStringArray = (str = '', arr = []) => {
		// string or false
		if (helpers.TYPEOF(str) === 'string' && arr.indexOf(str.trim()) > -1) {
			return str.trim();
		}
		return false;
	};
	/**
     * @summary validateArray
     * @description validates is an array and length
     * @param object
     * @returns the array of false
     */
	helpers.validateArray = (obj = '') => {
		// array object or false
		if (
			helpers.TYPEOF(obj) === 'array' &&
			obj instanceof Array &&
			obj.length > 0
		) {
			return obj;
		}
		return false;
	};

	helpers.validateHtmlCollection = (obj = '') => {
		// array object or false
		if (
			typeof obj === 'object' &&
			typeof HTMLCollection !== 'undefined' &&
			obj instanceof HTMLCollection &&
			obj.length > 0
		) {
			return obj;
		}
		return false;
	};

	// check if object is in fact an  object and that it is not empty
	/**
     * @summary validateObject
     * @description validates is an object and has properties
     * @param object
     * @returns object or false
     */
	helpers.validateObject = (obj = {}) => {
		//object or false
		if (
			typeof obj === 'object' &&
			obj !== null &&
			Object.keys(obj).length > 0
		) {
			return obj;
		}
		return false;
	};

	helpers.validateHtmlElement = obj => {
		if (
			typeof obj === 'object' &&
			obj !== null &&
			typeof Element !== 'undefined' &&
			typeof HTMLDocument !== 'undefined' &&
			(obj instanceof Element || obj instanceof HTMLDocument)
		) {
			return obj;
		}
		return false;
	};
	// /**
	//  * @summary between
	//  * @description adds a prototype to number to check if a number is within a range
	//  * @param num, num and inclusive boolean indicator
	//  * @returns true or false
	//  */
	// Number.prototype.between = function(a, b, inclusive = true) {
	// 	// boolean
	// 	const min = Math.min(a, b);
	// 	const max = Math.max(a, b);
	// 	return inclusive
	// 		? this >= min && this <= max
	// 		: this > min && this < max;
	// };
	/**
     * @summary validateIntegerRange
     * @description validates is a number and within a range
     * @param number, start number and length
     * @returns number or false
     */
	helpers.validateIntegerRange = (
		num = 0,
		start = 0,
		len = Number.MAX_SAFE_INTEGER
	) => {
		// number or false
		if (
			helpers.TYPEOF(num) === 'number' &&
			num % 1 === 0 &&
			num.between(start, len)
		) {
			return num;
		}
		return false;
	};

	helpers.validateInteger = (num, start = 1) => {
		// number or false
		if (helpers.TYPEOF(num) === 'number' && num % 1 === 0 && num >= start) {
			return num;
		}
		return false;
	};
	/**
     * @summary log
     * @description writes in color to the console in staqing mode only
     * @param statusCode and message
     * @returns object as JSON string
     */
	helpers.log = (color, msg) => {
		if (nodeConfig.DEBUG === true) {
			switch (color) {
				case 'red':
					color = '\x1b[31m%s';
					break;
				case 'green':
					color = '\x1b[32m%s';
					break;
				case 'blue':
					color = '\x1b[34m%s';
					break;
				case 'yellow':
					color = '\x1b[33m%s';
					break;
				case 'black':
					color = '\x1b[30m%s';
					break;
				case 'white':
					color = '\x1b[37m%s';
					break;
				case 'cyan':
					color = '\x1b[36m%s';
					break;
				case 'magenta':
					color = '\x1b[35m%s';
					break;
				default:
					// white
					color = '\x1b[37m%s';
					break;
			}
			console.log(color, msg);
		}
	};

	// grabbed this little nugget from http://bonsaiden.github.io/JavaScript-Garden/#types.typeof
	helpers.TYPEOF = function (value) {
		if (value === null) {
			return value;
		}
		if (typeof value === 'undefined') {
			return 'undefined';
		}
		return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
	};
}.call(this));
