import {
  FETCH_ALL_HDXNP,
  DELETE_HDXNP,
  LOCK_HDXNP,
  FETCH_DETAIL_HDXNP,
  POST_HDXNP,
  UPDATE_HDXNP,
  RESET_HDXNP,
} from "../constants/actionTypes";

const HDXNPReducer = (
  state = {
    list: [],
    detail: {},
    postResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_HDXNP:
      return { ...state, list: action.payload.data.RETNDATA };
    case FETCH_DETAIL_HDXNP:
      return {
        ...state,
        detail:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_HDXNP:
      return { ...state, postResult: action.payload.data };
    case LOCK_HDXNP:
      return { ...state, postResult: action.payload.data };
    case POST_HDXNP:
      return { ...state, postResult: action.payload.data };
    case UPDATE_HDXNP:
      return { ...state, postResult: action.payload.data };
    case RESET_HDXNP:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default HDXNPReducer;
