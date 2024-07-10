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
exports.getAllCourses = getAllCourses;
exports.getOneCourse = getOneCourse;
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
exports.createModule = createModule;
exports.updateModule = updateModule;
exports.deleteModule = deleteModule;
exports.getmodules = getmodules;
exports.getModule = getModule;
const CourseModel_1 = __importDefault(require("../models/CourseModel"));
const CourseModule_1 = __importDefault(require("../models/CourseModule"));
function getAllCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Courses = yield CourseModel_1.default.find();
            return Courses;
        }
        catch (error) {
            throw error;
        }
    });
}
function getOneCourse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const course = yield CourseModel_1.default.findById(id)
                .populate('Instructor', 'firstName lastName')
                .populate('Modules');
            return course;
        }
        catch (error) {
            throw error;
        }
    });
}
function createCourse(course) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCourse = new CourseModel_1.default(course);
            const savedCourse = yield newCourse.save();
            return savedCourse;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateCourse(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedCourse = yield CourseModel_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
            return updatedCourse;
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteCourse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedCourse = yield CourseModel_1.default.findByIdAndDelete(id);
            return deletedCourse;
        }
        catch (error) {
            throw error;
        }
    });
}
function createModule(module) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newModule = new CourseModule_1.default(module);
            const savedModule = yield newModule.save();
            return savedModule;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateModule(id, module) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedModule = yield CourseModule_1.default.findByIdAndUpdate(id, { $set: module }, { new: true, runValidators: true });
            return updatedModule;
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteModule(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedModule = yield CourseModule_1.default.findByIdAndDelete(id);
            return deletedModule;
        }
        catch (error) {
            throw error;
        }
    });
}
function getmodules() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modules = yield CourseModule_1.default.find();
            return modules;
        }
        catch (error) {
            throw error;
        }
    });
}
function getModule(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const module = yield CourseModule_1.default.findById(id);
            return module;
        }
        catch (error) {
            throw error;
        }
    });
}
