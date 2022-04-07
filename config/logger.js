"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const winston_1 = __importDefault(require("winston"));
//Configuração do Log da aplicação
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
const level = () => {
    const env = config_1.default.get("env") || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warm";
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};
winston_1.default.addColors(colors);
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp} - ${info.level} - ${info.message}`));
const transports = [
    new winston_1.default.transports.Console(),
    new winston_1.default.transports.File({
        filename: "logs/error.log",
        level: "error", //cria documento com apenas logs de 'erro'
    }),
    new winston_1.default.transports.File({ filename: 'logs/all.log' }), //cria documento com todos os logs
];
const Logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports
});
exports.default = Logger;
