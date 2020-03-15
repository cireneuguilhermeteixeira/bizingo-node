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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file is the entry point for browserify and populates the global "remo"
 * object in the browser.
 */
const L4_rcp_1 = require("./L4_rcp");
/** creates a new client instance */
function createClient() {
    return new L4_rcp_1.ClientEndpoint();
}
exports.createClient = createClient;
/** default client instance */
exports.client = createClient();
/** default server stub */
exports.server = null;
/** accessor for default server using promise */
function getServer() {
    if (exports.server == null) {
        return exports.client.connect().then((srv) => {
            exports.server = srv;
            return exports.server;
        });
    }
    else {
        return Promise.resolve(exports.server);
    }
}
exports.getServer = getServer;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=browser.js.map