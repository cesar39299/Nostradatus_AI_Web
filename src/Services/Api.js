import axios from "axios";

const API = axios.create({
    //baseURL: "http://127.0.0.1:8000"
    baseURL: "https://nostradatusai-api-ghbaa3dqaydmaubx.brazilsouth-01.azurewebsites.net/"
});

export const getClusters = (filters) =>
    API.get("/map/clusters", { params: filters });
export const getHeatmap = (filters) =>
    API.get("/map/heatmap", { params: filters });

// 🔥 NUEVO
export const getProperties = (filters) =>
    API.get("/properties", { params: filters });

export const getPoints = (filters) =>
    API.get("/map/points", { params: filters });