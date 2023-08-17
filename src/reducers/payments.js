import { FETCH_ALL_PAYMENTS, DELETE, CREATE, UPDATE } from "../constants/actionTypes";

export const PaymentReducer = (payments = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PAYMENTS:
            return action.payload;
        case CREATE:
            return [...payments, action.payload];
        case UPDATE:
            return payments?.map((payment) => (payment.id === action.payload.id ? action.payload : payment));
        case DELETE:
            return payments.filter((payment) => payment.id !== action.payload);
        default:
            return payments;
    }
};

export default PaymentReducer;