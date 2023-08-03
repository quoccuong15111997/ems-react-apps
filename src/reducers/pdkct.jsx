import {
  FETCH_ALL_PDKCT,
  DELETE_PDKCT,
  LOCK_PDKCT,
  FETCH_DETAIL_PDKCT,
  POST_PDKCT,
  UPDATE_PDKCT,
  RESET_PDKCT,
} from "../constants/actionTypes";

const PDKCTReducer = (
  state = {
    list: [],
    detail: {},
    postResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_PDKCT:
      return { ...state, list: action.payload.data.RETNDATA };
    case FETCH_DETAIL_PDKCT:
      return {
        ...state,
        detail:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_PDKCT:
      return { ...state, postResult: action.payload.data };
    case LOCK_PDKCT:
      return { ...state, postResult: action.payload.data };
    case POST_PDKCT:
      return { ...state, postResult: action.payload.data };
    case UPDATE_PDKCT:
      return { ...state, postResult: action.payload.data };
    case RESET_PDKCT:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default PDKCTReducer;
