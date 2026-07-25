import { useContext, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";
import { generateRoadmap } from "../services/resumeService";
import { useNavigate } from "react-router-dom";

export default function CareerRoadmap() {


  const {
    resumeFile,
    jobDescription,
    roadmap,
    setRoadmap,
  } = useContext(ResumeContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmap = async () => {
      const formData = new FormData();

      formData.append("resumeFile", resumeFile);
      formData.append("jobDescription", jobDescription);

      const data = await generateRoadmap(formData);

      console.log(data);

      setRoadmap(data.roadmap);
    };

    fetchRoadmap();
  }, []);


  if (!roadmap) {
    return <h2>Loading...</h2>;
  }


  return (
    <div>
      <h1>Career Roadmap</h1>

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

      <br /><br />

      <button onClick={() => navigate("/interview")}>
        Interview Questions
      </button>
    </div>
  );


}
