import * as api from "../api/index.js";
import {
  FETCH_ALL_PDKCT,
  FETCH_DETAIL_PDKCT,
  DELETE_PDKCT,
  LOCK_PDKCT,
  POST_PDKCT,
  UPDATE_PDKCT,
  RESET_PDKCT,
} from "../constants/actionTypes.js";

export const getListPDKCT = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_PDKCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailPDKCT = (keycode) => async (dispatch) => {
  console.log("getDetailPDKCT is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "PDKCT",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_PDKCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePDKCT = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_PDKCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postPDKCT = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_PDKCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePDKCT = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_PDKCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockPDKCT = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_PDKCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockPDKCT = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_PDKCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetPDKCT = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_PDKCT, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
