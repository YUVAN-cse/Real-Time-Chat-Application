import express from "express";
import cookieParser from "cookie-parser";
import AppError from "./utils/AppError.js";
import {authRouter} from "./routers/auth.route.js";
import { messageRouter } from "./routers/message.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173" , "http://localhost:3000"] ,
    credentials: true
}))


app.use("/users" , authRouter)
app.use("/message" , messageRouter)

app.use((req , res , next) => {
    next(new AppError(404 , "Route Not Found"))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error: err.error || null,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        timestamp: new Date().toISOString()
    });
})


export default app;