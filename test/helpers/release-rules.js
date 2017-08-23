import proxyquire from 'proxyquire';

/**
 * Return the `release-rules` array, replacing `types` with parameter.
 * 
 * @method releaseRules
 * @param {Object} [types ={}] commit types to test with.
 * @return {Array} the `release-rules` array for the `types` in parameter.
 */
export default function releaseRules(types = {}) {
  return proxyquire('../../release-rules', {'./types': {types}});
}
