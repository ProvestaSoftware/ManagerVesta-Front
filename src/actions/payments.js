import * as api from '../api/index.js';
import {
    FETCH_ALL_PAYMENTS,
    CREATE,
    DELETE,
    UPDATE,
} from '../constants/actionTypes.js';

export const getPayments = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPayments();

        dispatch({ type: FETCH_ALL_PAYMENTS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPayment = (payment) => async (dispatch) => {
    try {
        const { data } = await api.createPayment(payment);

        dispatch({ type: CREATE, payload: data });

        return data; // Return the response data

    } catch (error) {
        console.log(error);
    }
};

export const updatePayment = (id, payment) => async (dispatch) => {
    try {
        const { data } = await api.updatePayment(id, payment);

        dispatch({ type: UPDATE, payload: data });

        // window.location.reload();

    } catch (error) {
        console.log(error);
    }
};

export const deletePayment = (id) => async (dispatch) => {
    try {
        await await api.deletePayment(id);

        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error);
    }
};