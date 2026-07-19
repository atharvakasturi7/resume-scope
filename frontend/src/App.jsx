import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ATSDashboard from "./pages/ATSDashboard";
import JobMatch from "./pages/JobMatch";
import CareerRoadmap from "./pages/CareerRoadmap";
import InterviewQuestions from "./pages/InterviewQuestions";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/ats"
          element={<ATSDashboard />}
        />

        <Route
          path="/job-match"
          element={<JobMatch />}
        />

        <Route
          path="/roadmap"
          element={<CareerRoadmap />}
        />

        <Route
          path="/interview"
          element={<InterviewQuestions />}
        />
      </Routes>
    </>
  );
}