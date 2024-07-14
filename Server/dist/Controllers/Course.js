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
exports.handleSearch = exports.updateCourseWithAssessments = exports.updateCourseWithModules = exports.DeleteModule = exports.UpdateModule = exports.CreateModule = exports.getOneModule = exports.getAllModules = exports.DeleteCourse = exports.UpdateCourse = exports.CreateCourse = exports.getCourse = exports.getCourses = void 0;
const CourseModel_1 = __importDefault(require("../models/CourseModel"));
const Course_1 = require("../Services/Course");
const CourseModuleModel_1 = __importDefault(require("../models/CourseModuleModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const AsessmentModel_1 = __importDefault(require("../models/AsessmentModel"));
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Courses = yield (0, Course_1.getAllCourses)();
        return res.status(200).json(Courses);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to get courses at this time", error: error.message });
    }
});
exports.getCourses = getCourses;
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const Course = yield (0, Course_1.getOneCourse)(id);
        if (!Course) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json(Course);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to get course at this time", error: error.message });
    }
});
exports.getCourse = getCourse;
const CreateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, Instructor } = req.body;
    try {
        const newCourse = new CourseModel_1.default({
            title,
            description,
            Instructor
        });
        const savedCourse = yield newCourse.save();
        return res.status(201).json({ message: 'Course created successfully', courseId: savedCourse._id });
    }
    catch (error) {
        return res.status(500).json({ message: 'Unable to create course at this time', error: error.message });
    }
});
exports.CreateCourse = CreateCourse;
const UpdateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { updateData } = req.body;
    try {
        const updatedCourse = yield (0, Course_1.updateCourse)(id, updateData);
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course updated", updatedCourse });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to update course at this time", error: error.message });
    }
});
exports.UpdateCourse = UpdateCourse;
const DeleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const DeletedCourse = (0, Course_1.deleteCourse)(id);
        if (!DeletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course deleted", DeletedCourse });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error occured could not delete course" });
    }
});
exports.DeleteCourse = DeleteCourse;
const getAllModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modules = yield (0, Course_1.getmodules)();
        return res.status(200).json({ message: "Modules fetched", modules });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch modules at this time", error: error.message });
    }
});
exports.getAllModules = getAllModules;
const getOneModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const module = yield (0, Course_1.getModule)(id);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        return res.status(200).json({ message: "Module fetched", module });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch module at this time", error: error.message });
    }
});
exports.getOneModule = getOneModule;
const CreateModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { module } = req.body;
    console.log(module);
    try {
        const CreatedModule = yield (0, Course_1.createModule)(module);
        if (!CreatedModule) {
            return res.status(404).json({ message: "Module not created" });
        }
        return res.status(200).json({ message: "Module created", CreatedModule });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to create module at this time", error: error.message });
    }
});
exports.CreateModule = CreateModule;
const UpdateModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { updateData } = req.body;
    try {
        const updatedModule = yield (0, Course_1.updateModule)(id, updateData);
        if (!updatedModule) {
            return res.status(404).json({ message: "Module not found" });
        }
        return res.status(200).json({ message: "Module updated", updatedModule });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to update module at this time", error: error.message });
    }
});
exports.UpdateModule = UpdateModule;
const DeleteModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedModule = yield (0, Course_1.deleteModule)(id);
        if (!deletedModule) {
            return res.status(404).json({ message: "Module not found" });
        }
        return res.status(200).json({ message: "Module deleted", deletedModule });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to delete module at this time", error: error.message });
    }
});
exports.DeleteModule = DeleteModule;
const updateCourseWithModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: courseId } = req.params;
    try {
        const courseObjectId = new mongoose_1.default.Types.ObjectId(courseId);
        const modules = yield CourseModuleModel_1.default.find({ course: courseObjectId });
        if (!modules || modules.length === 0) {
            return res.status(404).json({ message: 'No modules found.' });
        }
        const moduleIds = modules.map(module => module._id);
        const updatedCourse = yield CourseModel_1.default.findByIdAndUpdate(courseId, { $set: { Modules: moduleIds } }, { new: true }).populate('Modules');
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.status(200).json(updatedCourse);
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Unable to update course at this time.', error: error.message });
    }
});
exports.updateCourseWithModules = updateCourseWithModules;
const updateCourseWithAssessments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: courseId } = req.params;
    try {
        const courseObjectId = new mongoose_1.default.Types.ObjectId(courseId);
        const assessments = yield AsessmentModel_1.default.find({ course: courseObjectId });
        if (!assessments || assessments.length === 0) {
            return res.status(404).json({ message: 'No assessments found for this course.' });
        }
        const assessmentIds = assessments.map(assessment => assessment._id);
        const updatedCourse = yield CourseModel_1.default.findByIdAndUpdate(courseId, { $set: { Asessments: assessmentIds } }, { new: true }).populate('Asessments');
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.status(200).json(updatedCourse);
    }
    catch (error) {
        console.error('Error updating course with assessments:', error);
        res.status(500).json({ message: 'Unable to update course with assessments at this time.', error: error.message });
    }
});
exports.updateCourseWithAssessments = updateCourseWithAssessments;
const handleSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    try {
        const courses = yield CourseModel_1.default.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { 'Instructor.firstName': { $regex: query, $options: 'i' } },
                { 'Instructor.lastName': { $regex: query, $options: 'i' } },
            ]
        }).populate('Instructor', 'firstName lastName');
        res.json(courses);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.handleSearch = handleSearch;
