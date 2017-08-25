import {findKey, pick} from 'lodash';
import {types, typesOrder} from '../types';
import aliases from '../aliases';

/**
 * Comparison function to sort Commit Groups.
 *
 * @param {Object} group1 commit group object with a `title` attribute.
 * @param {Object} group2 commit group object with a `title` attribute.
 * @return {integer} -1 if `group1` should be displayed before `group2`, 1 for the opposite and 0 if they are equals.
 */
module.exports = (group1, group2) => {
  const type1 = typesOrder.indexOf(findKey(types, pick(group1, 'title')) || findKey(aliases, pick(group1, 'title')));
  const type2 = typesOrder.indexOf(findKey(types, pick(group2, 'title')) || findKey(aliases, pick(group2, 'title')));

  if (type1 !== -1 && type2 === -1) return -1;
  if (type1 === -1 && type2 !== -1) return 1;
  if (type1 < type2) return -1;
  if (type1 > type2) return 1;
  if (group1.title < group2.title) return -1;
  if (group1.title > group2.title) return 1;
  return 0;
};
