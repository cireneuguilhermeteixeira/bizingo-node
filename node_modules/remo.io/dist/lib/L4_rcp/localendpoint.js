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
const remoteendpoint_1 = __importDefault(require("./remoteendpoint"));
const stubcreator_1 = __importDefault(require("./stubcreator"));
const L0 = __importStar(require("../L0_system"));
const errors = __importStar(require("../errors"));
// create logger
const logger = new L0.Logger("L4:LocalEndpoint");
class LocalEndpoint extends endpoint_1.default {
    constructor() {
        super();
        this.remotes = new Set();
        this.funcToId = new WeakMap();
        this.nextAnonymousNum = 0;
    }
    registerFunction(id, func) {
        super.registerFunction(id, func);
        // remember function
        // TODO move to base
        // TODO unregister?
        this.funcToId.set(func, id);
        // update remotes
        const desc = stubcreator_1.default.createDescriptor(id, func);
        this.remotes.forEach((remote) => {
            remote.funcRegistered(desc);
        });
    }
    registerFunctions(baseid, obj) {
        // iterate over properties
        for (const name of Object.keys(obj)) {
            const prop = obj[name];
            // skip nulls
            if (!prop) {
                continue;
            }
            // build full id
            const id = baseid ? baseid + '.' + name : name;
            // check property type
            const type = typeof prop;
            if (type === 'function') {
                // register function
                this.registerFunction(id, prop);
            }
            else if (type === 'object') {
                // recurse
                this.registerFunctions(id, prop);
            }
            else {
                // ignore
                logger.verbose("Skipping property " + id + " of type '" + type + '"');
            }
        }
    }
    unregisterFunction(id) {
        if (!super.unregisterFunction(id)) {
            return false;
        }
        this.remotes.forEach((remote) => {
            remote.funcUnregistered(id);
        });
        // success
        return true;
    }
    internalizeFunction(func, prefix) {
        // do we already know this function?
        let id = this.funcToId.get(func);
        if (!id) {
            // no -> create unique id and add it
            id = (prefix || "") + '#' + this.nextAnonymousNum++;
            this.registerFunction(id, func);
        }
        return id;
    }
    getFunctionId(func) {
        return this.funcToId.get(func);
    }
    callFunction(id, ...args) {
        logger.debug("calling function \"" + id + "\" with", args);
        return new Promise((resolve, reject) => {
            const func = this.functions.get(id);
            if (func) {
                resolve(func.apply(this, args));
            }
            else {
                reject(new errors.RemoError(errors.L4.FUNC_NOT_FOUND, { id }));
            }
        });
    }
    shutdown() {
        console.log("LocalEndpoint shutting down");
    }
    createRemoteEndpoint(socket) {
        return new Promise((resolve, reject) => {
            const remote = new remoteendpoint_1.default(this, socket);
            this.remotes.add(remote);
            logger.debug("RemoteEndpoint created");
            // send function descriptors
            this.functions.forEach((func, id) => {
                const desc = stubcreator_1.default.createDescriptor(id, func);
                remote.funcRegistered(desc);
            });
            // signal setup complete
            remote.once('connected', () => {
                resolve(remote);
            });
            remote.setup();
        });
    }
    createFunctionId(func) {
        // NOTE: do NOT use func.name due to unexpected results (e.g. console.log -> "bound consoleCall") and minification
        return "TODO"; // func.name;
    }
}
exports.default = LocalEndpoint;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=localendpoint.js.map