import { useContext } from "react";
import ResumeContext from "../context/ResumeContext";


export default function ATSDashboard() {
  const { analysis } = useContext(ResumeContext);
  return (
    <div>
      <h1>ATS Dashboard</h1>
    </div>
  );
}