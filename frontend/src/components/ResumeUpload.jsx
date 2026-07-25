import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../services/resumeService";
import Button from "./Button";
import Loader from "./Loader";
import "./ResumeUpload.css";
import { useContext } from "react";
import ResumeContext from "../context/ResumeContext";
import { getErrorMessage } from "../utils/errorHandler";

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

export default function ResumeUpload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const {
    setResumeFile,
    setAts,
    loading, setLoading,
  } = useContext(ResumeContext);



  const handleFileChange = (event) => {
    console.log("File Selected:", event.target.files[0]);

    setSelectedFile(event.target.files[0]);
    setError("");
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

      setResumeFile(selectedFile);

      setAts(data.analysis);

      navigate("/ats");
    } catch (err) {

      console.error(err);

      setError(getErrorMessage(err));

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
    </div>

  )
}

