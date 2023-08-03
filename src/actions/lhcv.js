import * as api from "../api/index.js";
import {
  FETCH_ALL_LHCV,
  FETCH_DETAIL_LHCV,
  DELETE_LHCV,
  LOCK_LHCV,
  POST_LHCV,
  UPDATE_LHCV,
  RESET_LHCV,
} from "../constants/actionTypes.js";

export const getListLHCV = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_LHCV, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailLHCV = (keycode) => async (dispatch) => {
  console.log("getDetailLHCV is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "LHCV",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_LHCV, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLHCV = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_LHCV, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postLHCV = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_LHCV, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLHCV = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_LHCV, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockLHCV = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_LHCV, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockLHCV = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_LHCV, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetLHCV = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_LHCV, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
