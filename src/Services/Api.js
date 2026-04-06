
import axios from "axios";

const API = axios.create({
    //baseURL: "http://127.0.0.1:8000",
    baseURL: "https://nostradatusai-api-ghbaa3dqaydmaubx.brazilsouth-01.azurewebsites.net/",
    timeout: 10000, // ⏱️ evita que se quede colgado
});

// =========================
// MAPA
// =========================
export const getClusters = (filters) =>
    API.get("/map/clusters", { params: filters });

export const getHeatmap = (filters) =>
    API.get("/map/heatmap", { params: filters });

export const getPoints = (filters) =>
    API.get("/map/points", { params: filters });

// =========================
// PROPIEDADES
// =========================
export const getProperties = (filters) =>
    API.get("/properties", { params: filters });

// =========================
// 🔥 PREDICT (NUEVO)
// =========================
export const getPrediction = (district) =>
    API.get("/predict/", {
        params: { district }
    });

// =========================
// EXPORT DEFAULT (CLAVE)
// =========================
export default API;