import * as api from "../api/index.js";
import {
  FETCH_ALL_PHTAM,
  FETCH_DETAIL_PHTAM,
  DELETE_PHTAM,
  LOCK_PHTAM,
  POST_PHTAM,
  UPDATE_PHTAM,
  RESET_PHTAM,
} from "../constants/actionTypes.js";

export const getListPHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_PHTAM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailPHTAM = (keycode) => async (dispatch) => {
  console.log("getDetailPHTAM is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "PHTAM",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_PHTAM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_PHTAM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postPHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_PHTAM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_PHTAM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockPHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_PHTAM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockPHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_PHTAM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetPHTAM = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_PHTAM, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
