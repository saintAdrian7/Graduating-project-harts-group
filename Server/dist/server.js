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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Index_1 = require("./config/Index");
const Users_1 = __importDefault(require("./Routes/Users"));
const Course_1 = __importDefault(require("./Routes/Course"));
const Module_1 = __importDefault(require("./Routes/Module"));
const Update_1 = __importDefault(require("./Routes/Update"));
const Asessment_1 = __importDefault(require("./Routes/Asessment"));
const PORT = Index_1.config.server.port;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(function startup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(Index_1.config.mongo.url);
            console.log("Connected to the database successfully");
            app.use('/users', Users_1.default);
            app.use('/Courses', Course_1.default);
            app.use('/modules', Module_1.default);
            app.use('/update', Update_1.default);
            app.use('/Asessments', Asessment_1.default);
        }
        catch (error) {
            console.log("Could not make a connection to the database");
            console.error(error);
        }
    });
})();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
