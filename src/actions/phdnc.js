import * as api from "../api/index.js";
import {
  FETCH_ALL_PHDNC,
  FETCH_DETAIL_PHDNC,
  DELETE_PHDNC,
  LOCK_PHDNC,
  POST_PHDNC,
  UPDATE_PHDNC,
  RESET_PHDNC
} from "../constants/actionTypes.js";

export const getListPHDNC = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_PHDNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailPHDNC = (keycode) => async (dispatch) => {
  console.log("getDetailPHDNC is called with keycode = "+keycode);
  const body = {
    DCMNCODE: "PHDNC",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_PHDNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePHDNC = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_PHDNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postPHDNC = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_PHDNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePHDNC = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_PHDNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockPHDNC = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_PHDNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockPHDNC = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_PHDNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetPHDNC = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_PHDNC, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
