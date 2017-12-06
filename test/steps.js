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
export function given() {
	this.test.ctx.input = 'World';
}

export function when() {
	this.test.ctx.output = `Hello ${this.test.ctx.input}`;
}

export function then() {
	expect(this.test.ctx.output).to.equal('Hello World');
}

export function fail() {
	throw new Error('This test should not be run');
}
