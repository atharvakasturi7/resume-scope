import { useContext, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";
import { generateInterview } from "../services/resumeService";




export default function InterviewQuestions() {

  const {
    resumeFile,
    jobDescription,
    interview,
    setInterview,
  } = useContext(ResumeContext);

  useEffect(() => {
    const fetchInterview = async () => {
      const formData = new FormData();

      formData.append("resumeFile", resumeFile);
      formData.append("jobDescription", jobDescription);

      const data = await generateInterview(formData);

      console.log(data);

      setInterview(data.interviewQuestions);
    };

    fetchInterview();
  }, []);

  if (!interview) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Interview Questions</h1>

      <h3>Technical Questions</h3>
      <ol>
        {interview.technicalQuestions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ol>

      <h3>Behavioral Questions</h3>
      <ol>
        {interview.behavioralQuestions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ol>

      <h3>Project Questions</h3>
      <ol>
        {interview.projectQuestions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ol>
    </div>
  );
}
