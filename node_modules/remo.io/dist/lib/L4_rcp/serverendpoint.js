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
const localendpoint_1 = __importDefault(require("./localendpoint"));
const L1 = __importStar(require("../L1_transport"));
const L0 = __importStar(require("../L0_system"));
// create logger
const logger = new L0.Logger("L4:ServerEndpoint");
class ServerEndpoint extends localendpoint_1.default {
    constructor(options) {
        super();
        this.server = new L1.SocketServer_SIO(options);
        this.server.onconnected = this.connected.bind(this);
        // TODO disconnect?
        // register functions at root
        if (options.api) {
            this.registerFunctions("", options.api);
        }
    }
    shutdown() {
        this.server.shutdown();
    }
    connected(socket) {
        this.createRemoteEndpoint(socket);
    }
}
exports.default = ServerEndpoint;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=serverendpoint.js.map