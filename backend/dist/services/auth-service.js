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
class AuthService {
    static register(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield (0, user_model_1.findByUsername)(userDTO.email);
            if (existingUser) {
                throw new error_1.ResponseError(http_status_1.default.BAD_REQUEST, "Email already taken");
            }
            userDTO.password = yield bcryptjs_1.default.hashSync(userDTO.password, 10);
            const userRegister = yield (0, user_model_1.createUser)(userDTO);
            return userRegister;
        });
    }
    static login(loginDTO) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AuthService = AuthService;
