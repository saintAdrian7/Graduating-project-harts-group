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
exports.generateToken = void 0;
exports.Register = Register;
exports.Login = Login;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const Index_1 = require("../config/Index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Errors_1 = require("../Utils/Errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function Register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const Rounds = Index_1.config.server.rounds;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, Rounds);
            const savedUser = new UserModel_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return yield savedUser.save();
        }
        catch (error) {
            throw new Errors_1.UnableToSaveUserError(error.message);
        }
    });
}
;
function Login(credintials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = credintials;
        try {
            const user = yield UserModel_1.default.findOne({ email });
            if (!user) {
                throw new Errors_1.invalidEmailorPasswordError("Invalid Email");
            }
            else {
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (isMatch) {
                    return user;
                }
                else {
                    throw new Errors_1.invalidEmailorPasswordError('Invalid password');
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
const generateToken = (user) => {
    console.log(Index_1.config.server.jwtSecret);
    return jsonwebtoken_1.default.sign({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    }, Index_1.config.server.jwtSecret, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
exports.default = {};
