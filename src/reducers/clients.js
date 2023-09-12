import { FETCH_ALL_CLIENTS, DELETE, CREATE_CLIENTS, UPDATE,SEARCH_CLIENT } from "../constants/actionTypes";

export const ClientReducer = (clients = [], action) => {
    switch (action.type) {
        case FETCH_ALL_CLIENTS:
            return action.payload;
        case CREATE_CLIENTS:
            return [...clients, action.payload];
        case UPDATE:
            return clients?.map((client) => (client.id === action.payload.id ? action.payload : client));
        case DELETE:
            return clients.filter((client) => client.id !== action.payload);
        case SEARCH_CLIENT:
            return action.payload
        default:
            return clients;
    }
};

export default ClientReducer;