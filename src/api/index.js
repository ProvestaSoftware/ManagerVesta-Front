import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

export const fetchFournisseurs = () => API.get('/api/fournisseur');
export const createFournisseur = (newFournisseur) => API.post('/api/fournisseur', newFournisseur);
// export const updateFournisseur = (id, updatedFournisseur) => API.put(`/api/fournisseur/${id}/update`, updatedFournisseur);
export const deleteFournisseur = (id) => API.delete(`/api/fournisseur/${id}/destroy`);


export const fetchClients = () => API.get('/api/client');
export const createClient = (newClient) => API.post('/api/client', newClient);
// export const updateClient = (id, updatedClient) => API.put(`/api/client/${id}/update`, updatedClient);
export const deleteClient = (id) => API.delete(`/api/client/${id}/destroy`);



export const fetchChecks = () => API.get('/api/check');
export const updateCheck = (id, updatedCheck) => API.put(`/api/check/${id}/update`, updatedCheck);
export const deleteCheck = (id) => API.delete(`/api/check/${id}/destroy`);

