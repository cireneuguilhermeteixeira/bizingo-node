/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as types from './types';
export default class StubCreator {
    static createDescriptor(id: string, func: Function): types.IFuncDesc;
    static createStub(desc: types.IFuncDesc, handler: (id: string, ...args: any) => Promise<any>): types.StubFunction;
    private static getParamNames;
}
