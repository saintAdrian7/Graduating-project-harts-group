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
exports.handleRegister = handleRegister;
exports.handleLogin = handleLogin;
const Users_1 = require("../Services/Users");
const Errors_1 = require("../Utils/Errors");
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const registeredUser = yield (0, Users_1.Register)(user);
            res.status(200).json({
                message: "Successfully registered user",
                user: {
                    id: registeredUser._id,
                    firstName: registeredUser.firstName,
                    lastName: registeredUser.lastName,
                    email: registeredUser.email,
                }
            });
        }
        catch (error) {
            if (error.message.includes("E11000 duplicate key error collection")) {
                res.status(409).json({ message: "User with email already exists", error: error.message });
            }
            else {
                res.status(500).json({ message: "Unable to register User", error: error.message });
            }
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credintials = req.body;
        try {
            const user = yield (0, Users_1.Login)(credintials);
            res.status(200).json({
                message: "Successfully logged in",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }
            });
        }
        catch (error) {
            if (error instanceof Errors_1.invalidEmailorPasswordError) {
                res.status(409).json({ message: "Unable to login user at this time", error: error.message });
            }
            else {
                res.status(500).json({ message: "Unable to login user try again later", error: error.message });
            }
        }
    });
}
