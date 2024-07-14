"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Course_1 = require("../Controllers/Course");
const router = express_1.default.Router();
router.get('/', Course_1.getCourses);
router.get('/:id', Course_1.getCourse);
router.patch('/:id', Course_1.UpdateCourse);
router.delete('/:id', Course_1.DeleteCourse);
router.post('/', Course_1.CreateCourse);
router.get('/search?', Course_1.searchCourse);
router.get('/courses/search', Course_1.handleSearch);
exports.default = router;
