import proxyquire from 'proxyquire';

/**
 * Call the `commit-transform` function, replacing `types` with parameter.
 *
 * @method commitTransform
 * @param {Object} commit commit parsed with `conventional-changelog-parser`.
 * @param {Object} types commit types to test with.
 * @param {Object} [context={}] context parameter to pass to `commit-transform`.
 * @return {Object} the commit transformed with the `types` in parameter.
 */
export default function commitTransform(commit, types, context = {}) {
  return proxyquire('../../lib/commit-transform', {'../types': {types}})(commit, context);
}
