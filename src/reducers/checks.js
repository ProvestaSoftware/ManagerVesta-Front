import { FETCH_ALL_CHECKS, DELETE, CREATE, UPDATE, FILTER_FOURNISSEUR_CHECKS } from "../constants/actionTypes";

export const CheckReducer = (checks = [], action) => {
    switch (action.type) {
        case FETCH_ALL_CHECKS:
            return action.payload;
        case CREATE:
            return [...checks, action.payload];
        case UPDATE:
            return checks?.map((check) => (check.id === action.payload.id ? action.payload : check));
        case DELETE:
            return checks.filter((check) => check.id !== action.payload);
        case FILTER_FOURNISSEUR_CHECKS:
            return action.payload;
        default:
            return checks;
    }
};

export default CheckReducer;