import {merge} from 'lodash';
import conventionalChangelogAngular from 'conventional-changelog-angular';
const commitGroupsSort = require('./lib/commit-groups-compare');
const transform = require('./lib/commit-transform');

/**
 * @type {Promise<Object>} preset with `parserOpts` and `writerOpts`.
 */
module.exports = conventionalChangelogAngular.then(preset =>
  merge(preset, {writerOpts: {transform, commitGroupsSort}})
);
