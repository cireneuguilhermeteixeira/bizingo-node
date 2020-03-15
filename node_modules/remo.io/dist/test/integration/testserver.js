"use strict";
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
const remo = __importStar(require("../../lib"));
const http_1 = __importDefault(require("http"));
function run(port) {
    const httpServer = http_1.default.createServer();
    /*
        configure and create remo server
    */
    // define functions the server should expose to the client
    const api = {
        echo: (param) => param,
    };
    const testserver = remo.createServer({ httpServer, api });
    /*
        serve clients
    */
    console.log("before listening...");
    httpServer.listen(3000, () => {
        console.log("\ntestserver running");
    });
    return {
        shutdown: () => {
            testserver.shutdown();
            httpServer.close();
        },
    };
}
exports.run = run;
//# sourceMappingURL=testserver.js.map