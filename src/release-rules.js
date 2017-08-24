import {transform} from 'lodash';
import {types} from './types';

/**
 * @type {Array} `releaseRules` configuration for `sr-commit-analyzer`.
 */
module.exports = [{breaking: true, release: 'major'}].concat(
  transform(
    types,
    (releaseRules, value, type) => {
      if (value.release) {
        if (typeof value.release === 'string') {
          releaseRules.push({type, release: value.release});
        }

        if (value.release.release) {
          releaseRules.push(Object.assign({type}, value.release));
        }
      }
    },
    []
  )
);
