import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { uploadResume } from "../services/resumeService";
import Button from "./Button";
// import Card from "./Card";
import Loader from "./Loader";
import "./ResumeUpload.css";
import { useContext } from "react";
import ResumeContext from "../context/ResumeContext";


export default function ResumeUpload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAnalysis } = useContext(ResumeContext);

  const handleFileChange = (event) => {
    console.log("File Selected:", event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  const handleUpload = async () => {
    console.log("Analyze Resume button clicked");
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();

    formData.append("resumeFile", selectedFile)

    try {

      const data = await uploadResume(formData);

      console.log(data);

      setAnalysis(data.analysis);
      navigate("/ats");
    } catch (err) {

      console.error(err);

      setError("Failed to analyze resume.");

    } finally {

      setLoading(false)

    }


  }



  return (
    <div className="resume-upload-container">

      <h1 className="resume-title">
        AI Resume Analyzer
      </h1>

      <div className="upload-section">

        <input
          className="file-input"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <Button
          text={loading ? "Analyzing..." : "Analyze Resume"}
          onClick={handleUpload}
          disabled={loading}
        />

        {loading && <Loader />}

      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {/* {analysis && (
        <Card>
          <h2>ATS Score: {analysis.atsScore}</h2>

          <h3>Summary</h3>
          <p>{analysis.summary}</p>

          <h3>Strengths</h3>
          <ul>
            {analysis.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Weaknesses</h3>
          <ul>
            {analysis.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Suggestions</h3>
          <ul>
            {analysis.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Card>
      )} */}



    </div>

  )
}

