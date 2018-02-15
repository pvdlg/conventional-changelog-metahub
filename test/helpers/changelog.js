import fs from 'fs-extra';
import tempy from 'tempy';
import execa from 'execa';
import conventionalChangelog from 'conventional-changelog';
import getStream from 'get-stream';
import pEachSeries from 'p-each-series';
import proxyquire from 'proxyquire';
import {merge} from 'lodash';

/**
 * Create a temporary git repository with commits.
 *
 * @method changelog
 * @param {Array<string>} messages the commit message (1 commit per message).
 * @param {Array} types the commit types configuration.
 * @param {Array} config additionnal configuration to pass to conventional-changelog.
 * @return {string} the changelog.
 */
export default async function changelog(messages, types, config = {}) {
	const dir = tempy.directory();

	process.chdir(dir);
	await fs.mkdir('git-templates');
	await execa('git', ['init', '--template=./git-templates']);

	await pEachSeries(messages, message => execa('git', ['commit', '-m', message, '--allow-empty', '--no-gpg-sign']));
	return getStream(
		conventionalChangelog(
			merge(
				{
					config: proxyquire('../..', {
						'./lib/commit-transform': proxyquire('../../lib/commit-transform', {'../types': types}),
						'./lib/commit-groups-compare': proxyquire('../../lib/commit-groups-compare', {'../types': types}),
					}),
				},
				config
			)
		)
	);
}
