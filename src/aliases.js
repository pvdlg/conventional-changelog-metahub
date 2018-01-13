import {merge, transform, each} from 'lodash';
import {types} from './types';

/**
 * @return {Object} Object with each alias as a key and the alias value merge with it's `type` as value.
 */
export default transform(types, (aliases, value, type) => {
	if (value.aliases) {
		each(value.aliases, (aliasValue, alias) => {
			aliases[alias] = merge({type}, aliasValue);
		});
	}
});
