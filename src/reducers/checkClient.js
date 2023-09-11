import {
  FETCH_ALL_CHECK_CLIENTS,
  CREATE_CHECK_CLIENT,
  UPDATE_CHECK_CLIENT,
  DELETE_CHECK_CLIENT,
  FILTER_CHECK_CLIENTS,
} from '../constants/actionTypes';

const initialState = [];

const checkClientReducer = (checkClients = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CHECK_CLIENTS:
      return action.payload;
    case CREATE_CHECK_CLIENT:
      return [...checkClients, action.payload];
    case UPDATE_CHECK_CLIENT:
      return checkClients.map((checkclient) =>
        checkclient.id === action.payload.id ? action.payload : checkclient
      );
    case DELETE_CHECK_CLIENT:
      return checkClients.filter((checkclient) => checkclient.id !== action.payload);
    case FILTER_CHECK_CLIENTS:
      return action.payload;
    default:
      return checkClients;
  }
};

export default checkClientReducer;
