import * as api from "../api/index.js";
import { AUTHERROR, UPDATE } from "../constants/actionTypes.js";

export const updateUserProfileData = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUserProfileData(id, user);
        console.log("data", data?.data);

        dispatch({ type: UPDATE, payload: data });

        // window.location.reload();

    } catch (error) {
        console.log(error.message);
    }
};

// export const updateUserPassword = (user) => async (dispatch) => {
//     try {
//         const { data } = await api.updateUserPassword(user);

//         dispatch({ type: UPDATE, payload: data });

//         dispatch(authError(""));

//     } catch (error) {
//         dispatch(authError(error.response.data.message));
//         console.log(error.message);
//     }
// };

export const authError = (error) => async (dispatch) => {
    dispatch({
        type: AUTHERROR,
        payload: error,
    });
};