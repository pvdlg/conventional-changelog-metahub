'use strict';

const types = require('../types');

const COMMIT_HASH_LENGTH = 7;

/**
 * Transform a parsed commit to render the changelog.
 *
 * @param {Object} commit commit parsed with `conventional-changelog-parser`.
 * @param {Object} context `conventional-changelog` context.
 * @return {Object} the transformed commit.
 */
module.exports = (commit, context) => {
	if (commit.notes) {
		commit.notes.forEach(note => {
			note.title = 'Breaking changes';
		});
	}

	if (types.types[commit.type] && (types.types[commit.type].changelog || (commit.notes && commit.notes.length > 0))) {
		commit.groupType = `${types.types[commit.type].emoji ? `${types.types[commit.type].emoji} ` : ''}${
			types.types[commit.type].title
		}`;
	} else {
		return null;
	}

	if (commit.scope === '*') {
		commit.scope = '';
	}

	if (typeof commit.hash === 'string') {
		commit.shortHash = commit.hash.slice(0, COMMIT_HASH_LENGTH);
	}

	const references = [];

	if (typeof commit.subject === 'string') {
		let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl;

		if (url) {
			url += '/issues/';
			// Issue URLs.
			commit.subject = commit.subject.replace(/#(\d+)/g, (_, issue) => {
				references.push(issue);
				return `[#${issue}](${url}${issue})`;
			});
		}

		if (context.host) {
			// User URLs.
			commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g, `[@$1](${context.host}/$1)`);
		}
	}

	if (commit.references) {
		// Remove references that already appear in the subject
		commit.references = commit.references.filter(reference => {
			if (!references.includes(reference.issue)) {
				return true;
			}

			return false;
		});
	}

	return commit;
};
