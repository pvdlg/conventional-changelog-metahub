'use strict';

const types = require('../types');

/**
 * Comparison function to sort Commit Groups.
 *
 * @param {Object} group1 commit group object with a `title` attribute.
 * @param {Object} group2 commit group object with a `title` attribute.
 * @return {integer} -1 if `group1` should be displayed before `group2`, 1 for the opposite and 0 if they are equals.
 */
module.exports = (group1, group2) => {
	const idx1 = types.typesOrder.indexOf(group1.commits[0].type);
	const idx2 = types.typesOrder.indexOf(group2.commits[0].type);

	if (idx1 !== -1 && idx2 === -1) {
		return -1;
	}

	if (idx1 === -1 && idx2 !== -1) {
		return 1;
	}

	if (idx1 < idx2) {
		return -1;
	}

	if (idx1 > idx2) {
		return 1;
	}

	if (group1.title < group2.title) {
		return -1;
	}

	if (group1.title > group2.title) {
		return 1;
	}

	return 0;
};
