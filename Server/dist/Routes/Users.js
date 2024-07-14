"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../Controllers/Users");
const router = express_1.default.Router();
const Validation_1 = require("../middleware/Validation");
router.post('/register', (0, Validation_1.validateSchema)(Validation_1.Schemas.user.create, 'body'), Users_1.handleRegister);
router.post('/login', (0, Validation_1.validateSchema)(Validation_1.Schemas.user.login, 'body'), Users_1.handleLogin);
router.get('/:userId', Users_1.getUserById);
exports.default = router;
