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
const debug_1 = __importDefault(require("debug"));
// string prepended to each trace
const LOGGER_PREFIX = "remo.io";
// predefined log levels
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["FATAL"] = 0] = "FATAL";
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 4] = "DEBUG";
    LogLevel[LogLevel["VERBOSE"] = 5] = "VERBOSE";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const LOG_LEVELS = [
    /* FATAL  : */ { prefix: 'FATAL', /*color: colors.red,*/ log: 'trace' },
    /* ERROR  : */ { prefix: 'ERROR', /*color: colors.red,*/ log: 'error' },
    /* WARN   : */ { prefix: 'WARN ', /*color: colors.yellow,*/ log: 'warn' },
    /* INFO   : */ { prefix: 'INFO ', /*color: colors.white,*/ log: 'info' },
    /* DEBUG  : */ { prefix: 'DEBUG', /*color: colors.magenta,*/ log: 'log' },
    /* VERBOSE: */ { prefix: 'VERB ', /*color: colors.gray,*/ log: 'log' },
];
class Logger {
    constructor(category) {
        this.category = category;
        this.dbg = debug_1.default(LOGGER_PREFIX + ':' + category);
    }
    log(level, message, ...optionalParams) {
        // check log level
        if (level > Logger.loglevel) {
            // filtered
            return;
        }
        // build message
        const ll = LOG_LEVELS[level] || {};
        const prefix = ll.prefix || level.toString();
        const log = ll.log ? console[ll.log] : console.log;
        const text = LOGGER_PREFIX + ": [ " + prefix + " ] [" + this.category + "] " + message;
        // output message
        log(text, ...optionalParams);
    }
    fatal(message, ...optionalParams) {
        this.log(LogLevel.FATAL, message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        this.log(LogLevel.ERROR, message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        this.log(LogLevel.WARN, message, ...optionalParams);
    }
    info(message, ...optionalParams) {
        this.log(LogLevel.INFO, message, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        this.dbg(message, ...optionalParams);
    }
    verbose(message, ...optionalParams) {
        this.dbg(message, ...optionalParams);
    }
}
Logger.loglevel = LogLevel.DEBUG;
exports.default = Logger;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=logger.js.map