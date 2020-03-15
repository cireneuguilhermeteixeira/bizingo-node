/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as L4 from './L4_rcp/errors';
import * as L3 from './L3_presentation/errors';
import * as L1 from './L1_transport/errors';
import RemoError from './remoerror';
export { RemoError, L1, L3, L4 };
export declare function revive(err: any): Error;
export declare function serialize(err: any): any;
