import { useState } from "react";
import { uploadResume } from "../services/resumeService";



export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (event) => {
    console.log("File Selected:", event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("Analyze Resume button clicked");
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();

    formData.append("resumeFile", selectedFile);

    try {

      const data = await uploadResume(formData);

      console.log(data);

      setAnalysis(data.analysis);

    } catch (err) {

      console.error(err);

      setError("Failed to analyze resume.");

    } finally {

      setLoading(false);

    }


  }


  return (
    <div>

      <h2>Upload PDF Resume</h2>

      <input type="file" accept=".pdf" onChange={handleFileChange} />

      <button onClick={handleUpload}> Analyze Resume</button>

      {analysis && (
        <div>

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
            
        </div>
      )}


    </div>

  );
}

