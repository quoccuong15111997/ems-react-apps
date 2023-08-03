import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { BusinessRegistrationEditMain } from '../../components'
import { getDetailPDKCT, resetPDKCT } from "../../actions/pdkct";
import { getLstLocationType, getLstNation, getLstProvince, getLstTimekeepingTypeCT } from "../../actions/common";

const BusinessRegistrationEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstLocationType())
    dispatch(getLstProvince())
    dispatch(getLstNation())
    dispatch(getLstTimekeepingTypeCT())
  }, [dispatch]);
  
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetPDKCT());
    } else {
      dispatch(getDetailPDKCT(id));
    }
  }, [dispatch, id]);
  return <BusinessRegistrationEditMain keycode={id} mode={props.mode} />;
};

export default BusinessRegistrationEdit