import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const uploadResume = async (formData) => {
    const response = await api.post("/resume/upload", formData);

    return response.data;
};

export const matchJob = async (formData) => {
    const response = await api.post("/resume/match-job", formData);

    return response.data;
}

export const generateRoadmap = async (formData) => {
  const response = await api.post("/resume/career-roadmap", formData);

  return response.data;
};

export const generateInterview = async (formData) => {
  const response = await api.post("/resume/interview", formData);

  return response.data;
}; 