'use strict';

const _ = require('lodash');
const conventionalChangelogAngular = require('conventional-changelog-angular');
const commitGroupsSort = require('./lib/commit-groups-compare');
const transform = require('./lib/commit-transform');

/**
 * @type {Promise<Object>} preset with `parserOpts` and `writerOpts`.
 */
module.exports = conventionalChangelogAngular.then(preset =>
	_.merge(preset, {writerOpts: {transform, commitGroupsSort, groupBy: 'groupType'}})
);
