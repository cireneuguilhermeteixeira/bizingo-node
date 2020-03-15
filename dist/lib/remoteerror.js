"use strict";
//------------------------------------------------------------------------------
/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//------------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
// error class used for generic errors occurred on a remote host
class RemoteError extends Error {
    constructor(message, details) {
        // call base
        super(message);
        // set properties
        this.name = "RemoteError";
        this.details = details;
    }
}
exports.default = RemoteError;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=remoteerror.js.map