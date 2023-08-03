import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "../MainButton";
import { useStateContext } from "../../context/ContextProvider";
import { Popup } from "@progress/kendo-react-popup";
import {
  MdAddCircle,
  MdAddCircleOutline,
  MdContentCopy,
  MdLockOutline,
  MdOutlineDelete,
  MdOutlineSave,
  MdChecklist,
  MdSchema,
} from "react-icons/md";
import { FcLeft, FcRight } from "react-icons/fc";
import { v4 } from "uuid";
const ActionBar = (props) => {
    const navigate = useNavigate();
  const { setDisableLocation, getLabelValue, appColors } = useStateContext();
  const anchorProcedure = useRef(null);
  const anchorProgress = useRef(null);
  const [reviewProgress, setReviewProgress] = useState([]);
  const [popupTitle, setPopupTitle] = useState(
    getLabelValue(86, "Quá trình phê duyệt")
  );

  const handelPrevious = () =>{
    navigate(-1);
  }
  return (
    <div className={"p-5 flex justify-between items-center"}>
      <div className="order-first flex items-center">
        {/* Dau mui ten , event Click vao hien thi danh sach Luoi */}
        <button className="text-base mr-2" onClick={handelPrevious}>
          <FcLeft />
        </button>

        {/* Nut Quy trinh xet duyet, Qua trinh xet duyet */}
        <div id="view-button" className="flex">
          {props.actions.procedure && (
            <div ref={anchorProcedure} id="procedure">
              <MainButton
                title="Quy trình"
                icon={<MdSchema />}
                customClick={props.procedure}
              />
              <Popup
                anchor={anchorProcedure.current}
                show={props.showPopupProcedure}
                popupClass={"popup-content"}
                animate={false}
              >
                <div>
                  {props.approvalProcess.data != null &&
                  props.approvalProcess.data.length > 0 ? (
                    <div className="p-3 bg-[#fff8f0]">
                      <span className="text-md font-semibold text-secondary w-full text-center">
                        {"Quy trình"}
                      </span>
                      {props.approvalProcess.data.map((item) => (
                        <div key={v4()}>
                          <div className="ml-3">
                            <div className="text-black">
                              {item.PRCSODER}. {item.EMPLNAME} {" - "}
                              <span className="text-primary">
                                {item.FLOWNAME}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-[#fff8f0]">
                      <span className="text-md font-semibold text-secondary w-full text-center">
                        {"Quy trình"}
                      </span>
                      <div>
                        <span className="text-sm text-red-600 italic">
                          Không có thông tin
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Popup>
            </div>
          )}
          {props.actions.progress && (
            <div ref={anchorProgress} id="progress">
              <MainButton
                title="Quá trình"
                icon={<MdChecklist />}
                customClick={props.progress}
              />
              <Popup
                anchor={anchorProgress.current}
                show={props.showPopupProgress}
                popupClass={"popup-content"}
                animate={false}
              >
                <div>
                  {props.reviewProcess.data != null &&
                  props.reviewProcess.data.length > 0 &&
                  props.reviewProcess.data[0].DETAIL !== null &&
                  props.reviewProcess.data[0].DETAIL.length > 0 ? (
                    <div className="p-3 bg-[#fff8f0]">
                      <span className="text-md font-semibold text-secondary w-full text-center">
                        {"Quá trình"}
                      </span>
                      {props.reviewProcess.data[0].DETAIL.map((item) => (
                        <div key={v4()}>
                          <div>
                            <div className="text-black font-semibold">
                              {item.PRCSAPRV} {". "} {item.EMPCNAME}
                            </div>
                            <div className="ml-3">
                              <div className="text-black">
                                Ngày: {item.PRCSDATE}
                              </div>
                              <div className="text-black">{item.PRCSNAME}</div>
                              <div className="text-black">{item.PRCSNOTE}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-[#fff8f0]">
                      <span className="text-md font-semibold text-secondary w-full text-center">
                        {popupTitle}
                      </span>
                      <div>
                        <span className="text-sm text-red-600 italic">
                          Không có thông tin
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Popup>
            </div>
          )}
        </div>
      </div>
      {/* Nut function Them, Nhan doi, Luu, Trinh ky, Khoa*/}
      <div id="action-button" className="flex order-last">
        {/* Them moi */}
        {props.actions.add && (
          <MainButton
            title={getLabelValue(14, "Thêm mới")}
            icon={<MdAddCircleOutline />}
            customClick={props.add}
            className="AddItem"
          />
        )}

        {/* Nhan ban */}
        {props.actions.dup && (
          <MainButton
            title="Nhân bản"
            customClick={props.dup}
            icon={<MdContentCopy />}
            className="dupItem"
          />
        )}

        {/* 3 nut Luu, Trinh ky, Xoa */}
        {props.actions.save && (
          <MainButton
            title={getLabelValue(78, "Lưu")}
            customClick={props.save}
            icon={<MdOutlineSave className="text-blue-600 hover:text-white" />}
            className="dupItem"
          />
        )}

        {props.actions.lock && (
          <MainButton
            title={getLabelValue(79, "Trình ký")}
            customClick={props.lock}
            icon={<MdLockOutline className="text-blue-600 hover:text-white" />}
            className="dupItem"
          />
        )}
        {props.actions.delete && (
          <MainButton
            title={getLabelValue(80, "Xóa")}
            customClick={props.delete}
            icon={
              <MdOutlineDelete className="text-blue-600 hover:text-white" />
            }
            className="dupItem"
          />
        )}
      </div>
    </div>
  );
};

export default ActionBar;
