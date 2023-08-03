import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../api";
import { apiUrl } from "../../constants";
import { useStateContext } from "../../context/ContextProvider";

const RetailEdit = (props) => {
  const { getLabelValue, appColors } = useStateContext();
  const currentDate = new Date();
  const initHeader = {
    COMPCODE: JSON.parse(localStorage.getItem("company")).COMPCODE,
    LCTNCODE: JSON.parse(localStorage.getItem("userData")).LCTNCODE,
    ODERCODE: "",
    ODERDATE: moment(currentDate).format("YYYY-MM-DD"),

    // Thong tin Khach hang
    CUSTCODE: "",
    MCUSTNME: "",
    CUSTADDR: "", // Dia chi Khach hang
    CUST_TEL: "", // Số điện thoại khách hàng
    NOTETEXT: "", // Nội dung đơn hàng
    EMPLCODE: JSON.parse(localStorage.getItem("userData")).EMPLCODE, // NV ban hang

    CUOMCODE: "", // DVTT
    CUOMRATE: 1, // Ty gia

    PYMNNUMB: 1, // So ngay Ky han tt
    PYMNPERD: "D", // Loai Ky han tt

    DLVRTYPE: "",
    DLVRDATE: currentDate, // Ngay gio giao hang
    DLVRHOUR: 0,
    DLVRMTHD: 1, // Phuong thuc giao hang
    DLVRADDR: "", // Loại giao hang
    CAR_ADDR: "", // KQ loai giao hang
    PAY_MTHD: 0, // Phuong thuc thanh toan

    RCVREMPL: "", // Người nhận hàng
    RCVR_TEL: "", // SĐT nhận hàng

    // Thong tin cac loai tien
    SUM_CRFR: 0, // Tien hang truoc tinh chi phi
    SUM_AMFR: 0, // Tien hang truoc tinh chi phi (VND)
    VAT_RATE: 0, // Thuế xuất
    VAT_CRAM: 0, // Tiền thuế
    VAT_AMNT: 0, // Tien thue VND

    RDTNRATE: 0, // % Chiết khấu
    RDTNCRAM: 0, // Số tiền chiết khấu
    RDTNAMNT: 0, // Số tiền chiết khấu VND
    CSCMRATE: 0, // % Hoa hồng

    DLVRRATE: 0, // % thuế Vận chuyển
    DLVRCRAM: 0, // Tiền Vận chuyển
    DLVRAMNT: 0, // Tiền Vận chuyển VND

    SUM_CRAM: 0, // Tổng tiền
    SUM_AMNT: 0, // Tong tien sau thue VND
    SMPRQTTY: 0, // Tổng số lượng

    DCMNSBCD: "",

    DLVRPRVN: "", // Tinh
    DLVRDIST: "", // Huyen
    DLVRWARD: "", // Xa
    DLVRNUMB: "", // Dia chi cu the
    DLVRPLCE: "", // Dia diem nhan
    VAT_OUPT: 0, // Co Xuat HD hay khong? 1: Co; 0: Khong
    VAT_CUST: "", // Ten Khach xuat HD
    VAT_ADDR: "", // Dia chi tren HD
    TAX_CODE: "", // MST

    USERLGIN: JSON.parse(localStorage.getItem("userData")).USERCODE,
    SRC_DATA: 2,
    DDDD: "DDHKH",
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
  };
  const [header, setHeader] = useState(initHeader);

  return (
    <div className="pb-10">
      <div className="flex md:flex-row flex-col">
        <div className="w-full md:flex-row flex-col">
          <div
            className={`lg:ml-2 ml-0 lg:mr-2 mr-0 lg:p-5 p-0 bg-white border-solid lg:border-[1px] border-0 lg:mb-0 mb-2 border-borderBase hover:border-blue-700 ${appColors.stackColor}`}
          >
            {/* Tieu de */}
            <div className="flex">
              <div className="w-full mb-3">
                <h4 className="text-xl">
                  {" "}
                  {getLabelValue(115, "Chứng từ")} {"#"}
                  {header != null && header.ODERCODE != null
                    ? header.ODERCODE
                    : props.maincode}{" "}
                  {getLabelValue(25, "chi tiết")}
                </h4>
                <div className="font-semibold text-sm cursor-pointer text-white">
                  {header.STTENAME && (
                    <span className="text-red-600 rounded-md underline items-center italic">
                      {header.STTENAME ? header.STTENAME : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailEdit;
