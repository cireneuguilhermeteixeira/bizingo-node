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
// error class used for all library specific errors
class RemoError extends Error {
    constructor(err, details) {
        // format error message
        const message = '[' + err.label + '] '
            + substitute(err.text, details)
            + ' (code ' + formatErrorCode(err.code) + ')';
        // call base
        super(message);
        // set properties
        this.name = "RemoError";
        this.label = err.label;
        this.code = err.code;
        this.text = err.text;
        this.details = details;
    }
}
exports.default = RemoError;
function formatErrorCode(code) {
    return '0x' + ("00000000" + code.toString(16).toUpperCase()).substr(-8);
}
function substitute(s, subst) {
    return s.replace(/\${\w+}/g, (m) => {
        const placeholder = m.substring(2, m.length - 1);
        return subst[placeholder] || m;
    });
}
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=remoerror.js.map