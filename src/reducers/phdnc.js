import {
  FETCH_ALL_PHDNC,
  DELETE_PHDNC,
  LOCK_PHDNC,
  FETCH_DETAIL_PHDNC,
  POST_PHDNC,
  UPDATE_PHDNC,
  RESET_PHDNC
} from "../constants/actionTypes";

const phdncReducer = (
  state = { listDeNghiThanhToan: [], deNghiThanhToan: {}, postResult:undefined },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_PHDNC:
      return { ...state, listDeNghiThanhToan: action.payload.data.RETNDATA };
    case FETCH_DETAIL_PHDNC:
      return {
        ...state,
        deNghiThanhToan:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_PHDNC:
      return { ...state, postResult: action.payload.data };
    case LOCK_PHDNC:
      return { ...state, postResult: action.payload.data };
    case POST_PHDNC:
      return { ...state, postResult: action.payload.data };
    case UPDATE_PHDNC:
      return { ...state, postResult: action.payload.data };
    case RESET_PHDNC:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default phdncReducer;