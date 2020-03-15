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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const L4 = __importStar(require("./L4_rcp/errors"));
exports.L4 = L4;
const L3 = __importStar(require("./L3_presentation/errors"));
exports.L3 = L3;
const L1 = __importStar(require("./L1_transport/errors"));
exports.L1 = L1;
const remoerror_1 = __importDefault(require("./remoerror"));
exports.RemoError = remoerror_1.default;
const remoteerror_1 = __importDefault(require("./remoteerror"));
function revive(err) {
    if (err && err.name === "RemoError") {
        // error in our library
        return new remoerror_1.default({ label: err.label, code: err.code, text: err.text }, err.details);
    }
    else {
        // unknown error
        return new remoteerror_1.default(err.message || err.toString(), err);
    }
}
exports.revive = revive;
function serialize(err) {
    if (err instanceof Error) {
        const ser = Object.assign({}, err);
        // assign non-enumerable (?) properties
        ser.message = err.message;
        return ser;
    }
    else {
        // as is
        return err;
    }
}
exports.serialize = serialize;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=errors.js.map