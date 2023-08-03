import * as api from "../api/index.js";
import { FETCH_ALL_DDHKH } from "../constants/actionTypes.js";

export const getListDDHKH = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_DDHKH, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
