import { NextFunction, Request, Response } from "express";
import express, { Application } from "express";
import { authRouter } from "./routes/auth-router";
import { ResponseError } from "./error/error";
import cors from "cors";
const app: Application = express();

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ResponseError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  return res.status(500).json({
    statusCode: 500,
    message: err.message,
  });
});
