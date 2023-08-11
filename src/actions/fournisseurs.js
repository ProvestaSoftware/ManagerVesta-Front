import * as api from '../api/index.js';
import {
    FETCH_ALL_FOURNISSEURS,
    // CREATE,
    // DELETE,
    // UPDATE
} from '../constants/actionTypes.js';

export const getFournisseurs = () => async (dispatch) => {
    try {
        const { data } = await api.fetchFournisseurs();

        dispatch({ type: FETCH_ALL_FOURNISSEURS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

// export const createFournisseur = (fournisseur) => async (dispatch) => {
//     try {
//         const { data } = await api.createFournisseur(fournisseur);

//         dispatch({ type: CREATE, payload: data });

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const updateFournisseur = (id, fournisseur) => async (dispatch) => {
//     try {
//         const { data } = await api.updateFournisseur(id, fournisseur);

//         dispatch({ type: UPDATE, payload: data });

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const deleteFournisseur = (id) => async (dispatch) => {
//     try {
//         await await api.deleteFournisseur(id);

//         dispatch({ type: DELETE, payload: id });

//     } catch (error) {
//         console.log(error);
//     }
// };