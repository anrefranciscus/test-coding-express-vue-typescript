import { ResponseError } from "../error/error";
import {
  CreateUserRequest,
  LoginUserRequest,
  createUser,
  findByUsername,
} from "../models/user-model";
import bcrypt from "bcryptjs";
import HttpStatus from "http-status";
export class AuthService {
  static async register(userDTO: CreateUserRequest) {
    const existingUser = await findByUsername(userDTO.email);
    if (existingUser) {
      throw new ResponseError(HttpStatus.BAD_REQUEST, "Email already taken");
    }
    userDTO.password = await bcrypt.hashSync(userDTO.password, 10);
    const userRegister = await createUser(userDTO);
    return userRegister;
  }
  static async login(loginDTO: LoginUserRequest) {}
}
