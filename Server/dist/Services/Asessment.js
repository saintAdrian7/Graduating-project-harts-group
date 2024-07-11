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
exports.CreateAsessmentQuestion = CreateAsessmentQuestion;
exports.updateAsessmentQuestion = updateAsessmentQuestion;
exports.deleteQuestion = deleteQuestion;
exports.getQuetions = getQuetions;
const AsessmentModel_1 = __importDefault(require("../models/AsessmentModel"));
function CreateAsessmentQuestion(question) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newQuestion = new AsessmentModel_1.default(question);
            return yield newQuestion.save();
        }
        catch (error) {
            throw error;
        }
    });
}
function updateAsessmentQuestion(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const question = yield AsessmentModel_1.default.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            });
            if (!question) {
                throw new Error(`Question with ID ${id} not found`);
            }
            return question;
        }
        catch (error) {
            console.error(`Error updating question: ${error.message}`);
            throw error;
        }
    });
}
function deleteQuestion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield AsessmentModel_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw error;
        }
    });
}
function getQuetions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield AsessmentModel_1.default.find();
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
