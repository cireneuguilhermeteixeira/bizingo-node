"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testserver = __importStar(require("./testserver"));
const remo = __importStar(require("../../lib"));
const chai_1 = require("chai");
const server = testserver.run(3000);
describe('integration', () => {
    it('should call an echo function', () => __awaiter(this, void 0, void 0, function* () {
        console.log("before connect");
        const remote = yield remo.createClient().connect("http://localhost:3000");
        console.log("after connect");
        chai_1.expect(yield remote.getApi().echo(1234)).to.equal(1234);
        console.log("after expect");
        server.shutdown();
        remote.shutdown();
    }));
});
//# sourceMappingURL=integration.test.js.map