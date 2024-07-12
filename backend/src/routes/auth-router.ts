import express from "express";
import { AuthController } from "../controllers/auth-controller";


export const authRouter = express.Router()

authRouter.post("/signup", AuthController.register)
authRouter.post("/signin", AuthController.login)