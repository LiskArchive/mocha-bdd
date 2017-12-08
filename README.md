# mocha-bdd

[![Build Status](https://jenkins.lisk.io/buildStatus/icon?job=mocha-bdd/master)](https://jenkins.lisk.io/job/mocha-bdd/job/master/)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
<a href="https://david-dm.org/LiskHQ/mocha-bdd"><img src="https://david-dm.org/LiskHQ/mocha-bdd.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/LiskHQ/mocha-bdd/?type=dev"><img src="https://david-dm.org/LiskHQ/mocha-bdd/dev-status.svg" alt="devDependency Status"></a>

This package helps you write better BDD-style tests. It exports three functions which wrap functions from Mocha to provide a more BDD-friendly interface that encourages well-structured, atomic, reusable test code. The default export is a function which, if called, adds those three functions as globals.

## Installation

```
npm install --save-dev --production mocha-bdd
```

## Usage

### Importing the functions

**Recommended:** Call the default export to add `Given`, `When`, and `Then` functions to the global object.

```js
import mochaBDD from 'mocha-bdd';

mochaBDD();
```

This should be done in your test setup file and run before any tests. For example, by running Mocha with the `--require` option set to that file.

Alternatively, import the individual functions in each relevant module:

```js
import { Given, When, Then } from 'mocha-bdd';
```

### Writing specifications

Specifications consist of a series of steps, which fall into one of three categories:
1. **Given** steps are for setup.
1. **When** steps are for executing the code under test.
1. **Then** steps are for making assertions based on the result.

The provided `Given` and `When` functions take a description, a step definition function, and a suite body function. The `Then` function takes only a description and a step definition function.

#### Descriptions

A description should succinctly describe the step, and should cover an atomic aspect of your test/suite. Ideally they should contain any example values that will be tested against. `mocha-bdd` will prepend `Given`, `When`, or `Then` to the beginning of your description so that the output will read the same as your specifications.

#### Step definition functions

These should be named in line with the descriptions. They should be created using a function declaration, so that Mocha can call it with the correct context and variables can be passed successfully among test steps.

Step definition functions can extract values from the description by matching regular expressions against `this.test.parent.title` (in the case of `Given` or `When` steps) or `this.test.title` (in the case of `Then` steps). They can store values in the test context either on `this` directly, or `this.test.ctx` (which you may find to be a helpful alias). Values which are assumed already to have been stored in the test context by previous test steps can be accessed as well.

Step definitions should aim to perform *only what is contained in the corresponding description*. If you find yourself putting additional functionality in a step definition function, consider whether you require an additional test step.

#### Suite body functions

These can safely be written as arrow functions. Their job is simply to contain the test steps which should be nested inside the current step.

### Example specification

```js
import given from "./given";
import when from "./when";
import then from "./then";

describe('wishHappyBirthday', () => {
	Given('a language "English"', given.aLanguage, () => {
		Given('a name "Lisky"', given.aName, () => {
			When('wishHappyBirthday is called with the name and the language', when.wishHappyBirthdayIsCalledWithTheNameAndTheLanguage, () => {
				Then('it should return "Happy birthday, Lisky!"', then.itShouldReturn);
			});
		});
		Given('a name "Satoshi"', given.aName, () => {
			When('wishHappyBirthday is called with the name and the language', when.wishHappyBirthdayIsCalledWithTheNameAndTheLanguage, () => {
				Then('it should return "Happy birthday, Satoshi!"', then.itShouldReturn);
			});
		});
	});
	Given('a language "Deutsch"', given.aLanguage, () => {
		Given('a name "Lisky"', given.aName, () => {
			When('wishHappyBirthday is called with the name and the language', when.wishHappyBirthdayIsCalledWithTheNameAndTheLanguage, () => {
				Then('it should return "Herzlichen Glückwunsch zum Geburtstag, Lisky!"', then.itShouldReturn);
			});
		});
		Given('a name "Satoshi"', given.aName, () => {
			When('wishHappyBirthday is called with the name and the language', when.wishHappyBirthdayIsCalledWithTheNameAndTheLanguage, () => {
				Then('it should return "Herzlichen Glückwunsch zum Geburtstag, Satoshi!"', then.itShouldReturn);
			});
		});
	});
	Given('an unsupported language "Esperanto"', given.anUnknownLanguage, () => {
		When('wishHappyBirthday is called with the name and the language', when.wishHappyBirthdayIsCalledWithTheNameAndTheLanguage, () => {
			Then('it should throw an error "Unsupported language"', then.itShouldThrowAnError);
		});
	});
});
```

### Running subsets of specifications

Just like Mocha’s functions, `Given`, `When` and `Then` all expose `.only` and `.skip` methods which result in the corresponding subset of tests being run. For example:

```js
Given('some setup', ..., () => {
	When.skip('something happens that should be skipped', ..., () => {
		Then('a test will be skipped', ...);
		Then.only('an exclusive test will be skipped', ...);
	});
	When('something happens that should not be skipped', ..., () => {
		Then.only('an exclusive test will run', ...);
		Then('a test will not run', ...);
		Then.only('another exclusive test will run', ...);
	});
});
```

## Authors

- William Clark [will@lightcurve.io](mailto:will@lightcurve.io)

## License

Copyright © 2017 Lisk Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the [GNU General Public License](https://github.com/LiskHQ/mocha-bdd/tree/master/LICENSE) along with this program.  If not, see <http://www.gnu.org/licenses/>.
