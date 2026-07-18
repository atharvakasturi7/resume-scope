import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
})

export const uploadResume = async (formData) => {
    const response = await api.post("/resume/upload", formData);

    return response.data;
};