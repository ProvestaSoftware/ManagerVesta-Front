import * as api from '../api/index.js';
import {
    FETCH_ALL_CLIENTS,
    CREATE,
    DELETE,
    // UPDATE
} from '../constants/actionTypes.js';

export const getClients = () => async (dispatch) => {
    try {
        const { data } = await api.fetchClients();

        dispatch({ type: FETCH_ALL_CLIENTS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createClient = (client) => async (dispatch) => {
    try {
        const { data } = await api.createClient(client);

        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error);
    }
};

// export const updateClient = (id, client) => async (dispatch) => {
//     try {
//         const { data } = await api.updateClient(id, client);

//         dispatch({ type: UPDATE, payload: data });

//     } catch (error) {
//         console.log(error);
//     }
// };

export const deleteClient = (id) => async (dispatch) => {
    try {
        await await api.deleteClient(id);

        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error);
    }
};