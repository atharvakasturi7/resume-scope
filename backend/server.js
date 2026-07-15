
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

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
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

