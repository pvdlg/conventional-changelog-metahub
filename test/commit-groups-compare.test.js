import test from 'ava';
import commitGroupsCompare from './helpers/commit-groups-compare';

test('Return ordered commit groups', t => {
  const commitGroups = [
    {title: 'Metadata'},
    {title: 'Documentation'},
    {title: 'Bug Fixes'},
    {title: 'Initial'},
    {title: 'Features'},
  ];
  const compare = commitGroupsCompare({
    typesOrder: ['feat', 'fix', 'docs', 'initial', 'metadata'],
    types: {
      feat: {title: 'Features', aliases: {initial: {title: 'Initial'}}},
      fix: {title: 'Bug Fixes', aliases: {metadata: {title: 'Metadata'}}},
      docs: {title: 'Documentation'},
    },
  });

  t.deepEqual(commitGroups.sort(compare), [
    {title: 'Features'},
    {title: 'Bug Fixes'},
    {title: 'Documentation'},
    {title: 'Initial'},
    {title: 'Metadata'},
  ]);
});

test('Return alphabeticaly ordered commit groups not in "typesOrder" at the end of the list', t => {
  const commitGroups = [
    {title: 'b-Test'},
    {title: 'z-Test'},
    {title: 'Bug Fixes'},
    {title: 'z-Test'},
    {title: 'a-Test'},
    {title: 'Features'},
  ];
  const compare = commitGroupsCompare({
    typesOrder: ['feat', 'fix'],
    types: {
      feat: {title: 'Features'},
      fix: {title: 'Bug Fixes'},
      atest: {title: 'a-Test'},
      ztest: {title: 'z-Test'},
      btest: {title: 'b-Test'},
    },
  });

  t.deepEqual(commitGroups.sort(compare), [
    {title: 'Features'},
    {title: 'Bug Fixes'},
    {title: 'a-Test'},
    {title: 'b-Test'},
    {title: 'z-Test'},
    {title: 'z-Test'},
  ]);
});
