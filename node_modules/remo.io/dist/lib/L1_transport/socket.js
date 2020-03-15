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
const L0 = __importStar(require("../L0_system"));
const linkstate_1 = __importDefault(require("./linkstate"));
// create logger
const logger = new L0.Logger("L1:Socket");
class Socket {
    constructor() {
        this.onstatechanged = null;
        this.state = linkstate_1.default.DISCONNECTED;
        this.stateWatch = new L0.Stopwatch();
        // init statistics
        this.rxCount = 0;
        this.dropCount = 0;
    }
    connect() {
        // change state
        this.setState(linkstate_1.default.CONNECTING);
        this.doConnect();
    }
    disconnect() {
        // change state
        this.setState(linkstate_1.default.DISCONNECTING);
        this.doDisconnect();
    }
    getState() {
        return this.state;
    }
    send(type, message) {
        return this.doSend(type, message);
    }
    connected() {
        // change state
        this.setState(linkstate_1.default.CONNECTED);
    }
    disconnected() {
        // change state
        this.setState(linkstate_1.default.DISCONNECTED);
        // reset raw socket
        this.doReset();
    }
    linkdown() {
        // change state
        this.setState(linkstate_1.default.LINKDOWN);
    }
    reconnecting() {
        // change state
        this.setState(linkstate_1.default.RECONNECTING);
    }
    setState(state) {
        const oldState = this.state;
        this.state = state;
        const elapsed = this.stateWatch.restart();
        // trace info
        logger.debug(oldState + " => " + this.state + " after " + elapsed + " ms");
        // notify upper layer
        if (this.onstatechanged) {
            this.onstatechanged(this.state);
        }
    }
}
exports.default = Socket;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=socket.js.map