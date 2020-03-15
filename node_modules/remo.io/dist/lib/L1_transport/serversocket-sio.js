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
// create logger
const logger = new L0.Logger("L1:ServerSocket_SIO");
class ServerSocket_SIO extends socket_1.default {
    constructor(socket) {
        super();
        this.socket = socket;
        this.socket.on('disconnect', () => {
            this.disconnected();
        });
        if (this.socket.connected) {
            this.connected();
        }
    }
    receive(type, handler) {
        if (this.socket) {
            this.socket.on("msg_" + type, (message, callback) => {
                try {
                    handler(message).then((result) => {
                        callback({ result });
                    }).catch((error) => {
                        callback({ error: errors.serialize(error) });
                    });
                }
                catch (error) {
                    logger.error('error handling message "' + type + '":', error);
                    callback({ error: errors.serialize(error) });
                }
            });
        }
    }
    doConnect() {
        logger.error("server side socket does not support connecting to client");
    }
    doDisconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    doSend(type, message) {
        return new Promise((resolve, reject) => {
            if (this.socket) {
                this.socket.emit('msg_' + type, message, (reply) => {
                    resolve(reply);
                });
            }
            else {
                reject(new errors.RemoError(errors.L1.RAW_SOCKET_NULL));
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
exports.default = ServerSocket_SIO;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=serversocket-sio.js.map