import ResumeContext from "../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./ATSDashboard.css";
import Card from "../components/Card";
import Button from "../components/Button";


export default function ATSDashboard() {
  const { resumeFile, ats } = useContext(ResumeContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (!resumeFile || !ats) {
      navigate("/");
    }

  }, [resumeFile, ats, navigate]);


  if (!ats) {
    return null;
  }


  return (
  <div className="ats-dashboard">

    <Card>

      <div className="score-circle">
        {ats.atsScore}%
      </div>

      <h1 className="dashboard-title">
        ATS Analysis Report
      </h1>

      <div className="dashboard-section">
        <h2>Professional Summary</h2>
        <p>{ats.summary}</p>
      </div>

      <div className="dashboard-section">
        <h2>Strengths</h2>
        <ol>
          {ats.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ol>
      </div>

      <div className="dashboard-section">
        <h2>Weaknesses</h2>
        <ol>
          {ats.weaknesses.map((weakness, index) => (
            <li key={index}>{weakness}</li>
          ))}
        </ol>
      </div>

      <div className="dashboard-section">
        <h2>Suggestions</h2>
        <ol>
          {ats.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ol>
      </div>

      <Button
        text="Analyze Job Match"
        onClick={() => navigate("/job-match")}
      />

    </Card>

  </div>
);
}