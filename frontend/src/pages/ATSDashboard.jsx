import { useContext } from "react";
import ResumeContext from "../context/ResumeContext";
import { useNavigate } from "react-router-dom";

export default function ATSDashboard() {
  const { ats } = useContext(ResumeContext);
  const navigate = useNavigate();

  if (!ats) {
    return <h2>No analysis available.</h2>;
  }


  return (


    <div className="ats-dashboard">
      <h2>ATS Score: {ats.atsScore}%</h2>

      <h3>Summary</h3>
      <p>{ats.summary}</p>

      <h3>Strengths</h3>
      <ol>
        {ats.strengths.map((strength, index) => (
          <li key={index}>{strength}</li>
        ))}
      </ol>

      <h3>Weaknesses</h3>
      <ol>
        {ats.weaknesses.map((weakness, index) => (
          <li key={index}>{weakness}</li>
        ))}
      </ol>

      <h3>Suggestions</h3>
      <ol>
        {ats.suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ol>

      <button onClick={() => navigate("/job-match")}>
        Analyze Job Match
      </button>

    </div>
  );
}