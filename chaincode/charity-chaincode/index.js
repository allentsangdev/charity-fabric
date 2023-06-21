/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const charityContract = require('./lib/charityContract');

module.exports.CharityContract = charityContract;
module.exports.contracts = [charityContract];