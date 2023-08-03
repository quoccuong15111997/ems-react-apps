import {
  FETCH_ALL_HDXDC,
  DELETE_HDXDC,
  LOCK_HDXDC,
  FETCH_DETAIL_HDXDC,
  POST_HDXDC,
  UPDATE_HDXDC,
  RESET_HDXDC,
} from "../constants/actionTypes";

const HDXDCReducer = (
  state = {
    list: [],
    detail: {},
    postResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_HDXDC:
      return { ...state, list: action.payload.data.RETNDATA };
    case FETCH_DETAIL_HDXDC:
      return {
        ...state,
        detail:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_HDXDC:
      return { ...state, postResult: action.payload.data };
    case LOCK_HDXDC:
      return { ...state, postResult: action.payload.data };
    case POST_HDXDC:
      return { ...state, postResult: action.payload.data };
    case UPDATE_HDXDC:
      return { ...state, postResult: action.payload.data };
    case RESET_HDXDC:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default HDXDCReducer;
