const fs = require('fs');
const { PDFParse } = require('pdf-parse'); 

const extractTextFromPdf = async (filePath) => {
    try {
        // 1. Read file into a raw binary buffer
        const dataBuffer = fs.readFileSync(filePath);
        
        // 2. Initialize the parser instance
        const parser = new PDFParse({ data: dataBuffer });
        
        // 3. Call the modern async method to extract text contents
        const result = await parser.getText(); // This returns a raw string text!
        
        // 4. Safely destroy the parser instance from temporary memory
        await parser.destroy();
        
        // 5. FIXED: Return the result directly because it IS the extracted string text!
        return result.text; 
    } catch (error) {
    console.error("Error reading PDF inside service:", error);

    const pdfError = new Error(
        "The uploaded PDF is corrupted, password-protected, or unreadable. Please upload a valid PDF."
    );

    pdfError.status = 400;

    throw pdfError;
}
};

function validateResumeText(text) {
    if (!text || text.trim().length < 200) {
        const error = new Error(
            "Unable to extract sufficient text from the resume. Please upload a valid ATS-friendly PDF."
        );
        error.status = 400;
        throw error;
    }
}

module.exports = {
    extractTextFromPdf,
    validateResumeText
};
