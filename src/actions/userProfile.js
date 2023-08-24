import * as api from "../api/index.js";
import { AUTHERROR, UPDATE } from "../constants/actionTypes.js";
import { logout } from "./auth.js";

export const updateUserProfileData = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUserProfileData(id, user);
        // console.log("data", data?.data);

        dispatch({ type: UPDATE, payload: data });

        // window.location.reload();

    } catch (error) {
        console.log(error.message);
    }
};

export const updateUserPassword = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUserPassword(id, user);
        // console.log("pass data", data);

        dispatch({ type: UPDATE, payload: data });

        dispatch(authError(""));

        dispatch(logout());

    } catch (error) {
        dispatch(authError(error.response.data.message));
        // console.log(error.message);
    }
};

export const authError = (error) => async (dispatch) => {
    dispatch({
        type: AUTHERROR,
        payload: error,
    });
};