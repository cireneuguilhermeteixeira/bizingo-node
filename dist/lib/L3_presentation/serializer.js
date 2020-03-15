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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors = __importStar(require("./errors"));
const remoerror_1 = __importDefault(require("../remoerror"));
function isRefType(v) {
    return (typeof v === 'object' || typeof v === 'function') && v !== null;
}
function isArray(v) {
    return Array.isArray(v);
}
class Serializer {
    constructor() {
        this.handler = new Map();
        this.constToValue = new Map();
        this.valueToConst = new Map();
        // register handlers
        this.addHandler("Object", {
            serialize: (obj) => {
                const serialized = {};
                for (const key of Object.keys(obj)) {
                    serialized[key] = this.serialize(obj[key]);
                }
                return serialized;
            }, deserialize: (serialized) => {
                const obj = {};
                for (const key of Object.keys(serialized)) {
                    obj[key] = this.deserialize(serialized[key]);
                }
                return obj;
            },
        });
        this.addHandler("Date", {
            serialize: (date) => {
                return date.toJSON();
            }, deserialize: (serialized) => {
                return new Date(serialized !== null ? serialized : "invalid");
            },
        });
        // add special values as constants
        this.addConst("NaN", NaN);
        this.addConst("Infinity", Infinity);
        this.addConst("-Infinity", -Infinity);
        this.addConst("undefined", undefined);
    }
    serialize(value) {
        // handle constants (NaN, Infinity, undefined, ...)
        const constname = this.valueToConst.get(value);
        if (constname) {
            return { const: constname };
        }
        if (isRefType(value)) {
            // handle object
            if (isArray(value)) {
                return value.map(this.serialize, this);
            }
            else {
                const ctorname = value.constructor.name;
                const handler = this.handler.get(ctorname);
                if (!handler) {
                    throw new remoerror_1.default(errors.SER_UNKNOWN_CLASS, { classname: ctorname });
                }
                return {
                    [ctorname]: handler.serialize(value),
                };
            }
        }
        else {
            // handle primitive
            return value;
        }
    }
    deserialize(serialized) {
        if (isRefType(serialized)) {
            // handle object
            if (isArray(serialized)) {
                return serialized.map(this.deserialize, this);
            }
            else {
                const keys = Object.keys(serialized);
                if (keys.length !== 1) {
                    throw new remoerror_1.default(errors.SERIALIZED_BAD_PROP);
                }
                const typename = keys[0];
                const value = serialized[typename];
                // handle constants (NaN, Infinity, undefined, ...)
                if (typename === 'const' && typeof value === 'string') {
                    const constvalue = this.constToValue.get(value);
                    if (!constvalue && this.valueToConst.get(constvalue) !== value) {
                        throw new remoerror_1.default(errors.DESER_UNKNOWN_CONST, { constname: value });
                    }
                    return constvalue;
                }
                const handler = this.handler.get(typename);
                if (!handler) {
                    throw new remoerror_1.default(errors.DESER_UNKNOWN_CLASS, { classname: typename });
                }
                return handler.deserialize(value);
            }
        }
        else {
            // handle primitive
            return serialized;
        }
    }
    addHandler(name, serializer) {
        this.handler.set(name, serializer);
    }
    addConst(name, value) {
        this.constToValue.set(name, value);
        this.valueToConst.set(value, name);
    }
}
exports.default = Serializer;
//------------------------------------------------------------------------------
// end of file
//------------------------------------------------------------------------------
//# sourceMappingURL=serializer.js.map