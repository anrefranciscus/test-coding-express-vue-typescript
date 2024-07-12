import { ResponseError } from "../error/error";
import {
  CreateUserRequest,
  LoginUserRequest,
  createUser,
  findByEmail,
} from "../models/user-model";
import bcrypt from "bcryptjs";
import HttpStatus from "http-status";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "abc123";
export class AuthService {
  static async register(userDTO: CreateUserRequest) {
    const existingUser = await findByEmail(userDTO.email);
    if (existingUser) {
      throw new ResponseError(HttpStatus.BAD_REQUEST, "Email already taken");
    }
    userDTO.password = await bcrypt.hashSync(userDTO.password, 10);
    const userRegister = await createUser(userDTO);
    return userRegister;
  }
  static async login(loginDTO: LoginUserRequest) {
    const user = await findByEmail(loginDTO.email);

    if (!user) {
      throw new ResponseError(HttpStatus.UNAUTHORIZED, "User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      loginDTO.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(HttpStatus.UNAUTHORIZED, "Password is wrong");
    }
    const token = await jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    };
  }
}
