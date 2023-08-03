import * as api from "../api/index.js";
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
  FETCH_lstTimekeepingTypeCT
} from "../constants/actionTypes.js";

// Danh sách loại đối tượng thanh toán
export const getLstObjcType = () => async (dispatch) => {
  const body = { LISTCODE: "lstObjcType", CONDFLTR: "", VAR_VLUE: "" };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstObjcType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách loại đề nghị chi
export const getLstmngSubDcmn = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    CONDFLTR: "DcmnCode='PHDNC'",
    LISTCODE: "lstmngSub_Dcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstmngSubDcmn, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách loại chi tiêu
export const getLstmngSubDcmnSCTNC = () => async (dispatch) => {
  const body = {
    CONDFLTR: "DcmnCode='SCTNC'",
    VAR_VLUE: "",
    LISTCODE: "lstmngSub_Dcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstmngSubDcmnSCTNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách đối tượng thanh toán
export const getLstAccObjcCode = (objType) => async (dispatch) => {
  const body = {
    FUNCNAME: "spDtaLoadAccObjcCode_Srch_App",
    DTBSNAME: "Common",
    LCTNCODE: "{{0202}}",
    PARA_001: "'1990-01-01', '1990-01-01'," + parseInt(objType) + ", ''",
  };
  try {
    const { data } = await api.fetchCommonFuncList(body);

    dispatch({ type: FETCH_lstAccObjcCode, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách loại tiền
export const getLstCUOM = (objType) => async (dispatch) => {
  const body = { LISTCODE: "lstCUOM" };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstCUOM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Tên thuế suất(%)
export const getLstSpndSgDtTaxRaNm = (objType) => async (dispatch) => {
  const body = {
    LISTCODE: "lstSpndSgDt_Tax_RaNm",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstSpndSgDtTaxRaNm, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Mã chi phí
export const getLstLoadBusnSpend = (objType) => async (dispatch) => {
  const body = {
    LISTCODE: "lstLoadBusnSpend",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstLoadBusnSpend, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Nghiệp vụ liên quan
export const getLstLoadAcctDcmn = (objType) => async (dispatch) => {
  const body = {
    LISTCODE: "lstLoadAcctDcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstLoadAcctDcmn, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Nghiệp vụ liên quan
export const getLstCostTypeACC = (objType) => async (dispatch) => {
  const body = {
    LISTCODE: "lstCostType_ACC",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstCostTypeACC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Loại hóa đơn
export const getLstYesOrNo = (objType) => async (dispatch) => {
  const body = {
    LISTCODE: "lstYesOrNo",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstYesOrNo, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Phương thức thanh toán
export const getLstinpCustOdMtPayMthd2 = (objType) => async (dispatch) => {
  const body = {
    LISTCODE: "lst_inpCustOdMt_Pay_Mthd_2",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstinpCustOdMtPayMthd2, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Nhân viên
export const getAppEmplList = () => async (dispatch) => {
  const body = {
    DCMNCODE: "appEmplList",
    PARACODE: "001",
    DPTMCODE: "%",
    PSTNCODE: "%",
    JOB_CODE: "%",
    PSTNTYPE: 0,
    JOB_TYPE: 0,
  };
  try {
    const { data } = await api.fetchCommonData(body);

    dispatch({ type: FETCH_appEmplList, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách lãnh vực liên quan
export const getLstmngSubDcmnLHCV = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    CONDFLTR: "DcmnCode='LHCV'",
    LISTCODE: "lstmngSub_Dcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstmngSubDcmnLHCV, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Loại công tác Nội địa|Quốc tế
export const getLstLocationType = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    LISTCODE: "lstLocationType",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstLocationType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Quận huyện
export const getLstProvince = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    LISTCODE: "lstProvince",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstProvince, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Quốc gia
export const getLstNation = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    LISTCODE: "lstNation",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstNation, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh loại chấm công công tác
export const getLstTimekeepingTypeCT = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    LISTCODE: "lstTimekeepingTypeCT",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstTimekeepingTypeCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

