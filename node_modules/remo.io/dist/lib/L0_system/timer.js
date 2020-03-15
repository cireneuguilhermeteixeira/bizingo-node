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
class Timer {
    constructor(interval, callback) {
        this.interval = interval;
        this.callback = callback;
        this.handle = null;
    }
    start() {
        if (!this.handle) {
            this.handle = setTimeout(this.callback, this.interval);
        }
    }
    stop() {
        if (this.handle) {
            clearTimeout(this.handle);
            this.handle = null;
        }
    }
    restart() {
        this.stop();
        this.start();
    }
}
exports.default = Timer;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=timer.js.map