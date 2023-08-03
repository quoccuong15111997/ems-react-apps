import {
  FETCH_ALL_LHCV,
  DELETE_LHCV,
  LOCK_LHCV,
  FETCH_DETAIL_LHCV,
  POST_LHCV,
  UPDATE_LHCV,
  RESET_LHCV,
} from "../constants/actionTypes";

const LHCVReducer = (
  state = {
    listLienHeCongVu: [],
    lienHeCongVu: {},
    postResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_LHCV:
      return { ...state, listLienHeCongVu: action.payload.data.RETNDATA };
    case FETCH_DETAIL_LHCV:
      return {
        ...state,
        lienHeCongVu:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_LHCV:
      return { ...state, postResult: action.payload.data };
    case LOCK_LHCV:
      return { ...state, postResult: action.payload.data };
    case POST_LHCV:
      return { ...state, postResult: action.payload.data };
    case UPDATE_LHCV:
      return { ...state, postResult: action.payload.data };
    case RESET_LHCV:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default LHCVReducer;
