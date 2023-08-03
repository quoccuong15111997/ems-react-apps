import * as api from "../api/index.js";
import {
  FETCH_ALL_HDXDC,
  FETCH_DETAIL_HDXDC,
  DELETE_HDXDC,
  LOCK_HDXDC,
  POST_HDXDC,
  UPDATE_HDXDC,
  RESET_HDXDC,
} from "../constants/actionTypes.js";

export const getListHDXDC = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_HDXDC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailHDXDC = (keycode) => async (dispatch) => {
  console.log("getDetailHDXDC is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "HDXDC",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_HDXDC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteHDXDC = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_HDXDC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postHDXDC = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_HDXDC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateHDXDC = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_HDXDC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockHDXDC = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_HDXDC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockHDXDC = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_HDXDC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetHDXDC = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_HDXDC, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
