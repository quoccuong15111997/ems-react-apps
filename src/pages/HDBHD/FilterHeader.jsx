import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

import { useStateContext } from "../../context/ContextProvider";
import api from "../../api";
import { apiUrl } from "../../constants";

const FilterHeader = (props) => {
  const { setNotificationsAutoClose, getLabelValue } = useStateContext();

  var initDateFrom = new Date();
  var initDateTo = new Date();
  const [dateFrom, setdateFrom] = useState(initDateFrom);
  const [dateTo, setdateTo] = useState(initDateTo);

  const [orders, setOrders] = useState([]);
  const [sumDocuments, setSumDocuments] = useState(0);

  const loadDataOrder = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listDocument.value, {
        DCMNCODE: "HDBHD",
        STTESIGN: 7,
        BEG_DATE:
          dateFrom.getFullYear() +
          "-" +
          ("0" + (dateFrom.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + dateFrom.getDate()).slice(-2),
        END_DATE:
          dateTo.getFullYear() +
          "-" +
          ("0" + (dateTo.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + dateTo.getDate()).slice(-2),
      })
      .then((result) => {
        var data = result.data.RETNDATA;

        const convertdata = data.map((item) => {
          return {
            KKKK0000: item.KKKK0000,
            MAINCODE: item.MAINCODE,
            MAINDATE: new Date(item.MAINDATE),
            NOTETEXT: item.NOTETEXT,
            STTENAME: item.STTENAME,
            STTESIGN: item.STTESIGN,
            DCMNCODE: "DDHKH",
          };
        });
        setOrders(convertdata ? convertdata : []);
        setSumDocuments(convertdata.length);
        setNotificationsAutoClose("Tải dữ liệu thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  props.ListMaster(orders);

  return (
    <div className="w-full lg:flex bg-blue-200 p-3">
      <div className="flex">
        <div className="flex items-center">
          <div className="w-fit text-xs">{getLabelValue(15, "Từ ngày:")}</div>
          <div className="lg:ml-3">
            <Flatpickr
              className="p-1"
              options={{
                enableTime: false,
                dateFormat: "d-m-Y",
              }}
              value={dateFrom}
              onChange={([date]) => {
                setdateFrom(new Date(date));
              }}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-fit text-xs lg:ml-3">
            {getLabelValue(16, "đến ngày:")}
          </div>
          <div className="lg:ml-3">
            <Flatpickr
              className="p-1"
              options={{
                enableTime: false,
                dateFormat: "d-m-Y",
              }}
              value={dateTo}
              onChange={([date]) => {
                setdateTo(new Date(date));
              }}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="rounded-md bg-green-500 text-white pl-5 pr-5 ml-5 items-center w-32 m-3"
        onClick={loadDataOrder}
      >
        {getLabelValue(17, "Lọc")}
      </button>
      <div className="flex items-center ml-10">
        <div className="w-fit text-xs">
          {getLabelValue(18, "Tổng số chứng từ:")}
        </div>
        <div className="ml-3 text-red-700 text-xs font-semibold">
          {sumDocuments}
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;
