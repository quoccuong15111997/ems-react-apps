import { FETCH_ALL_DDHKH } from "../constants/actionTypes";

const ddhkhReducer = (state = { listDonDatHang: {} }, action) => {
  switch (action.type) {
    case FETCH_ALL_DDHKH:
      return { ...state, listDonDatHang: action.payload.data.RETNDATA };
    default:
      return state;
  }
};
export default ddhkhReducer;