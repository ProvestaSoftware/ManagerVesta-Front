import * as api from '../api/index.js';
import {
    FETCH_ALL_CHECKS,
    // CREATE,
    // DELETE,
    // UPDATE
} from '../constants/actionTypes.js';

export const getChecks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchChecks();

        dispatch({ type: FETCH_ALL_CHECKS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

// export const createCheck = (check) => async (dispatch) => {
//     try {
//         const { data } = await api.createCheck(check);

//         dispatch({ type: CREATE, payload: data });

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const updateCheck = (id, check) => async (dispatch) => {
//     try {
//         const { data } = await api.updateCheck(id, check);

//         dispatch({ type: UPDATE, payload: data });

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const deleteCheck = (id) => async (dispatch) => {
//     try {
//         await await api.deleteCheck(id);

//         dispatch({ type: DELETE, payload: id });

//     } catch (error) {
//         console.log(error);
//     }
// };