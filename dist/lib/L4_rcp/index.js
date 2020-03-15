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
Object.defineProperty(exports, "__esModule", { value: true });
const serverendpoint_1 = __importDefault(require("./serverendpoint"));
exports.ServerEndpoint = serverendpoint_1.default;
const clientendpoint_1 = __importDefault(require("./clientendpoint"));
exports.ClientEndpoint = clientendpoint_1.default;
const remoteendpoint_1 = __importDefault(require("./remoteendpoint"));
exports.RemoteEndpoint = remoteendpoint_1.default;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=index.js.map