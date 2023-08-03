import React, { useEffect, useState,useRef } from "react";
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
import { WrapperItem, FieldEditCombobox, FileItem } from "..";
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
import { deletePHDNC, getDetailPHDNC, lockPHDNC, postPHDNC, resetPHDNC, updatePHDNC } from "../../actions/phdnc";
import { apiUrl, baseUrl } from "../../constants";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";
const BillPaymentRequestEditMain = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deNghiThanhToan = useSelector((state) => state.phdnc.deNghiThanhToan);
  const approvalProcess = useSelector(
    (state) => state.document.approvalProcess
  );
  const reviewProcess = useSelector((state) => state.document.reviewProcess);
  const postResult = useSelector((state) => state.phdnc.postResult);
  const lstObjcType = useSelector((state) => state.common.lstObjcType);
  const lstmngSubDcmn = useSelector((state) => state.common.lstmngSubDcmn);
  const lstmngSubDcmnSCTNC = useSelector(
    (state) => state.common.lstmngSubDcmnSCTNC
  );
  const lstAccObjcCode = useSelector(
    (state) => state.common.lstAccObjcCode
  );
  const lstCUOM = useSelector((state) => state.common.lstCUOM);
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
    MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
    MAINCODE: "",
    DCMNSBCD: "",
    CUOMCODE: "VND",
    CUOMRATE: 1.0,
    OBJCTYPE: -1,
    OBJCTYPENAME: "",
    OBJCCODE: "",
    OBJCNAME: "",
    ADVNCODE: "",
    ADVNDATE: moment(new Date()).format("YYYY-MM-DD"),
    SGSTCRAM: 0.0,
    RCPTCRAM: 0.0,
    RCPTAMNT: 0.0,
    SUM_CRAM: 0.0,
    ACOBCODE: "",
    MEXLNNTE: "",
    SCTNCODE: "",
    MLCTDESC: "",
    DDDD: "PHDNC",
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
    DETAIL: [],
  };
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (deNghiThanhToan) {
      setHeader(deNghiThanhToan !== undefined ? deNghiThanhToan : initHeader);
      var fileList = deNghiThanhToan.DCMNFILE;
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
   
  }, [deNghiThanhToan]);


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
        dispatch(getDetailPHDNC(postResult.RETNDATA[0].KKKK0000));
      }
      alert(postResult.RETNMSSG);
      dispatch(resetPHDNC());
    }
    
  }, [postResult])
  

  useEffect(() => {
    setHeader({ ...header, OBJCCODE: "" });
    dispatch(getLstAccObjcCode(header.OBJCTYPE));
  }, [header.OBJCTYPE]);

  useEffect(() => {
    setPermissions(header !== undefined ? header.STTESIGN === 0 : true);
    if(header && header.MAINCODE !== ""){
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
    DcmnView = DcmnView_DATA.find((item) => item.DCMNCODE === "PHDNC").GRP_VIEW;
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
    setOpenForm(true);
    setEditItem({ ...item, RFRNDATE: item.RFRNDATE !== "" ? new Date(item.RFRNDATE) : new Date() });
  };
  const enterRemove = (item) => {
    var newData = header.DETAIL.filter(
      (detail) => detail.BUSNCODE !== item.BUSNCODE
    );
    setHeader({ ...header, DETAIL: newData });
  };
  const handleSubmit = (e) => {
    console.log(e);
    var event = {
      ...e,
      RFRNDATE: moment(e.RFRNDATE).format("YYYY-MM-DD"),
    };
    var newData = [];
    if (header.DETAIL.find((x) => x.BUSNCODE == event.BUSNCODE) === undefined) {
      newData = [...header.DETAIL, event];
    } else {
      newData = header.DETAIL.map((item) => {
        if (event.BUSNCODE === item.BUSNCODE) {
          item = {
            ...event,
          };
        }
        return item;
      });
    }
    
   let sum = 0;
   newData.forEach((item) => {
     sum += item.MNEYCRAM;
   });
   setHeader({ ...header, DETAIL: newData, SGSTCRAM: sum, SUM_CRAM: sum });
   setOpenForm(false);
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
  const actionAdd = () =>{
    navigate("/spnd-sgst/new");
  }
  const actionDup = () => {
    setHeader({...header,STTESIGN:0, STTENAME:"", MAINCODE:"", MAINDATE:"", KKKK0000:""})
  };
  const actionSave = () => {
    var postJson = {
      DCMNCODE: "PHDNC",
      HEADER: [header],
    };
    
    if (header.KKKK0000){
      // update
      dispatch(updatePHDNC(postJson));
    }else{
      // Post 
      dispatch(postPHDNC(postJson));
    }
      
  };

  const actionLock = () => {
    const body = {
      DCMNCODE: "PHDNC",
      KEY_CODE: header.KKKK0000
    }
    dispatch(lockPHDNC(body));
  };

  const actionDelete = () => {
    const body = {
      DCMNCODE: "PHDNC",
      KEY_CODE: header.KKKK0000,
    };
    dispatch(deletePHDNC(body));
  };

  const doPostFile = (keycode) => {
    var myHeaders = new Headers();
    myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
    var formdata = new FormData();
    formdata.append("DCMNCODE", "PHDNC");
    formdata.append("KEY_CODE", keycode);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    for (var i = 0; i < files.length; i++) {
      var file = files[i].DATA;
      if (file === null || file.name === null) {
        continue;
      }
      formdata.append("Files", file, file.name);
    }
    fetch(baseUrl + apiUrl.postFile.value, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        
      })
      .catch((error) => console.log("error", error));
  };
const deleteFiles = () => {
  if (removeFiles.length > 0) {
    removeFiles.map((item) => {
      if (item.KEY_CODE != null && item.FILECODE != null) {
        doPostDeleteFiles(item.DCMNCODE, item.KEY_CODE, item.FILECODE);
      }
    });
    setRemoveFiles([]);
  }
};
const doPostDeleteFiles = (dcmnCode, key, fileCode) => {
  var myHeaders = new Headers();
  myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
  var formdata = new FormData();
  formdata.append("DCMNCODE", dcmnCode);
  formdata.append("KEY_CODE", key);
  formdata.append("FILECODE", fileCode);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "Https://Api-Dev.firstems.com/Api/data/runApi_File?run_Code=DTA012",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
const actionProgress = () => {
  const body = {
    DCMNCODE: "dmsAprvVchr",
    PARA_001: "PHDNC",
    PARA_002: header.KKKK0000,
    PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
  };
  if(showPopupProgress){
    setShowPopupProgress(false);
  }else{
    dispatch(getReviewProcess(body));
    setShowPopupProcedure(false);
    setShowPopupProgress(true);
  }
  
};
const actionProcedure = () => {
   const body = {
     DCMNCODE: "PHDNC",
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
document.body.addEventListener("click", (e) => {
  
});
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
                    {"Phiếu đề nghị thanh toán"} {"#"}
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
                            {/* Ma don hang */}
                            <div className="mr-1">
                              <Label className="text-sm text-gray-500">
                                {"Số phiếu đề nghị"}
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
                                {"Ngày đề nghị"}
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

                          {/* Loại đề nghị chi */}
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={"Loại đề nghị chi"}
                              id={"DCMNSBCD"}
                              data={lstmngSubDcmn}
                              defaultValue={
                                header !== undefined
                                  ? lstmngSubDcmn.find(
                                      (item) =>
                                        item.ITEMCODE === header.DCMNSBCD
                                    )
                                  : {}
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) => {
                                setHeader({
                                  ...header,
                                  DCMNSBCD: e.target.value.ITEMCODE,
                                });
                              }}
                              disabled={!permissions}
                            />
                          </div>
                          {/* Loại chi tiêu */}
                          {DcmnView.find((x) => x.DATACODE === "12").DATAVIEW >
                            0 && (
                            <div className="mb-3">
                              <FieldEditCombobox
                                title={"Loại chi tiêu"}
                                id={"SCTNCODE"}
                                data={lstmngSubDcmnSCTNC}
                                defaultValue={
                                  header !== undefined
                                    ? lstmngSubDcmnSCTNC.find(
                                        (item) =>
                                          item.ITEMCODE === header.SCTNCODE
                                      )
                                    : {}
                                }
                                textField="ITEMNAME"
                                dataItemKey="ITEMCODE"
                                onComboboxChange={(e) => {
                                  setHeader({
                                    ...header,
                                    SCTNCODE: e.target.value.ITEMCODE,
                                  });
                                }}
                                disabled={!permissions}
                              />
                            </div>
                          )}
                          {/* Loại đối tượng */}
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={"Loại đối tượng"}
                              id={"OBJCTYPE"}
                              data={lstObjcType}
                              defaultValue={
                                header.OBJCTYPE > 0
                                  ? lstObjcType.find(
                                      (item) =>
                                        parseInt(item.ITEMCODE) ===
                                        header.OBJCTYPE
                                    )
                                  : {}
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) => {
                                setHeader({
                                  ...header,
                                  OBJCTYPE: parseInt(e.target.value.ITEMCODE),
                                  OBJCTYPENAME: e.target.value.ITEMNAME,
                                });
                              }}
                              disabled={!permissions}
                            />
                          </div>
                          {/* Tên đối tượng */}
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={"Tên đối tượng"}
                              id={"OBJCCODE"}
                              data={lstAccObjcCode}
                              defaultValue={
                                header.OBJCCODE !== ""
                                  ? lstAccObjcCode.find(
                                      (item) =>
                                        item.ITEMCODE === header.OBJCCODE
                                    )
                                  : lstAccObjcCode[0]
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) => {
                                setHeader({
                                  ...header,
                                  OBJCCODE: e.target.value.ITEMCODE,
                                  OBJCNAME: e.target.value.ITEMNAME,
                                });
                              }}
                              disabled={!permissions}
                            />
                          </div>
                          {/* Lý do đề nghị */}
                          <div className="mb-3">
                            <Label className="text-sm text-gray-500">
                              {"Lý do đề nghị"}
                            </Label>
                            <TextArea
                              className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
                              rows={2}
                              value={header.MEXLNNTE}
                              disabled={!permissions}
                              onChange={(e) => {
                                setHeader({
                                  ...header,
                                  MEXLNNTE: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-1/3 w-full">
                        <div className="wrapper-item">
                          {/* Loai tien */}
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={getLabelValue(87, "Loại tiền")}
                              id={"CUOMCODE"}
                              data={lstCUOM}
                              defaultValue={
                                header !== undefined
                                  ? lstCUOM.find(
                                      (item) =>
                                        item.ITEMCODE === header.CUOMCODE + ""
                                    )
                                  : lstCUOM[0]
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) => {
                                setHeader({
                                  ...header,
                                  CUOMCODE: e.target.value.ITEMCODE,
                                });
                              }}
                              disabled={!permissions}
                            />
                          </div>

                          {/* Ty gia */}
                          <div className="mb-3">
                            {/* <FieldWrapper className="w-full"> */}
                            <FieldWrapper>
                              <Label
                                className="text-sm"
                                style={{ color: "grey" }}
                              >
                                {getLabelValue(88, "Tỷ giá")}
                              </Label>
                              <div className={"k-form-field-wrap"}>
                                <NumericTextBox
                                  id="CUOMRATE"
                                  name="CUOMRATE"
                                  style={{
                                    borderColor: "grey",
                                    textAlign: "right",
                                  }}
                                  type="number"
                                  className={`text-number ${appColors.inputColor}`}
                                  value={header.CUOMRATE}
                                  disabled={!permissions}
                                  onChange={(e) =>
                                    setHeader({
                                      ...header,
                                      CUOMRATE: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </FieldWrapper>
                          </div>

                          {/* Số phiếu tạm ứng nếu có */}
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={"Số phiếu tạm ứng(nếu có)"}
                              id={"CuomCode"}
                              data={[]}
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) => {
                                setCuomCodeSelected(e.target.value);
                                setHeader({
                                  ...header,
                                  CUOMCODE: e.target.value.ITEMCODE,
                                });
                              }}
                              disabled={!permissions}
                            />
                          </div>

                          <div className="flex justify-between mb-3">
                            {/* Số tiền tạm ứng */}
                            <div className="mr-1">
                              <Label className="text-sm text-gray-500">
                                {"Số tiền tạm ứng"}
                              </Label>
                              <Input
                                id="RCPTCRAM"
                                name="RCPTCRAM"
                                style={{ borderColor: "grey" }}
                                value={header?.RCPTCRAM}
                                type="text"
                                disabled={true}
                                className={appColors.inputColor}
                              />
                            </div>

                            {/* Ngay tạm ứng */}
                            <div className="ml-1">
                              <Label className="text-sm text-gray-500">
                                {"Ngày tạm ứng"}
                              </Label>
                              <DatePicker
                                format="dd/MM/yyyy"
                                weekNumber={true}
                                defaultValue={
                                  new Date(header.ADVNDATE) || new Date()
                                }
                                disabled
                                className={appColors.inputColor}
                                onChange={(e) => {
                                  setHeader({
                                    ...header,
                                    ADVNDATE: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>

                          {/* File đính kèm */}
                          <div className="file-attach">
                            <div className="flex mb-3">
                              <p className="w-full">
                                {getLabelValue(57, "File đính kèm")}
                              </p>
                              {permissions && (
                                <input
                                  type="file"
                                  multiple
                                  className="text-sm cursor-pointer relative block w-full h-full"
                                  onChange={(e) => {
                                    onFileSelected(e);
                                    e.target.value == null;
                                  }}
                                  disabled={!permissions}
                                />
                              )}
                            </div>
                            <div>
                              <div>
                                {files &&
                                  files.length > 0 &&
                                  files.map((fileItem) => (
                                    <FileItem
                                      key={fileItem.id}
                                      fileItem={fileItem}
                                      onFileRemove={onFileRemove}
                                      disabled={permissions}
                                    />
                                  ))}
                              </div>
                            </div>
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
          {/* Tinh toan tien bac */}
          <div className="w-full md:basis-1/4">
            <div
              className={`border-solid border-[1px] md:border-0 md:p-0 border-borderBase hover:border-blue-700 h-full lg:mr-2 mr-0 ${appColors.stackColor}`}
            >
              <p className="text-sm text-black font-semibold w-full p-3">
                {getLabelValue(49, "Tạm tính")}
              </p>
              <div className="h-[1px] bg-borderBase"></div>
              <div className="p-3">
                {/* Số tiền đề nghị chi */}
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {"Số tiền đề nghị chi"}
                  </p>
                  <NumericTextBox
                    id="SGSTCRAM"
                    name="SGSTCRAM"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    value={header.SGSTCRAM}
                    type="number"
                    disabled
                    className={`text-number ${appColors.inputColor}`}
                  />
                </div>

                {/* Số tiền chi */}
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {"Số tiền chi"}
                  </p>
                  <NumericTextBox
                    id="SUM_CRAM"
                    name="SUM_CRAM"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    type="number"
                    className={`text-number ${appColors.inputColor}`}
                    disabled
                    value={header.SUM_CRAM}
                  />
                </div>
              </div>
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
              field="BUSNCODE"
              title={getLabelValue(61, "Mã")}
              width="110px"
            />
            <GridColumn
              headerCell={DetailHeader}
              field="MEXLNNTE_D"
              title={"Lý do chi tiền"}
            />
            <GridColumn
              headerCell={DetailHeader}
              field="MNEYCRAM"
              title={"Số tiền"}
              editor="numeric"
              format="{0:n}"
              className="customColumn numberic-right"
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
                  RFRNDATE: moment(new Date()).format("YYYY-MM-DD"),
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

export default BillPaymentRequestEditMain;
