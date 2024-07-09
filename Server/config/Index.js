"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;
const ROUNDS = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : 10;
exports.config = {
    mongo: {
        url: MONGO_URI
    },
    server: {
        port: PORT,
        rounds: ROUNDS
    }
};
