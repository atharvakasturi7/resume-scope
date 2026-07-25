import { createContext, useState } from "react";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeFile, setResumeFile] = useState(null);

  const [ats, setAts] = useState(null);

  const [jobDescription, setJobDescription] = useState("");

  const [jobMatch, setJobMatch] = useState(null);

  const [roadmap, setRoadmap] = useState(null);

  const [interview, setInterview] = useState(null);

  return (
    <ResumeContext.Provider
      value={{
        resumeFile, setResumeFile,
        ats, setAts,
        jobDescription, setJobDescription,
        jobMatch, setJobMatch,
        roadmap, setRoadmap,
        interview, setInterview
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export default ResumeContext;