import React,{useEffect} from 'react'
import { ServiceContactEditMain } from '../../components'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { getAppEmplList, getLstmngSubDcmnLHCV } from '../../actions/common';
import { getDetailLHCV, resetLHCV } from '../../actions/lhcv';


const ServiceContactsEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppEmplList());
    dispatch(getLstmngSubDcmnLHCV());
  }, [dispatch]);
  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetLHCV());
    } else {
      dispatch(getDetailLHCV(id));
    }
  }, [dispatch, id]);
  return <ServiceContactEditMain keycode={id} mode={props.mode} />;
};

export default ServiceContactsEdit