import test from 'ava';
import emojiRegex from 'emoji-regex/text';
import {length} from 'stringz';
import {types, typesOrder} from '../types';

/* eslint valid-typeof: ["error", {requireStringLiterals: false}] */

/**
 * AVA macro that verifies that each object in `object` has the property `prop` of type `type`.
 *
 * @method hasProperty
 * @param {Object} t AVA assertion librarie
 * @param {string} object object to verify
 * @param {string} prop property to verify
 * @param {string} type type to verify
 */
function hasProperty(t, object, prop, type) {
	for (const obj in object) {
		if (Object.prototype.hasOwnProperty.call(object, obj)) {
			t.true(Object.prototype.hasOwnProperty.call(object[obj], prop));
			if (type === 'boolean' || type === 'string' || type === 'number' || type === 'function') {
				t.true(typeof object[obj][prop] === type);
			} else if (type === 'emoji') {
				t.true(emojiRegex({exact: true}).test(object[obj][prop]));
				t.is(length(object[obj][prop]), 1);
			}
		}
	}
}

/**
 * AVA macro that verifies that each object in `object` has a valida release property.
 *
 * @method hasProperty
 * @param {Object} t AVA assertion librarie
 * @param {string} object object to verify
 */
function hasValidRelease(t, object) {
	for (const obj in object) {
		if (Object.prototype.hasOwnProperty.call(object, obj)) {
			t.true(Object.prototype.hasOwnProperty.call(object[obj], 'release'));
			t.true(
				['major', 'minor', 'patch', false].indexOf(object[obj].release) !== -1 ||
					(Object.prototype.hasOwnProperty.call(object[obj].release, 'release') &&
						['major', 'minor', 'patch', false].indexOf(object[obj].release.release) !== -1)
			);
		}
	}
}

test('../types has the property types', t => {
	t.truthy(types);
});

test('Each type has the property title', hasProperty, types, 'title', 'string');
test('Each type has the property description', hasProperty, types, 'description', 'string');
test('Each type has the property emoji', hasProperty, types, 'emoji', 'emoji');
test('Each type has the property changelog', hasProperty, types, 'changelog', 'boolean');
test('Each type has the property release', hasValidRelease, types);

test('../types has the property typesOrder', t => {
	t.truthy(typesOrder);
});

test('Each type exists in typesOrder', t => {
	for (const type in types) {
		if (Object.prototype.hasOwnProperty.call(types, type)) {
			t.true(typesOrder.indexOf(type) !== -1);
		}
	}
});
