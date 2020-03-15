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
Object.defineProperty(exports, "__esModule", { value: true });
const L0 = __importStar(require("../L0_system"));
// create logger
const logger = new L0.Logger("L1:SocketServer");
class SocketServer {
    constructor() {
        this.onconnected = null;
        this.ondisconnected = null;
    }
    connected(socket) {
        if (this.onconnected) {
            this.onconnected(socket);
        }
    }
    disconnected(socket) {
        if (this.ondisconnected) {
            this.ondisconnected(socket);
        }
    }
}
exports.default = SocketServer;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=socketserver.js.map