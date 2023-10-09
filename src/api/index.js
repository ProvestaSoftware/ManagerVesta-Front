import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:8020" });
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
export const searchFournisseurs = (keyword) => API.get(`/api/fournisseur/search/keywords/${keyword}`);



/*--- Clients --*/
export const fetchClients = () => API.get('/api/client');
export const createClient = (newClient) => API.post('/api/client', newClient);
export const updateClient = (id, updatedClient) => API.post(`/api/client/${id}/update`, updatedClient);
export const deleteClient = (id) => API.delete(`/api/client/${id}/destroy`);
export const searchClient= (keyword) => API.get(`/api/client/search/keywords/${keyword}`);


/*--- Checks --*/
export const fetchChecks = () => API.get('/api/check');
export const createCheck = (newCheck) => API.post('/api/check', newCheck);
export const updateCheck = (id, updatedCheck) => API.put(`/api/check/${id}/update`, updatedCheck);
export const deleteCheck = (id) => API.delete(`/api/check/${id}/destroy`);
export const filterChecks = (filters) => API.get('/api/checks/filter', { params: filters });
export const fetchFilterFournisseursChecks = (request) => API.post('/api/check/fournisseur_checks/filter', request);

/*--- Check Clients --*/
export const fetchCheckClients = () => API.get('/api/check-client');
export const createCheckClient = (newCheckClient) => API.post('/api/check-client', newCheckClient);
export const updateCheckClient = (id, updatedCheckClient) => API.put(`/api/check-client/${id}/update`, updatedCheckClient);
export const deleteCheckClient = (id) => API.delete(`/api/check-client/${id}/destroy`);
export const filterCheckClients = (filters) => API.post('/api/check-client/client_checks/filter', { params: filters });
/*--- Payments --*/
export const fetchPayments = () => API.get('/api/payment');
export const createPayment = (newPayment) => API.post('/api/payment', newPayment);
export const updatePayment = (id, updatedPayment) => API.put(`/api/payment/${id}/update`, updatedPayment);
export const deletePayment = (id) => API.delete(`/api/payment/${id}/destroy`);

