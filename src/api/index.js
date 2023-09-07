import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8020" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});


/*--- Auth --*/
export const login = (formData) => API.post("/api/auth/login", formData);
export const updateUserProfileData = (id, updatedUserProfileData) => API.put(`/api/auth/${id}/update`, updatedUserProfileData);
export const updateUserPassword = (id, updatedUserPassword) => API.post(`/api/auth/${id}/update-password`, updatedUserPassword);


/*--- Fournisseurs --*/
export const fetchFournisseurs = () => API.get('/api/fournisseur');
export const createFournisseur = (newFournisseur) => API.post('/api/fournisseur', newFournisseur);
export const updateFournisseur = (id, updatedFournisseur) => API.put(`/api/fournisseur/${id}/update`, updatedFournisseur);
export const deleteFournisseur = (id) => API.delete(`/api/fournisseur/${id}/destroy`);
export const fetchFilterFournisseursChecks = (request) => API.post('/api/fournisseur_checks/filter', request);


/*--- Clients --*/
export const fetchClients = () => API.get('/api/client');
export const createClient = (newClient) => API.post('/api/client', newClient);
export const updateClient = (id, updatedClient) => API.put(`/api/client/${id}/update`, updatedClient);
export const deleteClient = (id) => API.delete(`/api/client/${id}/destroy`);


/*--- Checks --*/
export const fetchChecks = () => API.get('/api/check');
export const createCheck = (newCheck) => API.post('/api/check', newCheck);
export const updateCheck = (id, updatedCheck) => API.put(`/api/check/${id}/update`, updatedCheck);
export const deleteCheck = (id) => API.delete(`/api/check/${id}/destroy`);


/*--- Payments --*/
export const fetchPayments = () => API.get('/api/payment');
export const createPayment = (newPayment) => API.post('/api/payment', newPayment);
export const updatePayment = (id, updatedPayment) => API.put(`/api/payment/${id}/update`, updatedPayment);
export const deletePayment = (id) => API.delete(`/api/payment/${id}/destroy`);

