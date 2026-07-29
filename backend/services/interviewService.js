const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function generateInterviewQuestions(resumeText, jobDescription) {
    try {
        console.log("Service Step 1");
        const prompt = `
You are an experienced technical interviewer.

Analyze the candidate's resume and the provided job description, then generate realistic interview questions tailored to this candidate and role.

=== RESUME ===
${resumeText}

=== JOB DESCRIPTION ===
${jobDescription}

DOMAIN AWARENESS

- Infer the candidate's domain from the resume and job description.
- Domains may include Software Engineering, Data Science, Machine Learning, Cloud, DevOps, Cybersecurity, QA, Analytics, Embedded Systems, IoT, or any other technology role.
- Tailor questions according to the candidate's experience level (student, fresher, junior, mid-level, senior).
- Do not assume expertise that is not supported by the resume.

GROUNDING RULES

- Use only information present in the resume and job description.
- Never invent skills, projects, achievements, responsibilities, or experience.
- Prefer realistic interviewer-style questions.

JOB DESCRIPTION PREPROCESSING

Before generating interview questions, identify and ignore any content that is NOT part of the actual hiring requirements.

Ignore:

- Company overview
- Company history
- About the organization
- Perks and benefits
- Salary or stipend
- Number of openings
- Internship duration
- Work location
- Application instructions
- Eligibility criteria
- "Who can apply"
- Promotional content
- Certification advertisements
- Recommended learning courses
- "Learn..." sections (for example: Learn HTML, Learn VLSI, Learn AI in Data Science)
- Suggested certifications
- Footer content
- Contact information

Generate questions ONLY from:

- Job responsibilities
- Required technical skills
- Preferred technical skills
- Technologies
- Frameworks
- Programming languages
- Engineering responsibilities
- Experience expectations

Never generate interview questions from advertisements, certification suggestions, or promotional content.

TECHNICAL QUESTIONS (Exactly 5)

- Base questions on:
  - Resume skills
  - Job description requirements
  - Skill gaps
- Include a mixture of:
  - Concept explanation
  - Implementation
  - Debugging
  - Optimization
  - Design decisions
  - Trade-offs
  - Domain-specific scenarios
If a genuine job requirement is missing from the resume, ask exploratory questions such as:
  - "Have you worked with Docker?"
  - "How would you learn Kubernetes if required?"
- Avoid trivia.

BEHAVIORAL QUESTIONS (Exactly 5)

Cover:

- Teamwork
- Communication
- Leadership
- Conflict resolution
- Adaptability
- Learning
- Deadlines

Anchor questions to resume evidence whenever possible.

PROJECT QUESTIONS (Exactly 5)

Base questions ONLY on actual resume projects.

For students and internship candidates:

Treat substantial academic projects, personal projects, hackathons, and deployed applications as meaningful engineering experience.

Ask questions that evaluate:

- Architecture
- Design decisions
- API design
- Error handling
- Scalability
- Security
- Performance
- Deployment
- Testing
- Future improvements

Do not imply that projects are less valuable simply because they were not completed in a professional environment.

Focus on:

- Architecture
- Design decisions
- Challenges
- Bugs
- Debugging
- Scalability
- Testing
- Improvements
- Lessons learned

If the resume contains very few projects, ask deeper questions about the available work instead of inventing projects.

INTERNSHIP EVALUATION RULES

If the role is an internship or entry-level position:

- Focus on problem-solving ability.
- Focus on projects.
- Focus on learning ability.
- Focus on engineering decisions.
- Do not assume industry experience is required unless explicitly stated.
- Tailor questions to evaluate internship readiness rather than senior-level experience.

QUALITY RULES

- Avoid duplicates.
- Keep wording concise.
- Mix easy, moderate, and challenging questions.
- Do not number questions.
- Do not return explanations.
- Prefer questions that encourage the candidate to explain decisions rather than memorize definitions.
- Avoid asking about technologies that are not genuine requirements of the job description.

OUTPUT

Return ONLY valid JSON.

{
  "technicalQuestions": [],
  "behavioralQuestions": [],
  "projectQuestions": []
}

Ensure:
- Exactly 5 unique questions per category.
- No markdown.
- No code fences.
- No surrounding text.
`;
        console.log("Service Step 2");
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.3,
            response_format: {
                type: "json_object",
            },
        });
        console.log("Service Step 3");
        const response = completion?.choices?.[0]?.message?.content;

        if (!response) {
            throw new Error("Empty response received from Groq.");
        }
        console.log("Service Step 4");

        const interviewData = JSON.parse(response);
        
        console.log("Service Step 5");

        const normalizeQuestions = (questions) => {
            if (!Array.isArray(questions)) return [];

            return [...new Set(
                questions
                    .filter(q => typeof q === "string")
                    .map(q => q.trim())
                    .filter(Boolean)
            )];
        };

        return {
            technicalQuestions: normalizeQuestions(interviewData.technicalQuestions),
            behavioralQuestions: normalizeQuestions(interviewData.behavioralQuestions),
            projectQuestions: normalizeQuestions(interviewData.projectQuestions),
        };

    } catch (error) {
        console.error("Interview Generation Error:", error);

        throw new Error(
            `Failed to generate interview questions: ${error.message}`
        );
    }
}

module.exports = {
    generateInterviewQuestions,
};