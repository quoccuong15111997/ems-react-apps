import * as api from "../api/index.js";
import {
  FETCH_ALL_HDXNP,
  FETCH_DETAIL_HDXNP,
  DELETE_HDXNP,
  LOCK_HDXNP,
  POST_HDXNP,
  UPDATE_HDXNP,
  RESET_HDXNP,
} from "../constants/actionTypes.js";

export const getListHDXNP = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_HDXNP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailHDXNP = (keycode) => async (dispatch) => {
  console.log("getDetailHDXNP is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "HDXNP",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_HDXNP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteHDXNP = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_HDXNP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postHDXNP = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_HDXNP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateHDXNP = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_HDXNP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockHDXNP = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_HDXNP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockHDXNP = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_HDXNP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetHDXNP = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_HDXNP, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
