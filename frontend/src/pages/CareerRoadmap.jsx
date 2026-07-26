import { useContext, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";
import { generateRoadmap } from "../services/resumeService";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getErrorMessage } from "../utils/errorHandler";
import "./CareerRoadmap.css";
import Card from "../components/Card";
import Button from "../components/Button";

export default function CareerRoadmap() {


  const {
    resumeFile,
    jobDescription,
    roadmap,
    setRoadmap,
    loading,
    setLoading,
  } = useContext(ResumeContext);

  const navigate = useNavigate();

  useEffect(() => {

    if (!resumeFile || !jobDescription) {
      navigate("/job-match", { replace: true });
      return;
    }

    const fetchRoadmap = async () => {
      try {

        setLoading(true);

        const formData = new FormData();

        formData.append("resumeFile", resumeFile);
        formData.append("jobDescription", jobDescription);

        const data = await generateRoadmap(formData);

        setRoadmap(data.roadmap);

      } catch (error) {

        alert(getErrorMessage(error));

      } finally {

        setLoading(false);

      }
    };

    fetchRoadmap();
  }, [
    resumeFile,
    jobDescription,
    navigate,
    setLoading,
    setRoadmap,
  ]);


  if (loading) {
    return (
      <Loader message="Generating Career Roadmap..." />
    );
  }

  if (!roadmap) {
    return null;
  }


  return (
    <div className="roadmap-page">
      <Card>
        <h1 className="page-title">Career Roadmap</h1>

        <div className="roadmap-content">

        <h3>Estimated Learning Time</h3>
        <p>{roadmap.estimatedLearningTime}</p>

        <h3>High Priority Skills</h3>
        <ul>
          {roadmap.highPrioritySkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h3>Medium Priority Skills</h3>
        <ul>
          {roadmap.mediumPrioritySkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h3>Low Priority Skills</h3>
        <ul>
          {roadmap.lowPrioritySkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h3>Recommended Projects</h3>
        <ul>
          {roadmap.recommendedProjects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>

        <h3>Potential Match Score</h3>
        <p>{roadmap.potentialMatchScoreAfterLearning}%</p>


        <Button
          text="Generate Interview Questions"
          onClick={() => navigate("/interview")}
        />
        </div>
      </Card>
    </div>
  );
}
