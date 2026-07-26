import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../services/resumeService";
import Button from "./Button";
import Loader from "./Loader";
import "./ResumeUpload.css";
import { useContext } from "react";
import ResumeContext from "../context/ResumeContext";
import { getErrorMessage } from "../utils/errorHandler";
import Card from "./Card";

// const HTTP_STATUS = {
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   NOT_FOUND: 404,
//   TOO_MANY_REQUESTS: 429,
//   INTERNAL_SERVER_ERROR: 500,
// };

export default function ResumeUpload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const {
    resumeFile,
    setResumeFile,
    setAts,
    loading,
    setLoading,
  } = useContext(ResumeContext);



  const handleFileChange = (event) => {
    console.log("File Selected:", event.target.files[0]);

    setSelectedFile(event.target.files[0]);
    setError("");
  }

  const handleUpload = async () => {
    console.log("Analyze Resume button clicked");

    const file = selectedFile || resumeFile;

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();

    formData.append("resumeFile", file);

    try {
      const data = await uploadResume(formData);

      console.log(data);

      setResumeFile(file);

      setAts(data.analysis);

      navigate("/ats");
    } catch (err) {

      console.error(err);

      setError(getErrorMessage(err));

    } finally {

      setLoading(false)

    }


  }

  if (loading) {
    return <Loader message="Analyzing Resume..." />;
  }

  return (
    <div className="resume-upload-container">

      <Card>

        <h1 className="resume-title">
          AI Resume Analyzer
        </h1>

        <p className="resume-subtitle">
          Upload your resume and receive an AI-powered ATS analysis, job match insights, career roadmap, and interview questions.
        </p>

        <div className="upload-section">

          <label className="upload-box">

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              hidden
            />

            {selectedFile || resumeFile ? (
              <>
                <span className="file-icon">📄</span>

                <span className="file-name">
                  {(selectedFile || resumeFile).name}
                </span>

                <span className="change-file">
                  Change
                </span>
              </>
            ) : (
              <>
                <span className="file-icon">📁</span>

                <span>
                  Choose Resume
                </span>
              </>
            )}

          </label>

          <Button
            text="Analyze Resume"
            onClick={handleUpload}
          />



        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

      </Card>

    </div>
  );
}

