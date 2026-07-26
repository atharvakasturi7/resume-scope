import { useContext, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";
import { generateInterview } from "../services/resumeService";
import Loader from "../components/Loader";
import { getErrorMessage } from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import "./InterviewQuestions.css";
import Card from "../components/Card";

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
      try {

        setLoading(true);

        const formData = new FormData();
        formData.append("resumeFile", resumeFile);
        formData.append("jobDescription", jobDescription);

        const data = await generateInterview(formData);

        setInterview(data.interviewQuestions);

      } catch (error) {

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
    <div className="interview-page">
      <Card>
        <h1 className="page-title">Interview Questions</h1>
        <div className="interview-content">
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
      </Card>
    </div>
  );
}
