import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { FieldWrapper } from "@progress/kendo-react-form";
import {
  Input,
  NumericTextBox,
  TextArea,
  Checkbox,
  MaskedTextBox,
} from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { DatePicker, DateTimePicker } from "@progress/kendo-react-dateinputs";
import { ComboBox, DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn,
  GridToolbar,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import { useStateContext } from "../../context/ContextProvider";
import {
  WrapperItem,
  FieldEditCombobox,
  FileItem,
  FieldEditMultiSelect,
} from "..";
import * as api from "../../api/index";
import DetailHeader from "./DetailHeader";
import EditForm from "./EditForm";
import { getLstAccObjcCode } from "../../actions/common";
import EditCommandCell from "./EditCommandCell.jsx";
import { Popup } from "@progress/kendo-react-popup";
import { v4 } from "uuid";
import { BiSave, BiArrowBack } from "react-icons/bi";
import {
  AiFillFileExcel,
  AiFillFileImage,
  AiFillFileText,
  AiOutlineFilePdf,
  AiOutlineEdit,
} from "react-icons/ai";
import ActionBar from "../Documents/ActionBar";
import moment from "moment/moment";
import {
  deletePDKCT,
  getDetailPDKCT,
  lockPDKCT,
  postPDKCT,
  resetPDKCT,
  updatePDKCT,
} from "../../actions/pdkct";
import { apiUrl, baseUrl } from "../../constants";
import { getApprovalProcess, getLvTm, getReviewProcess } from "../../actions/document";
import { list } from "postcss";
import {
  deleteFileService,
  deleteService,
  editDetailsAfterPost,
  editService,
  lockService,
  postFileService,
  removeService,
  submitService,
} from "./Service";
import { CellBussinessPlace, CellBussinessType, CellDate } from "./CustomCell";
import { duplicateService } from "../Documents/Service";

const dcmncCode = "PDKCT";
const userData = JSON.parse(localStorage.getItem("userData"));

const BusinessRegistrationEditMain = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailDocument = useSelector((state) => state.PDKCT.detail);
  const approvalProcess = useSelector(
    (state) => state.document.approvalProcess
  );
  const reviewProcess = useSelector((state) => state.document.reviewProcess);
  const postResult = useSelector((state) => state.PDKCT.postResult);
  const lstLocationType = useSelector((state) => state.common.lstLocationType);
  const lstProvince = useSelector((state) => state.common.lstProvince);
  const lstNation = useSelector((state) => state.common.lstNation);
  const lstTimekeepingTypeCT = useSelector(
    (state) => state.common.lstTimekeepingTypeCT
  );
  const [actions, setActions] = useState(
    props.mode === "ADD"
      ? {
          procedure: false, // Quy trình
          progress: false, // Quá trình
          add: false, // Thêm mới
          dup: false, // Nhân bản
          save: true, // Lưu
          lock: true, // Khóa
          delete: false, // Xóa
        }
      : {
          procedure: true,
          progress: false,
          add: true,
          dup: true,
          save: false,
          lock: false,
          delete: false,
        }
  );
  const [showPopupProcedure, setShowPopupProcedure] = useState(false);
  const [showPopupProgress, setShowPopupProgress] = useState(false);
  const { setDisableLocation, getLabelValue, appColors } = useStateContext();
  const [permissions, setPermissions] = useState(true);
  const [tabSelected, setTabSelected] = useState(0);
  const currentDate = new Date();
  const initHeader = {
    COMPCODE: userData.COMPCODE,
    LCTNCODE: userData.LCTNCODE,
    MAINCODE: "",
    MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
    EMPLCODE: userData.EMPLCODE,
    EMPLNAME: userData.EMPLNAME,
    SRVCRQST: "",
    BEG_DATE: moment(new Date()).format("YYYY-MM-DD"),
    END_DATE: moment(new Date()).format("YYYY-MM-DD"),
    MCNTNTEXT: "",
    WORK_DAY: 0.0,
    PSTNCODE: "",
    DDDD: "PDKCT",
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
    DETAIL: [],
  };
  const services = [
    {
      ITEMCODE: "0",
      ITEMNAME: "Đặt vé máy bay",
    },
    {
      ITEMCODE: "1",
      ITEMNAME: "Đặt vé tàu lửa",
    },
    {
      ITEMCODE: "2",
      ITEMNAME: "Đặt Khách sạn/Nhà nghỉ",
    },
    {
      ITEMCODE: "3",
      ITEMNAME: "Xe công tác trọn chuyến",
    },
    {
      ITEMCODE: "4",
      ITEMNAME: "Làm passport/Thủ tục visa",
    },
    {
      ITEMCODE: "5",
      ITEMNAME: "Tạm ứng công tác phí",
    },
    {
      ITEMCODE: "6",
      ITEMNAME: "Đặt vé tàu thủy",
    },
    {
      ITEMCODE: "7",
      ITEMNAME: "Đặt vé máy bay",
    },
  ];
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (detailDocument) {
      var modDetails = [];
      if (detailDocument.DETAIL != null && detailDocument.DETAIL.length > 0) {
        detailDocument.DETAIL.map((item) => {
          var workType = lstLocationType.find(
            (x) => x.ITEMCODE === item.WORKTYPE
          );
          var workPlace = "";
          workType.ITEMCODE === "01"
            ? (workPlace = lstProvince.find(
                (x) => x.ITEMCODE === item.WORKPLAC
              ))
            : (workPlace = lstNation.find((x) => x.ITEMCODE === item.WORKPLAC));
          modDetails.push({
            ...item,
            WORKTYPE: workType,
            WORKPLAC: workPlace,
            TIMEMORN: lstTimekeepingTypeCT.find(
              (x) => x.ITEMCODE === item.TIMEMORN
            ),
            TIMEEVEN: lstTimekeepingTypeCT.find(
              (x) => x.ITEMCODE === item.TIMEEVEN
            ),
            TIMEAFTR: lstTimekeepingTypeCT.find(
              (x) => x.ITEMCODE === item.TIMEAFTR
            ),
          });
        });
      }
      setHeader(
        detailDocument !== undefined
          ? { ...detailDocument, DETAIL: modDetails }
          : initHeader
      );
      var fileList = detailDocument.DCMNFILE;
      if (fileList && fileList.length > 0) {
        setFiles([]);
        fileList.map((file) => {
          if (file.FILENAME) {
            const icon = getFileIcon(file.FILETYPE);
            setFiles((dcmnFiles) => [
              ...dcmnFiles,
              {
                id: v4(),
                FILENAME: file.FILENAME,
                FILEPATH: file.FILE_URL,
                FILETYPE: file.FILETYPE,
                ICON: icon,
                DATA: null,
                FILECODE: file.FILECODE,
                DCMNCODE: file.DCMNCODE,
                KEY_CODE: file.KEY_CODE,
              },
            ]);
          }
        });
      }
    }
  }, [detailDocument]);

  
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf": {
        return <BiSave />;
      }
      case "xls": {
        return <AiFillFileExcel />;
      }
      case "png": {
        return <AiFillFileImage />;
      }
      default: {
        return <AiFillFileText />;
      }
    }
  };

  useEffect(() => {
    if (postResult) {
      if (postResult.RETNCODE) {
        deleteFiles();
        if (files.length > 0) {
          doPostFile(postResult.RETNDATA[0].KKKK0000);
        }
        dispatch(getDetailPDKCT(postResult.RETNDATA[0].KKKK0000));
      }
      alert(postResult.RETNMSSG);
      dispatch(resetPDKCT());
    }
  }, [postResult]);

  useEffect(() => {
    setHeader({ ...header, OBJCCODE: "" });
    dispatch(getLstAccObjcCode(header.OBJCTYPE));
  }, [header.OBJCTYPE]);

  useEffect(() => {
    setPermissions(header !== undefined ? header.STTESIGN === 0 : true);
    if (header && header.MAINCODE !== "") {
      if (header.STTESIGN > 0) {
        // Chứng từ đã khóa
        setActions({
          procedure: true,
          progress: true,
          add: true,
          dup: true,
          save: false,
          lock: false,
          delete: false,
        });
      } else {
        setActions({
          procedure: true,
          progress: false,
          add: true,
          dup: true,
          save: true,
          lock: true,
          delete: true,
        });
      }
    }
  }, [header]);

  var DcmnView;
  if (localStorage.getItem("DcmnView")) {
    var DcmnView_DATA = JSON.parse(localStorage.getItem("DcmnView"));
    var dcmnFind = DcmnView_DATA.find((item) => item.DCMNCODE === dcmncCode);
    DcmnView = dcmnFind != undefined ? dcmnFind.GRP_VIEW : [];
  }

  const [files, setFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  const onFileRemove = (fileItem) => {
    setRemoveFiles([...removeFiles, fileItem]);
    setFiles((prevState) =>
      prevState.filter((item) => item.id !== fileItem.id)
    );
  };
  const onFileSelected = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const fileType = file.name
        .split(".")
        [file.name.split(".").length - 1].toLowerCase();

      const icon = getFileIcon(fileType);
      //const icon = ExcelIcon
      setFiles((dcmnFiles) => [
        ...dcmnFiles,
        {
          id: v4(),
          FILENAME: file.name,
          FILEPATH: file.path,
          FILETYPE: fileType,
          ICON: icon,
          DATA: file,
        },
      ]);
    }
    e.preventDefault();
  };
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState({});

  const enterEdit = (item) => {
    editService(item, setEditItem, setOpenForm)
  };

  const enterRemove = (item) => {
    removeService(item, header, setHeader)
  };

  const handleSubmit = (e) => {
    console.log("HnaSubmit is called")
    submitService(e, userData, header, setHeader, setOpenForm);
  };

  const handleCancelEdit = () => {
    setOpenForm(false);
  };

  const MyEditCommandCell = (props) => (
    <EditCommandCell
      {...props}
      enterEdit={enterEdit}
      enterRemove={enterRemove}
    />
  );
  const actionAdd = () => {
    navigate("/task-schedule/new");
  };
  const actionDup = () => {
    duplicateService(header, setHeader)
  };
  const actionSave = () => {
    var modDetails = editDetailsAfterPost(header.DETAIL)
    header.DETAIL = modDetails;
    var postJson = {
      DCMNCODE: dcmncCode,
      HEADER: [header],
    };

    if (header.KKKK0000) {
      // update
      dispatch(updatePDKCT(postJson));
    } else {
      // Post
      dispatch(postPDKCT(postJson));
    }
  };

  const actionLock = () => {
    lockService(dcmncCode, header, dispatch);
  };

  const actionDelete = () => {
    deleteService(dcmncCode, header,dispatch)
  };

  const doPostFile = (keycode) => {
    postFileService(dcmncCode, keycode,files)
  };

  const deleteFiles = () => {
    if (removeFiles.length > 0) {
      deleteFileService(removeFiles, setRemoveFiles);
    }
  };

  const actionProgress = () => {
    const body = {
      DCMNCODE: "dmsAprvVchr",
      PARA_001: dcmncCode,
      PARA_002: header.KKKK0000,
      PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
    };
    if (showPopupProgress) {
      setShowPopupProgress(false);
    } else {
      dispatch(getReviewProcess(body));
      setShowPopupProcedure(false);
      setShowPopupProgress(true);
    }
  };
  const actionProcedure = () => {
    const body = {
      DCMNCODE: dcmncCode,
      KEY_CODE: header.KKKK0000,
    };
    if (showPopupProcedure) {
      setShowPopupProcedure(false);
    } else {
      dispatch(getApprovalProcess(body));
      setShowPopupProcedure(true);
      setShowPopupProgress(false);
    }
  };

  return (
    <div>
      <div id="general" className="p-2">
        {console.log(actions)}
        <ActionBar
          actions={actions}
          add={actionAdd}
          dup={actionDup}
          save={actionSave}
          lock={actionLock}
          delete={actionDelete}
          progress={actionProgress}
          procedure={actionProcedure}
          approvalProcess={approvalProcess}
          reviewProcess={reviewProcess}
          showPopupProcedure={showPopupProcedure}
          showPopupProgress={showPopupProgress}
        />
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
                    {"Đăng ký công tác"} {"#"}
                    {header != null && header.MAINCODE != null
                      ? header.MAINCODE
                      : props.keycode}{" "}
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
              <TabStrip
                selected={tabSelected}
                onSelect={(e) => {
                  setTabSelected(e.selected);
                }}
                className="Tab-flex"
              >
                <TabStripTab title={"Thông tin chung"}>
                  <div className="order-customer">
                    <div className="wrapper lg:flex lg:justify-between flex-none gap-4">
                      <div className="lg:w-1/3 w-full">
                        <div className="wrapper-item">
                          <div className="flex justify-between mb-3">
                            {/* Số chứng từ */}
                            <div className="mr-1">
                              <Label className="text-sm text-gray-500">
                                {"Số chứng từ"}
                              </Label>
                              <Input
                                id="MAINCODE"
                                name="MAINCODE"
                                style={{ borderColor: "grey" }}
                                value={header?.MAINCODE}
                                type="text"
                                disabled={true}
                                className={appColors.inputColor}
                              />
                            </div>

                            {/* Ngay tao */}
                            <div className="ml-1">
                              <Label className="text-sm text-gray-500">
                                {"Ngày lập"}
                              </Label>
                              <DatePicker
                                format="dd/MM/yyyy"
                                weekNumber={true}
                                defaultValue={new Date(header.MAINDATE)}
                                disabled
                                className={appColors.inputColor}
                              />
                            </div>
                          </div>
                          <div className="flex justify-between mb-3">
                            {/* Từ ngày */}
                            <div className="mr-1">
                              <Label className="text-sm text-gray-500">
                                {"Từ ngày"}
                              </Label>
                              <DatePicker
                                format="dd/MM/yyyy"
                                weekNumber={true}
                                defaultValue={new Date(header.BEG_DATE)}
                                className={appColors.inputColor}
                              />
                            </div>

                            {/* Đến ngày */}
                            <div className="ml-1">
                              <Label className="text-sm text-gray-500">
                                {"Đến ngày"}
                              </Label>
                              <DatePicker
                                format="dd/MM/yyyy"
                                weekNumber={true}
                                defaultValue={new Date(header.END_DATE)}
                                className={appColors.inputColor}
                              />
                            </div>
                          </div>
                          {/* Tổng số ngày */}
                          <div className="mb-3">
                            <Label className="text-sm text-gray-500">
                              {"Tổng số ngày"}
                            </Label>
                            <NumericTextBox
                              id="WORK_DAY"
                              name="WORK_DAY"
                              style={{
                                borderColor: "grey",
                                textAlign: "right",
                              }}
                              className={`text-number ${appColors.inputColor}`}
                              value={header.WORK_DAY}
                              disabled
                              onChange={(e) =>
                                setHeader({
                                  ...header,
                                  WORK_DAY: e.target.value,
                                })
                              }
                            />
                          </div>

                          {/* Nội dung công tác */}
                          <div className="mb-3">
                            <Label className="text-sm text-gray-500">
                              {" Nội dung công tác"}
                            </Label>
                            <TextArea
                              className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
                              rows={2}
                              value={header.MCNTNTEXT}
                              disabled={!permissions}
                              onChange={(e) => {
                                setHeader({
                                  ...header,
                                  MCNTNTEXT: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-1/3 w-full">
                        <div className="wrapper-item">
                          {/* Yêu cầu dịch vụ */}
                          <div className="mb-3">
                            <FieldEditMultiSelect
                              title={"Yêu cầu dịch vụ"}
                              id={"SRVCRQST"}
                              data={services}
                              defaultValue={
                                header !== undefined
                                  ? services.filter((item) =>
                                      header.SRVCRQST.includes(item.ITEMCODE)
                                    )
                                  : []
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) => {
                                var listServiceCode = [];
                                e.value.map((item) =>
                                  listServiceCode.push(item.ITEMCODE)
                                );
                                setHeader({
                                  ...header,
                                  SRVCRQST: listServiceCode.join(),
                                });
                              }}
                              disabled={!permissions}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-1/3 w-full"></div>
                    </div>
                  </div>
                </TabStripTab>
              </TabStrip>
            </div>
          </div>
        </div>
      </div>
      <div
        id="detail"
        className="lg:m-2 m-0 mt-4 bg-blue-50 border-solid border-[1px] border-borderBase hover:border-blue-700"
      >
        <div className="hidden lg:block md:block">
          <Grid
            data={header.DETAIL}
            dataItemKey={"BUSNCODE"}
            style={{ height: "100%" }}
          >
            <GridNoRecords>
              <p className="text-red-700 italic">
                {" "}
                {getLabelValue(71, "Không có dữ liệu")}
              </p>
            </GridNoRecords>
            <GridColumn
              headerCell={DetailHeader}
              field="FRLVDATE"
              title={"Từ ngày"}
              width="150px"
              cell={CellDate}
            />
            <GridColumn
              headerCell={DetailHeader}
              field="TOLVDATE"
              title={"Đến ngày"}
              width="150px"
              cell={CellDate}
            />
            <GridColumn
              headerCell={DetailHeader}
              title={"Nơi công tác"}
              field="WORKPLAC"
              cell={CellBussinessPlace}
            />
            <GridColumn
              headerCell={DetailHeader}
              title={"Loại chấm công sáng"}
              field="TIMEMORN"
              cell={CellBussinessType}
            />
            <GridColumn
              headerCell={DetailHeader}
              title={"Loại chấm công chiều"}
              field="TIMEAFTR"
              cell={CellBussinessType}
            />
            <GridColumn
              headerCell={DetailHeader}
              title={"Loại chấm công tối"}
              field="TIMEEVEN"
              cell={CellBussinessType}
            />
            <GridColumn
              headerCell={DetailHeader}
              title={"Số ngày"}
              field="SUMLVDT"
              width="150px"
            />
            {permissions && (
              <GridColumn
                cell={MyEditCommandCell}
                width="150px"
                headerCell={DetailHeader}
                title={"Chức năng"}
              />
            )}
          </Grid>
        </div>
        {openForm && (
          <EditForm
            cancelEdit={handleCancelEdit}
            onSubmit={handleSubmit}
            item={editItem}
            DcmnView={DcmnView}
          />
        )}
        {/* Nut Them dong Detail */}
        <div className="p-3">
          {permissions && (
            <button
              type="button"
              disabled={!permissions}
              className={`outline outline-offset-2 outline-1 hover:outline-2 rounded-sm pr-2 pl-2 text-sm`}
              onClick={() =>
                enterEdit({
                  BUSNCODE:
                    header.DETAIL.length > 0
                      ? parseInt(
                          header.DETAIL[header.DETAIL.length - 1].BUSNCODE
                        ) + 1
                      : 1,
                  FRLVDATE: new Date(),
                  TOLVDATE: new Date(),
                })
              }
            >
              {getLabelValue(73, "Thêm dòng")}
            </button>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
};


export default BusinessRegistrationEditMain