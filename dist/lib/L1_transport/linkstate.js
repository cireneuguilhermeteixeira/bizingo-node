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
var LinkState;
(function (LinkState) {
    LinkState["DISCONNECTED"] = "DISCONNECTED";
    LinkState["CONNECTING"] = "CONNECTING";
    LinkState["CONNECTED"] = "CONNECTED";
    LinkState["DISCONNECTING"] = "DISCONNECTING";
    LinkState["LINKDOWN"] = "LINKDOWN";
    LinkState["RECONNECTING"] = "RECONNECTING";
})(LinkState || (LinkState = {}));
exports.default = LinkState;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=linkstate.js.map