import { FETCH_ALL_PAYMENTS, DELETE, CREATE, UPDATE } from "../constants/actionTypes";

export const PaymentReducer = (Payments = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PAYMENTS:
            return action.payload;
        case CREATE:
            return [...Payments, action.payload];
        case UPDATE:
            return Payments?.map((Payment) => (Payment.id === action.payload.id ? action.payload : Payment));
        case DELETE:
            return Payments.filter((Payment) => Payment.id !== action.payload);
        default:
            return Payments;
    }
};

export default PaymentReducer;