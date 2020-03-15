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
class Stopwatch {
    constructor() {
        this.startTime = null;
        this.stopTime = null;
        this.start();
    }
    start() {
        this.startTime = Stopwatch.now();
        this.stopTime = null;
    }
    stop() {
        if (!this.startTime) {
            return 0;
        }
        this.stopTime = Stopwatch.now();
        return this.elapsedMs();
    }
    restart() {
        const elapsed = this.stop();
        this.start();
        return elapsed;
    }
    elapsedMs() {
        if (!this.startTime) {
            return 0;
        }
        const current = this.stopTime || Stopwatch.now();
        return current.getTime() - this.startTime.getTime();
    }
    static now() {
        return new Date();
    }
}
exports.default = Stopwatch;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=stopwatch.js.map