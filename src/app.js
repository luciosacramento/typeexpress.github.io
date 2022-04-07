"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("../config/db"));
const logger_1 = __importDefault(require("../config/logger"));
const morganMiddleware_1 = __importDefault(require("./middleware/morganMiddleware"));
const app = (0, express_1.default)();
//json middleware
app.use(express_1.default.json());
app.use(morganMiddleware_1.default);
//routes
app.use("/api/", router_1.default);
//app port
const port = config_1.default.get("port");
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    logger_1.default.info(`Aplicação está funcionando na porta: ${port}`);
}));
