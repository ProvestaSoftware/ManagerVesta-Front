import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_PUBLIC_API_URL ?? "https://crm-api.ccachaar.tn/api" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});


/*--- Auth --*/
export const login = (formData) => API.post("/auth/login", formData);
export const updateUserProfileData = (id, updatedUserProfileData) => API.put(`/auth/${id}/update`, updatedUserProfileData);
export const updateUserPassword = (id, updatedUserPassword) => API.post(`/auth/${id}/update-password`, updatedUserPassword);


/*--- Fournisseurs --*/
export const fetchFournisseurs = () => API.get('/fournisseur');
export const createFournisseur = (newFournisseur) => API.post('/fournisseur', newFournisseur);
export const updateFournisseur = (id, updatedFournisseur) => API.put(`/fournisseur/${id}/update`, updatedFournisseur);
export const deleteFournisseur = (id) => API.delete(`/fournisseur/${id}/destroy`);
export const searchFournisseurs = (keyword) => API.get(`/fournisseur/search/keywords/${keyword}`);



/*--- Clients --*/
export const fetchClients = () => API.get('/client');
export const createClient = (newClient) => API.post('/client', newClient);
export const updateClient = (id, updatedClient) => API.post(`/client/${id}/update`, updatedClient);
export const deleteClient = (id) => API.delete(`/client/${id}/destroy`);
export const searchClient= (keyword) => API.get(`/client/search/keywords/${keyword}`);


/*--- Checks --*/
export const fetchChecks = () => API.get('/check');
export const createCheck = (newCheck) => API.post('/check', newCheck);
export const updateCheck = (id, updatedCheck) => API.put(`/check/${id}/update`, updatedCheck);
export const deleteCheck = (id) => API.delete(`/check/${id}/destroy`);
export const filterChecks = (filters) => API.get('/checks/filter', { params: filters });
export const fetchFilterFournisseursChecks = (request) => API.post('/check/fournisseur_checks/filter', request);

/*--- Check Clients --*/
export const fetchCheckClients = () => API.get('/check-client');
export const createCheckClient = (newCheckClient) => API.post('/check-client', newCheckClient);
export const updateCheckClient = (id, updatedCheckClient) => API.put(`/check-client/${id}/update`, updatedCheckClient);
export const deleteCheckClient = (id) => API.delete(`/check-client/${id}/destroy`);
export const filterCheckClients = (filters) => API.post('/check-client/client_checks/filter', { params: filters });
/*--- Payments --*/
export const fetchPayments = () => API.get('/payment');
export const createPayment = (newPayment) => API.post('/payment', newPayment);
export const updatePayment = (id, updatedPayment) => API.put(`/payment/${id}/update`, updatedPayment);
export const deletePayment = (id) => API.delete(`/payment/${id}/destroy`);

