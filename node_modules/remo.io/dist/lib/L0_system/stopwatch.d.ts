/**
 * @license
 * Copyright (c) Daniel Pauli <dapaulid@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default class Stopwatch {
    constructor();
    start(): void;
    stop(): number;
    restart(): number;
    elapsedMs(): number;
    static now(): Date;
    startTime: Date | null;
    stopTime: Date | null;
}
