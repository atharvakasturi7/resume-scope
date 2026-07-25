import { useContext, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";
import { generateInterview } from "../services/resumeService";
import Loader from "../components/Loader";
import { getErrorMessage } from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";


export default function InterviewQuestions() {
const navigate = useNavigate();
  const {
    resumeFile,
    jobDescription,
    interview,
    setInterview,
    loading,
    setLoading,
  } = useContext(ResumeContext);

  useEffect(() => {

    if (!resumeFile || !jobDescription) {
    navigate("/job-match", { replace: true });
    return;
}

    const fetchInterview = async () => {
      
      const formData = new FormData();

      formData.append("resumeFile", resumeFile);
      formData.append("jobDescription", jobDescription);

      try {

        setLoading(true);

        const data = await generateInterview(formData);

        setInterview(data.interviewQuestions);

      } catch (error) {

        console.error(error);

        alert(getErrorMessage(error));

      } finally {

        setLoading(false);

      }
    };

    fetchInterview();
  }, [
  resumeFile,
  jobDescription,
  navigate,
  setLoading,
  setInterview,
]);

  if (loading) {
    return (
      <Loader message="Generating Interview Questions..." />
    );
  }

  if (!interview) {
    return null;
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
