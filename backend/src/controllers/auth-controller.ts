import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest } from "../models/user-model";
import { AuthService } from "../services/auth-service";
export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      await AuthService.register(request);
      res.status(201).json("User created successfully!");
    } catch (error) {
      next(error);
    }
  }
  static async login(req:Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const result = await AuthService.login(request)
      return res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }
}
