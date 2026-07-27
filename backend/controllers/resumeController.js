const { extractTextFromPdf, validateResumeText } = require('../services/pdfServices');
const { analyzeResume } = require('../services/aiService');
const { analyzeJobMatch } = require('../services/jobMatchService');
const { analyzeRoadmap } = require('../services/roadmapService');
const { generateInterviewQuestions } = require("../services/interviewService");
const fs = require("fs");

function deleteUploadedFile(file) {
    console.log("deleteUploadedFile() called");

    if (!file) {
        console.log("No file found.");
        return;
    }

    console.log("File path:", file.path);

    fs.unlink(file.path, (err) => {
        if (err) {
            console.error("Delete failed:", err);
        } else {
            console.log("File deleted successfully.");
        }
    });
}

const getHealth = (req, res) => {
    res.send("I am fine");
};

const getAbout = (req, res) => {
    res.send("This is about section");
};

const getResume = (req, res) => {
    let { username, id } = req.params;
    console.log(req.params);
    res.send(`This is ${username}'s resume with id : ${id}`);
};

const searchApplicant = (req, res) => {
    let { skill, level } = req.query;
    console.log(req.query);
    res.send(`search results = skill : ${skill}, level = ${level}`);
};

const uploadResume = async (req, res) => {
    console.log("--- Executing via Controller ---");
    console.log("Text Fields:", req.body);
    console.log("File Data:", req.file);

    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    try {
        // Added 'await' here to wait for the class instance to finish resolving
        const extractedText = await extractTextFromPdf(req.file.path);
        validateResumeText(extractedText);

        console.log("--- PDF Successfully Parsed ---");

        const analysis = await analyzeResume(extractedText);

        const cleanedAnalysis = analysis
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedAnalysis = JSON.parse(cleanedAnalysis);

        console.log("Parsed Analysis:");
        console.log(parsedAnalysis);

        console.log("atsScore:", typeof parsedAnalysis.atsScore);
        console.log("layoutAnalyzed:", typeof parsedAnalysis.layoutAnalyzed);
        console.log("summary:", typeof parsedAnalysis.summary);
        console.log("strengths:", Array.isArray(parsedAnalysis.strengths));
        console.log("weaknesses:", Array.isArray(parsedAnalysis.weaknesses));
        console.log("suggestions:", Array.isArray(parsedAnalysis.suggestions));

        // Validate AI response
        if (
            typeof parsedAnalysis.atsScore !== "number" ||
            typeof parsedAnalysis.layoutAnalyzed !== "boolean" ||
            typeof parsedAnalysis.summary !== "string" ||
            !Array.isArray(parsedAnalysis.strengths) ||
            !Array.isArray(parsedAnalysis.weaknesses) ||
            !Array.isArray(parsedAnalysis.suggestions)

        ) {
            throw new Error("Invalid AI response format");
        }

        return res.status(200).json({
            message: "Resume analyzed successfully",
            analysis: parsedAnalysis
        });
    } catch (error) {
        console.log("--- Resume Analysis Failed ---");
        console.error(error);

        const status = error.status || 500;

        return res.status(status).json({
            message: error.message
        });
    } finally {
          deleteUploadedFile(req.file);
    }
};


const matchResumeToJob = async (req, res) => {
    console.log("--- Job Match Analysis Started ---");

    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        const { jobDescription } = req.body;

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        const resumeText = await extractTextFromPdf(req.file.path);

        validateResumeText(resumeText);

        console.log("--- Resume Text Extracted ---");

        console.log("===== RESUME TEXT =====");
        console.log(resumeText);
        console.log("===== END RESUME TEXT =====");

        const analysis = await analyzeJobMatch(
            resumeText,
            jobDescription
        );



        return res.status(200).json({
            message: "Resume job match completed successfully",
            analysis
        });

    } catch (error) {

        console.log("--- Job Match Failed ---");
        console.error(error);

        const status = error.status || 500;
        return res.status(status).json({
            message: error.message
        });

    } finally {
         deleteUploadedFile(req.file);
    }
};

const generateCareerRoadmap = async (req, res) => {
    console.log("--- Career Roadmap Generation Started ---");

    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        const { jobDescription } = req.body;

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        const resumeText = await extractTextFromPdf(req.file.path);
        validateResumeText(resumeText);

        console.log("--- Resume Text Extracted ---");


        const roadmap = await analyzeRoadmap(
            resumeText,
            jobDescription
        );

        console.log("Career Roadmap Generated:");
        console.log(roadmap);

        if (
            !Array.isArray(roadmap.highPrioritySkills) ||
            !Array.isArray(roadmap.mediumPrioritySkills) ||
            !Array.isArray(roadmap.lowPrioritySkills) ||
            !Array.isArray(roadmap.recommendedProjects) ||
            typeof roadmap.estimatedLearningTime !== "string" ||
            typeof roadmap.potentialMatchScoreAfterLearning !== "number"
        ) {
            throw new Error("Invalid roadmap response format");
        }

        return res.status(200).json({
            message: "Career roadmap generated successfully",
            roadmap
        });

    } catch (error) {

        console.log("--- Career Roadmap Generation Failed ---");
        console.error(error);

        const status = error.status || 500;
        return res.status(status).json({
            message: error.message
        });

    } finally {
          deleteUploadedFile(req.file);
    }
};


async function generateInterviewQuestionsController(req, res) {
    try {
        // Validate uploaded resume
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        // Validate job description
        const { jobDescription } = req.body;

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        // Extract resume text
        const resumeText = await extractTextFromPdf(req.file.path);
        validateResumeText(resumeText);

        console.log("--- Resume Text Extracted ---");
        console.log("===== RESUME TEXT =====");
        console.log(resumeText);
        console.log("===== END RESUME TEXT =====");

        // Validate extracted resume text
        console.log("Step A - Resume extracted");


        console.log("Step B - Calling Interview Service");

        const interviewQuestions = await generateInterviewQuestions(
            resumeText,
            jobDescription
        );

        console.log("Step C - Interview Service Returned");
        console.log(interviewQuestions);

        // Send response
        return res.status(200).json({
            message: "Interview questions generated successfully",
            interviewQuestions
        });

    } catch (error) {
        console.log("--- Interview Question Generation Failed ---");
        console.error(error);

        const status = error.status || 500;
        return res.status(status).json({
            message: error.message
        });
    } finally {
          deleteUploadedFile(req.file);
    }

}


module.exports = {
    getHealth,
    getAbout,
    getResume,
    searchApplicant,
    uploadResume,
    matchResumeToJob,
    generateCareerRoadmap,
    generateInterviewQuestionsController
};
