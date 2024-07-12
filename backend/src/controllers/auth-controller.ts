import { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "../models/user-model";
import { AuthService } from "../services/auth-service";
export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
        const request: CreateUserRequest = req.body as CreateUserRequest;
        await AuthService.register(request)
        res.status(201).json('User created successfully!')
    } catch (error) {
        next(error);
    }
  }
}
