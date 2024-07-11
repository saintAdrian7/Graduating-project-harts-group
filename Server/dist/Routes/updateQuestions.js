"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Course_1 = require("../Controllers/Course");
const router = express_1.default.Router();
router.get('/:id', Course_1.updateCourseWithAssessments);
exports.default = router;
