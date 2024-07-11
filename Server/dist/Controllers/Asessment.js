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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuestion = exports.UpdateQuestion = exports.CreateQuestion = exports.getAllQuestions = void 0;
const Asessment_1 = require("../Services/Asessment");
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const Questions = yield (0, Asessment_1.getQuetions)(id);
        if (!Questions || Questions.length === 0) {
            return res.status(404).json({ message: 'No assessments found for this course.' });
        }
        return res.status(200).json({ message: "Questions fetch success", Questions });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch questions at this time", error: error.message });
    }
});
exports.getAllQuestions = getAllQuestions;
const CreateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { question, answers, correctAnswer } = req.body;
    try {
        if (!question || !answers || !correctAnswer) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const questionData = {
            question,
            answers,
            correctAnswer,
            course: courseId
        };
        const newQuestion = yield (0, Asessment_1.CreateAsessmentQuestion)(questionData);
        return res.status(201).json({ message: "Question created successfully", question: newQuestion });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to create question at this time", error: error.message });
    }
});
exports.CreateQuestion = CreateQuestion;
const UpdateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, answers, correctAnswer } = req.body;
    const questionId = req.params.id;
    try {
        const questionData = {
            question,
            answers,
            correctAnswer
        };
        const updatedQuestion = yield (0, Asessment_1.updateAsessmentQuestion)(questionId, questionData);
        return res.status(200).json({ message: "Question updated successfully", question: updatedQuestion });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to update question at this time", error: error.message });
    }
});
exports.UpdateQuestion = UpdateQuestion;
const DeleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionId = req.params.id;
    try {
        yield (0, Asessment_1.deleteQuestion)(questionId);
        return res.status(200).json({ message: "Question deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to delete question at this time", error: error.message });
    }
});
exports.DeleteQuestion = DeleteQuestion;
