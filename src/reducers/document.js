import { FETCH_APPROVAL_PROCESS, FETCH_REVIEW_PROCESS, Get_LvTm } from "../constants/actionTypes";

const documentReducer = (
  state = {
    approvalProcess: {
      showPopup: false,
      data: [],
    },
    reviewProcess: {
      showPopup: false,
      data: [],
    },
    leaveTime:{},
  },
  action
) => {
  switch (action.type) {
    case FETCH_APPROVAL_PROCESS:
      return {
        ...state,
        approvalProcess: {
          showPopup: true,
          data: action.payload.data.RETNDATA,
        },
      };
    case FETCH_REVIEW_PROCESS:
      return {
        ...state,
        reviewProcess: {
          showPopup: true,
          data: action.payload.data.RETNDATA,
        },
      };
    case Get_LvTm:
      return {
        ...state,
        leaveTime: {
          data: action.payload.data.RETNDATA,
        },
      };
    default:
      return state;
  }
};
export default documentReducer;
