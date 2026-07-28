
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

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
    res.send("Hello World!");
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