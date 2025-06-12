import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin: [
            process.env.BASE_URL,
            "http://127.0.0.1:5173",
            "http://localhost:5173/signup",
            "http://localhost:5173",
        ],
        credentials: true,
        methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        exposedHeaders: ["Set-Cookie", "*"],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// router imports

import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";

app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);

export default app;
