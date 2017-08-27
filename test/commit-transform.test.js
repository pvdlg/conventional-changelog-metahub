import test from 'ava';
import transform from './helpers/commit-transform';

const COMMIT_HASH_LENGTH = 7;

test('Return transformed commit if type has "changelog" "true"', t => {
  const commit = transform({type: 'feat', hash: '1234567890'}, {feat: {title: 'Feature title', changelog: true}});

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
});

test('Return transformed commit and truncate hash', t => {
  const commit = transform({type: 'feat', hash: '1234567890'}, {feat: {title: 'Feature title', changelog: true}});

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(commit.hash.length, COMMIT_HASH_LENGTH);
  t.true('1234567890'.startsWith(commit.hash));
});

test('Return "null" if type has "changelog" "false"', t => {
  const commit = transform({type: 'feat'}, {feat: {title: 'Feature title', changelog: false}});

  t.is(commit, null);
});

test('Return "null" if type has no "changelog" set', t => {
  const commit = transform({type: 'feat'}, {feat: {title: 'Feature title'}});

  t.is(commit, null);
});

test('Return transformed commit if it has a breaking change', t => {
  const commit = transform(
    {type: 'feat', notes: [{title: 'BREAKING CHANGE', text: 'some breaking change'}]},
    {feat: {title: 'Feature title', changelog: false}}
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
});

test('Set notes title to "Breaking changes" if commit has a breaking change', t => {
  const commit = transform(
    {type: 'feat', notes: [{title: 'BREAKING CHANGE', text: 'some breaking change'}]},
    {feat: {title: 'Feature title', changelog: false}}
  );

  t.is(commit.type, 'feat');
  t.is(commit.notes[0].title, 'Breaking changes');
});

test('Return transformed commit and preserve "scope"', t => {
  const commit = transform({type: 'feat', scope: 'scope1'}, {feat: {title: 'Feature title', changelog: true}});

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(commit.scope, 'scope1');
});

test('Return transformed commit and remove "scope" if "*"', t => {
  const commit = transform({type: 'feat', scope: '*'}, {feat: {title: 'Feature title', changelog: true}});

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.falsy(commit.scope);
});

test('Transform reference links in subject', t => {
  const commit = transform(
    {type: 'feat', subject: 'Subject, closes #123, fix #456'},
    {feat: {title: 'Feature title', changelog: true}},
    {host: 'https://github.com', owner: 'github_user', repository: 'repo_name'}
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(
    commit.subject,
    'Subject, closes [#123](https://github.com/github_user/repo_name/issues/123), fix [#456](https://github.com/github_user/repo_name/issues/456)'
  );
});

test('Transform reference link in subject (with repoUrl)', t => {
  const commit = transform(
    {type: 'feat', subject: 'Subject, closes #123, fix #456'},
    {feat: {title: 'Feature title', changelog: true}},
    {repoUrl: 'https://github.com/github_user/repo_name'}
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(
    commit.subject,
    'Subject, closes [#123](https://github.com/github_user/repo_name/issues/123), fix [#456](https://github.com/github_user/repo_name/issues/456)'
  );
});

test('Remove reference if already present in subject', t => {
  const commit = transform(
    {type: 'feat', subject: 'Subject, closes #123', references: [{issue: '123'}, {issue: '456'}]},
    {feat: {title: 'Feature title', changelog: true}},
    {repoUrl: 'https://github.com/github_user/repo_name'}
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(commit.references.length, 1);
  t.deepEqual(commit.references[0], {issue: '456'});
});

test('Transform mention link in subject', t => {
  const commit = transform(
    {type: 'feat', subject: 'Subject, @username @username2'},
    {feat: {title: 'Feature title', changelog: true}},
    {host: 'https://github.com'}
  );

  t.is(commit.type, 'feat');
  t.is(commit.groupType, 'Feature title');
  t.is(commit.subject, 'Subject, [@username](https://github.com/username) [@username2](https://github.com/username2)');
});
