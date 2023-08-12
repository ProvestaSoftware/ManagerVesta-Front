import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

export const fetchFournisseurs = () => API.get('/api/fournisseur');


export const fetchClients = () => API.get('/api/client');


export const fetchChecks = () => API.get('/api/check');
export const updateCheck = (id, updatedCheck) => API.put(`/api/check/${id}/update`, updatedCheck);

