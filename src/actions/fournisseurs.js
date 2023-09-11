import * as api from '../api/index.js';
import {
    FETCH_ALL_FOURNISSEURS,
    CREATE,
    DELETE,
    UPDATE,
    SEARCH_FOURNISSEURS
} from '../constants/actionTypes.js';

export const getFournisseurs = () => async (dispatch) => {
    try {
        const { data } = await api.fetchFournisseurs();
        dispatch({ type: FETCH_ALL_FOURNISSEURS, payload: data });
    } catch (error) {
        console.error('Error fetching fournisseurs:', error);
    }
};

export const createFournisseur = (fournisseur) => async (dispatch) => {
    try {
        const { data } = await api.createFournisseur(fournisseur);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.error('Error creating fournisseur:', error);
    }
};

export const updateFournisseur = (id, fournisseur) => async (dispatch) => {
    try {
        const { data } = await api.updateFournisseur(id, fournisseur);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.error('Error updating fournisseur:', error);
    }
};

export const deleteFournisseur = (id) => async (dispatch) => {
    try {
        await api.deleteFournisseur(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.error('Error deleting fournisseur:', error);
    }
};
export const searchFournisseurs = (keyword) => async (dispatch) => {
    try {
      const { data } = await api.searchFournisseurs(keyword);
      dispatch({ type: SEARCH_FOURNISSEURS, payload: data.checks});
    } catch (error) {
      console.error('Error searching fournisseurs:', error);
    }
  };

