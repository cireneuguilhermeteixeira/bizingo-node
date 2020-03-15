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
const socket_1 = __importDefault(require("./socket"));
const L0 = __importStar(require("../L0_system"));
const errors = __importStar(require("../errors"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
// create logger
const logger = new L0.Logger("L1:CLientSocket_SIO");
class CLientSocket_SIO extends socket_1.default {
    constructor(url) {
        super();
        this.socket = null;
        this.url = url || ""; // use window.location
        this.receivers = new Map();
    }
    receive(type, handler) {
        this.receivers.set(type, handler);
        // TODO de-duplicate code #1
        if (this.socket) {
            this.socket.on("msg_" + type, (message, callback) => {
                handler(message).then((result) => {
                    callback({ result });
                }).catch((error) => {
                    callback({ error });
                });
            });
        }
    }
    doConnect() {
        this.socket = socket_io_client_1.default(this.url);
        this.socket.on('connect', () => {
            this.connected();
        });
        // register message specific handlers
        this.receivers.forEach((handler, type) => {
            // TODO de-duplicate code #1
            if (this.socket) {
                this.socket.on("msg_" + type, (message, callback) => {
                    handler(message).then((result) => {
                        callback({ result });
                    }).catch((error) => {
                        callback({ error: errors.serialize(error) });
                    });
                });
            }
        });
        this.socket.on('disconnect', (reason) => {
            if (reason === 'io server disconnect') {
                // the disconnection was initiated by the server, you need to reconnect manually
                // this.socket.connect();
                this.disconnected();
            }
            else {
                // the socket will automatically try to reconnect
                this.linkdown();
            }
        });
        this.socket.on('reconnecting', (attempt) => {
            this.reconnecting();
        });
        this.socket.on('error', (err) => {
            console.log("on error:", err);
        });
        this.socket.on('connect_error', (err) => {
            this.linkdown();
        });
    }
    doDisconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
    doSend(type, message) {
        return new Promise((resolve, reject) => {
            if (this.socket) {
                this.socket.emit('msg_' + type, message, (reply) => {
                    resolve(reply);
                });
            }
        });
    }
    doReset() {
        if (this.socket) {
            this.socket.removeAllListeners();
            this.socket = null;
        }
    }
}
exports.default = CLientSocket_SIO;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=clientsocket-sio.js.map