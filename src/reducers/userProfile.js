import { AUTHERROR, UPDATE } from "../constants/actionTypes";

export const UserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE:
            const newState = { ...state, data: action?.payload };
            // console.log("newState", newState?.data?.data);
            updateLocalStorage(newState?.data?.data); // Update local storage
            return newState;
        case AUTHERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const updateLocalStorage = (userData) => {
    const existingData = JSON.parse(localStorage.getItem("profile"));
    if (existingData) {
        // console.log("existingData", existingData);
        // console.log("existingData.data.user", existingData.data.user);
        existingData.data.user = userData; // Update the user field
        localStorage.setItem("profile", JSON.stringify(existingData));
    }
};

export default UserProfileReducer;