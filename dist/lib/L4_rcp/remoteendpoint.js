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
const endpoint_1 = __importDefault(require("./endpoint"));
const L3 = __importStar(require("../L3_presentation"));
const L1 = __importStar(require("../L1_transport"));
const L0 = __importStar(require("../L0_system"));
const errors = __importStar(require("../errors"));
const stubcreator_1 = __importDefault(require("./stubcreator"));
// create logger
const logger = new L0.Logger("L4:RemoteEndpoint");
// messages used for communication
var Message;
(function (Message) {
    Message["SETUP"] = "setup";
    Message["CALL"] = "call";
    Message["FUNC_REGISTERED"] = "func-reg";
    Message["FUNC_UNREGISTERED"] = "func-unreg";
})(Message || (Message = {}));
class RemoteEndpoint extends endpoint_1.default {
    constructor(local, socket) {
        super();
        this.local = local;
        this.socket = socket;
        this.linkstate = L1.LinkState.DISCONNECTED;
        this.serializer = new L3.Serializer();
        // add function serializer
        this.serializer.addHandler("Function", {
            serialize: (func) => {
                return this.local.internalizeFunction(func, "auto");
            }, deserialize: (id) => {
                const func = this.functions.get(id);
                if (!func) {
                    throw new errors.RemoError(errors.L4.DESER_UNKNOWN_FUNC, { func: id });
                }
                return func;
            },
        });
        this.setLinkState(this.socket.getState());
        this.socket.onstatechanged = this.socketStateChanged.bind(this);
        this.socket.receive(Message.SETUP, () => {
            // setup done, we're ready
            logger.debug("setup complete");
            this.setLinkState(L1.LinkState.CONNECTED);
            return Promise.resolve();
        });
        this.socket.receive(Message.CALL, (serialized) => {
            const msg = this.serializer.deserialize(serialized);
            return this.local.callFunction(msg.id, ...msg.args);
        });
        this.socket.receive(Message.FUNC_REGISTERED, (desc) => {
            const stub = stubcreator_1.default.createStub(desc, this.callFunction.bind(this));
            this.registerFunction(desc.id, stub);
            return Promise.resolve();
        });
        this.socket.receive(Message.FUNC_UNREGISTERED, (msg) => {
            this.unregisterFunction(msg.id);
            return Promise.resolve();
        });
    }
    shutdown() {
        this.socket.disconnect();
    }
    callFunction(id, ...args) {
        logger.debug("calling function \"" + id + "\" with", args);
        const msg = { id, args };
        const serialized = this.serializer.serialize(msg);
        return this.socket.send(Message.CALL, serialized).then((reply) => {
            logger.debug("function \"" + id + "\" returned", reply);
            if (reply.error) {
                // failed
                return Promise.reject(errors.revive(reply.error));
            }
            // success
            return reply.result;
        });
    }
    funcRegistered(desc) {
        this.socket.send(Message.FUNC_REGISTERED, desc).then((reply) => {
            if (reply && reply.error) {
                // failed
                return Promise.reject(errors.revive(reply.error));
            }
            // success
            return Promise.resolve();
        });
    }
    funcUnregistered(id) {
        this.socket.send(Message.FUNC_UNREGISTERED, { id }).then((reply) => {
            if (reply && reply.error) {
                // failed
                return Promise.reject(errors.revive(reply.error));
            }
            // success
            return Promise.resolve();
        });
    }
    setup() {
        this.socket.send(Message.SETUP, null);
    }
    socketStateChanged(state, reason) {
        // socket changed from connecting to connected?
        if (this.linkstate === L1.LinkState.CONNECTING && state === L1.LinkState.CONNECTED) {
            // yes -> we need to wait for SETUP message
            return;
        }
        // change state according to socket state
        this.setLinkState(state, reason);
    }
    setLinkState(state, reason) {
        // any actual change?
        if (state === this.linkstate) {
            // no -> nothing to do?
            return;
        }
        // update state
        this.linkstate = state;
        // notify observers
        this.emit('linkstatechanged', state, reason);
        switch (state) {
            case L1.LinkState.CONNECTED:
                this.emit('connected');
                break;
            case L1.LinkState.DISCONNECTED:
                this.emit('disconnected');
                break;
            case L1.LinkState.LINKDOWN:
                this.emit('linkdown');
                break;
            default:
            // do nothing
        }
    }
    getApi() {
        return this.api;
    }
}
exports.default = RemoteEndpoint;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=remoteendpoint.js.map