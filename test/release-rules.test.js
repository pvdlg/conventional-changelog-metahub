import test from 'ava';
import {find} from 'lodash';
import releaseRules from './helpers/release-rules';

test('Always set breking changes as "major" release', t => {
  t.deepEqual(find(releaseRules(), {breaking: true}), {breaking: true, release: 'major'});
});

test('Include a type in release-rules if it has "release" set to "true"', t => {
  t.deepEqual(find(releaseRules({feat: {release: 'minor'}}), {type: 'feat'}), {type: 'feat', release: 'minor'});
});

test('Do not Include a type in release-rules if it has "release" set to "false"', t => {
  t.falsy(find(releaseRules({feat: {release: false}}), {type: 'feat'}));
});

test('Do not Include a type in release-rules if it has no "release"', t => {
  t.falsy(find(releaseRules({feat: {}}), {type: 'feat'}));
});

test('Include a type in release-rules if it has "release" set to a rule', t => {
  t.deepEqual(find(releaseRules({feat: {release: {criteria: 'value', release: 'minor'}}}), {type: 'feat'}), {
    type: 'feat',
    criteria: 'value',
    release: 'minor',
  });
});
