import { AUTH, AUTHERROR, LOGOUT } from "../constants/actionTypes";
import * as api from '../api/index.js';

export const login = (formData) => async (dispatch) => {
    try {

        const data = await api.login(formData);

        dispatch({ type: AUTH, data });

        window.location.reload();

        dispatch(authError(""));

    } catch (error) {
        dispatch(authError(error.response.data.message));
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT });

        window.location.reload();

        dispatch(authError(""));

    } catch (error) {
        dispatch(authError(error.response.data.message));
    }
};

export const authError = (error) => async (dispatch) => {
    dispatch({
        type: AUTHERROR,
        payload: error,
    });
};