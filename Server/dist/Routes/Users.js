"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../Controllers/Users");
const router = express_1.default.Router();
router.post('/register', Users_1.handleRegister);
router.post('/login', Users_1.handleLogin);
router.get('/:userId', Users_1.getUserById);
exports.default = router;
