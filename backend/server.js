
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://resume-scope-lac.vercel.app",
        ],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { globalLogger } = require("./middleware/loggerMiddleware");
app.use(globalLogger);

// Routes
const userRoutes = require("./route/resumeRoutes");
app.use("/", userRoutes);

// View Engine
app.set("view engine", "ejs");

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        application: "ResumeScope API",
        status: "Running",
        version: "1.0.0",
        message: "Welcome to the ResumeScope Backend API 🚀",
        endpoints: {
            health: "/health",
            uploadResume: "/resume/upload",
            jobMatch: "/resume/match-job",
            careerRoadmap: "/resume/career-roadmap",
            interviewQuestions: "/resume/interview"
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const multer = require("multer");

app.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            message: err.message
        });
    }

    if (err) {
        return res.status(err.status || 400).json({
            message: err.message
        });
    }

    next();
});