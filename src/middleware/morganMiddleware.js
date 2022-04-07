"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../../config/logger"));
// Conficuração do Log das requisições http
const stream = {
    write: (message) => logger_1.default.http(message),
};
const skip = () => {
    const env = config_1.default.get("env") || "development";
    return env !== "development";
};
const morganMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", { stream, skip });
exports.default = morganMiddleware;
