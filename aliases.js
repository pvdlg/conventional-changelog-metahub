'use strict';

const _ = require('lodash');
const types = require('./types');

/**
 * @return {Object} Object with each alias as a key and the alias value merge with it's `type` as value.
 */
module.exports = _.transform(types.types, (aliases, value, type) => {
	if (value.aliases) {
		_.each(value.aliases, (aliasValue, alias) => {
			aliases[alias] = _.merge({type}, aliasValue);
		});
	}
});
