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
import { given, when, then } from './steps';

describe('local', () => {
	Given('some condition', given, () => {
		When('some code is executed', when, () => {
			Then('some assertion', then);
		});
	});
});
