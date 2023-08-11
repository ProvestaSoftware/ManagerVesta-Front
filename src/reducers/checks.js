import { FETCH_ALL_CHECKS, DELETE, CREATE, UPDATE } from "../constants/actionTypes";

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
        default:
            return checks;
    }
};

export default CheckReducer;