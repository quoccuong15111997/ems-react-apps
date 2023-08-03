import * as api from "../api/index.js";
import { FETCH_APPROVAL_PROCESS, FETCH_REVIEW_PROCESS, CLOSE_APPROVAL_PROCESS, CLOSE_REVIEW_PROCESS, Get_LvTm } from "../constants/actionTypes.js";
export const getApprovalProcess = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchApprovalProcess(body);

    dispatch({ type: FETCH_APPROVAL_PROCESS, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
export const getReviewProcess = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchReviewProcess(body);

    dispatch({ type: FETCH_REVIEW_PROCESS, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const closeReviewProcess = (body) => async (dispatch) => {
  try {
    dispatch({ type: CLOSE_REVIEW_PROCESS, payload: {  } });
  } catch (error) {
    console.log(error.message);
  }
};

export const closeApprovalProcess = (body) => async (dispatch) => {
  try {
    
    dispatch({ type: CLOSE_APPROVAL_PROCESS, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLvTm = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchCommonDcmn(body);
    dispatch({ type: Get_LvTm, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};