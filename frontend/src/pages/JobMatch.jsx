import { useContext, useEffect, useState } from "react";
import ResumeContext from "../context/ResumeContext";
import { matchJob } from "../services/resumeService";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getErrorMessage } from "../utils/errorHandler";
import "./JobMatch.css";
import Card from "../components/Card";
import Button from "../components/Button";

export default function JobMatch() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const {
    resumeFile,
    jobMatch,
    setJobDescription: setContextJobDescription,
    setJobMatch,
    loading,
    setLoading,
  } = useContext(ResumeContext);

  useEffect(() => {

    if (!resumeFile) {
      navigate("/", { replace: true });
    }

  }, [resumeFile, navigate]);

  if (loading) {
    return <Loader message="Analyzing Job Match..." />;
  }

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a Job Description.");
      return;
    }
    setContextJobDescription(jobDescription);
    const formData = new FormData();

    formData.append("resumeFile", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {

      setLoading(true);

      const data = await matchJob(formData);

      setJobMatch(data.analysis);

    } catch (error) {

      alert(getErrorMessage(error));

    }
    finally {

      setLoading(false);

    }
  };


  return (
    <div className="job-match-page">
      <Card>
        <h1 className="page-title">Job Match</h1>

        {!jobMatch && (
          <>
            <textarea
              className="job-description-input"
              placeholder="Paste the Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={12}
            />

            <br /><br />

            <Button
              text="Analyze Job Match"
              onClick={handleAnalyze}
            />
          </>
        )}


        {jobMatch && (
          <div className="results-section">

            <h2>🎯 Match Overview</h2>

            <h3>Match Score: {jobMatch.matchScore}%</h3>

            <h3>Match Level: {jobMatch.matchLevel}</h3>

            <h3>Seniority Alignment: {jobMatch.seniorityAlignment}</h3>

            <h3>Summary</h3>
            <p>{jobMatch.summary}</p>

            <h3>✅ Skills You Already Have</h3>
            <ol>
              {jobMatch.matchedSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ol>

            <h3>📚 Skills to Learn</h3>
            <ol>
              {jobMatch.missingSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ol>


            <h3>📈 Areas to Improve</h3>

            <h4>Experience Gap</h4>
            <p>{jobMatch.experienceGap}</p>

            <h4>Skills You're Developing</h4>

            <ol>
              {jobMatch.partialSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ol>

            <h3>💡 Recommendations</h3>
            <ol>
              {jobMatch.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ol>

            <div className="button-group">

              <Button
                text="Generate Career Roadmap"
                onClick={() => navigate("/roadmap")}
              />

              <Button
                text="Generate Interview Questions"
                onClick={() => navigate("/interview")}
              />

            </div>

          </div>
        )}
      </Card>
    </div>
  );
}