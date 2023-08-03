import {
  FETCH_lstObjcType,
  FETCH_lstmngSubDcmn,
  FETCH_lstmngSubDcmnSCTNC,
  FETCH_lstAccObjcCode,
  FETCH_lstCUOM,
  FETCH_lstSpndSgDtTaxRaNm,
  FETCH_lstLoadBusnSpend,
  FETCH_lstLoadAcctDcmn,
  FETCH_lstCostTypeACC,
  FETCH_lstYesOrNo,
  FETCH_lstinpCustOdMtPayMthd2,
  FETCH_appEmplList,
  FETCH_lstmngSubDcmnLHCV,
  FETCH_lstLocationType,
  FETCH_lstProvince,
  FETCH_lstNation,
  FETCH_lstTimekeepingTypeCT,
} from "../constants/actionTypes";

const lstObjcTypeReducer = (
  state = {
    lstObjcType: [],
    lstmngSubDcmn: [],
    lstmngSubDcmnSCTNC: [],
    lstAccObjcCode: [],
    lstCUOM: [],
    lstSpndSgDtTaxRaNm: [],
    lstLoadBusnSpend: [],
    lstLoadAcctDcmn: [],
    lstCostTypeACC: [],
    lstYesOrNo: [],
    lstinpCustOdMtPayMthd2: [],
    appEmplList: [],
    lstmngSubDcmnLHCV: [],
    lstLocationType: [],
    lstProvince: [],
    lstNation: [],
    lstTimekeepingTypeCT:[],
  },
  action
) => {
  switch (action.type) {
    case FETCH_lstNation:
      return {
        ...state,
        lstNation:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstProvince:
      return {
        ...state,
        lstProvince:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstObjcType:
      return {
        ...state,
        lstObjcType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstmngSubDcmn:
      return {
        ...state,
        lstmngSubDcmn:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstmngSubDcmnSCTNC:
      return {
        ...state,
        lstmngSubDcmnSCTNC:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstAccObjcCode:
      return {
        ...state,
        lstAccObjcCode:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstCUOM:
      return {
        ...state,
        lstCUOM:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstSpndSgDtTaxRaNm:
      return {
        ...state,
        lstSpndSgDtTaxRaNm:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstLoadBusnSpend:
      return {
        ...state,
        lstLoadBusnSpend:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstLoadAcctDcmn:
      return {
        ...state,
        lstLoadAcctDcmn:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstCostTypeACC:
      return {
        ...state,
        lstCostTypeACC:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstYesOrNo:
      return {
        ...state,
        lstYesOrNo:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstinpCustOdMtPayMthd2:
      return {
        ...state,
        lstinpCustOdMtPayMthd2:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_appEmplList:
      return {
        ...state,
        appEmplList:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstmngSubDcmnLHCV:
      return {
        ...state,
        lstmngSubDcmnLHCV:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstLocationType:
      return {
        ...state,
        lstLocationType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstTimekeepingTypeCT:
      return {
        ...state,
        lstTimekeepingTypeCT:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    default:
      return state;
  }
};
export default lstObjcTypeReducer;
