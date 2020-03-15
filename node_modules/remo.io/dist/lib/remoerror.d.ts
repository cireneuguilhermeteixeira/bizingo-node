/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface IErrorDesc {
    label: string;
    code: number;
    text: string;
}
export default class RemoError extends Error implements IErrorDesc {
    constructor(err: IErrorDesc, details?: any);
    label: string;
    code: number;
    text: string;
    details: any;
}
export {};
