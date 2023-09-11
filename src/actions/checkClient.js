import * as api from '../api';

import {
  FETCH_ALL_CHECK_CLIENTS,
  CREATE_CHECK_CLIENT,
  UPDATE_CHECK_CLIENT,
  DELETE_CHECK_CLIENT,
  FILTER_CHECK_CLIENTS,
} from '../constants/actionTypes';

export const getChecksClients = () => async (dispatch) => {
  try {
      const { data } = await api.fetchCheckClients();
          console.log('_______data',data)
      dispatch({ type: FETCH_ALL_CHECK_CLIENTS, payload: data });
  } catch (error) {
      console.log(error);
  }
};

export const createCheckClient = (newCheckClient) => async (dispatch) => {
  try {
    const { data } = await api.createCheckClient(newCheckClient);
    dispatch({ type: CREATE_CHECK_CLIENT, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const updateCheckClient = (id, updatedCheckClient) => async (dispatch) => {
  try {
    const { data } = await api.updateCheckClient(id, updatedCheckClient);
    dispatch({ type: UPDATE_CHECK_CLIENT, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCheckClient = (id) => async (dispatch) => {
  try {
    await api.deleteCheckClient(id);
    dispatch({ type: DELETE_CHECK_CLIENT, payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const filterCheckClients = (filters) => async (dispatch) => {
  try {
    const { data } = await api.filterCheckClients(filters);
    dispatch({ type: FILTER_CHECK_CLIENTS, payload: data });
  } catch (error) {
    console.error(error);
  }
};
