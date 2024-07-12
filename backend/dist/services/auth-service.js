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
exports.AuthService = void 0;
const error_1 = require("../error/error");
const user_model_1 = require("../models/user-model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "abc123";
class AuthService {
    static register(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield (0, user_model_1.findByUsername)(userDTO.username);
            if (existingUser) {
                throw new error_1.ResponseError(http_status_1.default.BAD_REQUEST, "Email already taken");
            }
            userDTO.password = yield bcryptjs_1.default.hashSync(userDTO.password, 10);
            const userRegister = yield (0, user_model_1.createUser)(userDTO);
            return userRegister;
        });
    }
    static login(loginDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, user_model_1.findByUsername)(loginDTO.username);
            if (!user) {
                throw new error_1.ResponseError(http_status_1.default.UNAUTHORIZED, "User not found");
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(loginDTO.password, user.password);
            if (!isPasswordValid) {
                throw new error_1.ResponseError(http_status_1.default.UNAUTHORIZED, "Password is wrong");
            }
            const token = yield jsonwebtoken_1.default.sign({ id: user.id }, SECRET_KEY, {
                expiresIn: "1h",
            });
            return {
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                },
                token: token,
            };
        });
    }
}
exports.AuthService = AuthService;
