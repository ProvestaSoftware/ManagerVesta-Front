import { FETCH_ALL_FOURNISSEURS, DELETE, CREATE, UPDATE } from "../constants/actionTypes";

export const FournisseurReducer = (fournisseurs = [], action) => {
    switch (action.type) {
        case FETCH_ALL_FOURNISSEURS:
            return action.payload;
        case CREATE:
            return [...fournisseurs, action.payload];
        case UPDATE:
            return fournisseurs?.map((fournisseur) => (fournisseur.id === action.payload.id ? action.payload : fournisseur));
        case DELETE:
            return fournisseurs.filter((fournisseur) => fournisseur.id !== action.payload);
        default:
            return fournisseurs;
    }
};

export default FournisseurReducer;