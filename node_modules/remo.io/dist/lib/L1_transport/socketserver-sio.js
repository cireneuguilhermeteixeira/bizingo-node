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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const socketserver_1 = __importDefault(require("./socketserver"));
const serversocket_sio_1 = __importDefault(require("./serversocket-sio"));
const L0 = __importStar(require("../L0_system"));
// create logger
const logger = new L0.Logger("L1:SocketServer_SIO");
class SocketServer_SIO extends socketserver_1.default {
    constructor(options) {
        super();
        this.ss = socket_io_1.default(options.httpServer, {
            pingTimeout: 1000,
            pingInterval: 1500,
        });
        this.ss.on('connection', (rawSocket) => {
            this.connected(new serversocket_sio_1.default(rawSocket));
        });
    }
    shutdown() {
        console.log("CLOSING");
        this.ss.close();
    }
}
exports.default = SocketServer_SIO;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=socketserver-sio.js.map