'use strict';

const _ = require('lodash');
const types = require('./types');

/**
 * @type {Array} `releaseRules` configuration for `sr-commit-analyzer`.
 */
module.exports = [{breaking: true, release: 'major'}].concat(
	_.transform(
		types.types,
		(releaseRules, value, type) => {
			if (value.release) {
				if (typeof value.release === 'string') {
					releaseRules.push({type, release: value.release});
				}

				if (value.release.release) {
					releaseRules.push({type, ...value.release});
				}
			}
		},
		[]
	)
);
