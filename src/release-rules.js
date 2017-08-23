import {transform} from 'lodash';
import {types} from './types';

/**
 * @type {Array} `releaseRules` configuration for `sr-commit-analyzer`.
 */
module.exports = [{breaking: true, release: 'major'}].concat(
  transform(
    types,
    (commitTypes, value, type) => {
      if (value.release) {
        if (typeof value.release === 'string') {
          commitTypes.push({type, release: value.release});
        }

        if (value.release.release) {
          commitTypes.push(Object.assign({type}, value.release));
        }
      }
    },
    []
  )
);
