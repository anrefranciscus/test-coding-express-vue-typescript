"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./routes/auth-router");
const error_1 = require("./error/error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/api/auth", auth_router_1.authRouter);
app.use((err, req, res, next) => {
    if (err instanceof error_1.ResponseError) {
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
