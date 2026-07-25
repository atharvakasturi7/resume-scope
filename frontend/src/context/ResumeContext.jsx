import { createContext, useState } from "react";


const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [ats, setAts] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobMatch, setJobMatch] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ResumeContext.Provider
      value={{
        resumeFile, setResumeFile,
        ats, setAts,
        jobDescription, setJobDescription,
        jobMatch, setJobMatch,
        roadmap, setRoadmap,
        interview, setInterview,
        loading, setLoading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export default ResumeContext;