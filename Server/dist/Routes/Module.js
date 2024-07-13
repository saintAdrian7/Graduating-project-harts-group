"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Course_1 = require("../Controllers/Course");
const Auth_1 = require("../middleware/Auth");
const router = express_1.default.Router();
router.get('/', Auth_1.authenticateToken, Course_1.getAllModules);
router.get('/:id', Auth_1.authenticateToken, Course_1.getOneModule);
router.post('/', Auth_1.authenticateToken, Course_1.CreateModule);
router.patch('/:id', Auth_1.authenticateToken, Course_1.UpdateModule);
router.delete('/:id', Auth_1.authenticateToken, Course_1.DeleteModule);
exports.default = router;
