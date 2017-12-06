/*
 * LiskHQ/mocha-bdd
 * Copyright © 2017 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
import { Given, When, Then } from '../src';
import { given, when, then, fail } from './steps';

describe('skip', () => {
	Given.skip('some condition with .skip', given, () => {
		When('some code is executed', when, () => {
			Then('this test should be skipped', fail);
		});
		When('some code is executed', when, () => {
			Then('this test should be skipped', fail);
			Then('this test should be skipped', fail);
		});
	});
	Given('some condition', given, () => {
		When.skip('some code is executed with .skip', when, () => {
			Then('this test should be skipped', fail);
		});
		When('some code is executed', when, () => {
			Then.skip('this test with .skip should be skipped', fail);
			Then('this test should not be skipped', then);
		});
	});
	Given('some condition', given, () => {
		When('some code is executed', when, () => {
			Then('this test should not be skipped', then);
			Then('this test should not be skipped', then);
		});
		When('some code is executed', when, () => {
			Then('this test should not be skipped', then);
		});
	});
});
