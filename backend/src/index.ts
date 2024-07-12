import express, { Application } from "express";
import { authRouter } from "./routes/auth-router";

const app: Application = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRouter)