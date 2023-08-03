import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BillPaymentRequestEditMain } from "../../components";
import {
  getLstAccObjcCode,
  getLstCUOM,
  getLstCostTypeACC,
  getLstLoadAcctDcmn,
  getLstLoadBusnSpend,
  getLstObjcType,
  getLstSpndSgDtTaxRaNm,
  getLstYesOrNo,
  getLstinpCustOdMtPayMthd2,
  getLstmngSubDcmn,
  getLstmngSubDcmnSCTNC,
} from "../../actions/common";
import { getDetailPHDNC, resetPHDNC } from "../../actions/phdnc";
const BillPaymentRequestEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Load danh sách list
  useEffect(() => {
    dispatch(getLstObjcType());
    dispatch(getLstmngSubDcmn());
    dispatch(getLstmngSubDcmnSCTNC());
    dispatch(getLstCUOM());
    dispatch(getLstLoadAcctDcmn());
    dispatch(getLstLoadBusnSpend());
    dispatch(getLstSpndSgDtTaxRaNm());
    dispatch(getLstCostTypeACC());
    dispatch(getLstYesOrNo());
    dispatch(getLstinpCustOdMtPayMthd2())
  }, [dispatch]);

  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetPHDNC());
    } else {
      dispatch(getDetailPHDNC(id));
    }
  }, [dispatch, id]);

  return <BillPaymentRequestEditMain keycode={id} mode={props.mode} />;
};

export default BillPaymentRequestEdit;
