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
class StubCreator {
    static createDescriptor(id, func) {
        return {
            id,
            params: this.getParamNames(func).map((name) => ({ name })),
        };
    }
    static createStub(desc, handler) {
        // create function for wrapping handler function
        const stub = (...args) => handler(desc.id, ...args);
        // set function name
        const name = desc.id.substr(desc.id.lastIndexOf(".") + 1);
        Object.defineProperty(stub, 'name', {
            value: name,
        });
        // set function description
        const paramList = desc.params.map((param) => param.name).join(', ');
        Object.defineProperty(stub, 'toString', {
            value: () => `function ${name}(${paramList}) { [remote code] }`,
        });
        return stub;
    }
    static getParamNames(func) {
        return func.toString()
            .replace(/[/][/].*$/mg, '') // strip single-line comments
            .replace(/\s+/g, '') // strip white space
            .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
            .split(')', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters
            .replace(/=[^,]+/g, '') // strip any ES6 defaults
            .split(',').filter(Boolean); // split & filter [""]
    }
}
exports.default = StubCreator;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=stubcreator.js.map