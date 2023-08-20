import { AUTH, AUTHERROR, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };

        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };

        case AUTHERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default authReducer;