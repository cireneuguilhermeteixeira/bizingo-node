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
const events_1 = require("events");
// create logger
const logger = new L0.Logger("L4:Endpoint");
class Endpoint extends events_1.EventEmitter {
    constructor() {
        super();
        this.functions = new Map();
        this.api = {};
    }
    registerFunction(id, func) {
        logger.debug("registering function: " + id);
        this.functions.set(id, func);
        // select api object according to id path
        let api = this.api;
        let parent = null;
        let name = null;
        // select parent
        for (const part of id.split('.')) {
            parent = name;
            if (parent) {
                // create new object if not existing
                if (api[parent] == null) {
                    api[parent] = {};
                }
                // move down
                api = api[parent];
            }
            name = part;
        }
        // add to api object
        if (name) {
            api[name] = func;
        }
    }
    unregisterFunction(id) {
        logger.debug("unregistering function: " + id);
        return this.functions.delete(id);
    }
}
exports.default = Endpoint;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=endpoint.js.map