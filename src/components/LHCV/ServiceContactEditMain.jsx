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
  deleteLHCV,
  getDetailLHCV,
  lockLHCV,
  postLHCV,
  resetLHCV,
  updateLHCV,
} from "../../actions/lhcv";
import { apiUrl, baseUrl } from "../../constants";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";
import { list } from "postcss";

const dcmncCode = "LHCV";
const userData = JSON.parse(localStorage.getItem("userData"));

const ServiceContactEditMain = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lienHeCongVu = useSelector((state) => state.LHCV.lienHeCongVu);
  const lstmngSubDcmnLHCV = useSelector(
    (state) => state.common.lstmngSubDcmnLHCV
  );
  const appEmplList = useSelector((state) => state.common.appEmplList);
  const approvalProcess = useSelector(
    (state) => state.document.approvalProcess
  );
  const reviewProcess = useSelector((state) => state.document.reviewProcess);
  const postResult = useSelector((state) => state.LHCV.postResult);
 
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
    LCTNCODE: userData.LCTNCODE,
    MAINCODE: "",
    MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
    EMPLSEND: userData.EMPLCODE,
    EMPLRECV: "",
    EMPLREFR: "",
    DCMNSBCD: "",
    MPURPNME: "",
    MCONTENT: "",
    FISHDATE: moment(new Date()).format("YYYY-MM-DD"),
    FISHPLCE: "",
    DCMNSBNAME: "",
    DDDD: dcmncCode,
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
    DCMNFILE: [],
  };
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (lienHeCongVu) {
      setHeader(lienHeCongVu !== undefined ? lienHeCongVu : initHeader);
      var fileList = lienHeCongVu.DCMNFILE;
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
  }, [lienHeCongVu]);

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
        dispatch(getDetailLHCV(postResult.RETNDATA[0].KKKK0000));
      }
      alert(postResult.RETNMSSG);
      dispatch(resetLHCV());
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
    setOpenForm(true);
    setEditItem({
      ...item,
      RFRNDATE: item.RFRNDATE !== "" ? new Date(item.RFRNDATE) : new Date(),
    });
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
  const actionAdd = () => {
    navigate("/task-schedule/new");
  };
  const actionDup = () => {
    setHeader({
      ...header,
      STTESIGN: 0,
      STTENAME: "",
      MAINCODE: "",
      MAINDATE: "",
      KKKK0000: "",
    });
  };
  const actionSave = () => {
    var postJson = {
      DCMNCODE: dcmncCode,
      HEADER: [header],
    };

    console.log(postJson);

    if (header.KKKK0000) {
      // update
      dispatch(updateLHCV(postJson));
    } else {
      // Post
      dispatch(postLHCV(postJson));
    }
  };

  const actionLock = () => {
    const body = {
      DCMNCODE: dcmncCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(lockLHCV(body));
  };

  const actionDelete = () => {
    const body = {
      DCMNCODE: dcmncCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(deleteLHCV(body));
  };

  const doPostFile = (keycode) => {
    var myHeaders = new Headers();
    myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
    var formdata = new FormData();
    formdata.append("DCMNCODE", dcmncCode);
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
      .then((result) => {})
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
  document.body.addEventListener("click", (e) => {});
  const getDefaultMultiSelect = (list) => {
    if (header !== undefined) {
      var arr = list.filter((item) => header.EMPLRECV.includes(item.EMPLCODE));
      console.log(arr);
      return arr;
    } else {
      return [];
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
                    {"Phiếu liên hệ công vụ"} {"#"}
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

                          {/* Lãnh vực liên quan */}
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={"Lãnh vực liên quan"}
                              id={"DCMNSBCD"}
                              data={lstmngSubDcmnLHCV}
                              defaultValue={
                                header !== undefined
                                  ? lstmngSubDcmnLHCV.find(
                                      (item) =>
                                        item.ITEMCODE === header.DCMNSBCD
                                    )
                                  : {}
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) => {
                                console.log(e.target.value.ITEMCODE);
                                setHeader({
                                  ...header,
                                  DCMNSBCD: e.target.value.ITEMCODE,
                                });
                              }}
                              disabled={!permissions}
                            />
                          </div>

                          {/* Mục đích liên hệ */}
                          <div className="mb-3">
                            <Label className="text-sm text-gray-500">
                              {"Mục đích liên hệ"}
                            </Label>
                            <TextArea
                              className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
                              rows={2}
                              value={header.MPURPNME}
                              disabled={!permissions}
                              onChange={(e) => {
                                setHeader({
                                  ...header,
                                  MPURPNME: e.target.value,
                                });
                              }}
                            />
                          </div>

                          {/* Nội dung liên hệ */}
                          <div className="mb-3">
                            <Label className="text-sm text-gray-500">
                              {" Nội dung liên hệ"}
                            </Label>
                            <TextArea
                              className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
                              rows={2}
                              value={header.MCONTENT}
                              disabled={!permissions}
                              onChange={(e) => {
                                setHeader({
                                  ...header,
                                  MCONTENT: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-1/3 w-full">
                        <div className="wrapper-item">
                          {/* Danh sách người nhận */}
                          <div className="mb-3">
                            <FieldEditMultiSelect
                              title={"Danh sách người nhận"}
                              id={"EMPLRECV"}
                              data={appEmplList}
                              defaultValue={
                                header !== undefined
                                  ? appEmplList.filter((item) =>
                                      header.EMPLRECV.includes(item.EMPLCODE)
                                    )
                                  : []
                              }
                              textField="EMPLNAME"
                              dataItemKey="EMPLCODE"
                              onComboboxChange={(e) => {
                                var listEmpCode = [];
                                e.value.map((item) =>
                                  listEmpCode.push(item.EMPLCODE)
                                );
                                setHeader({
                                  ...header,
                                  EMPLRECV: listEmpCode.join(),
                                });
                              }}
                              disabled={!permissions}
                            />
                          </div>

                          {/* Danh sách tham khảo */}
                          <div className="mb-3">
                            <FieldEditMultiSelect
                              title={"Danh sách tham khảo"}
                              id={"EMPLREFR"}
                              data={appEmplList}
                              defaultValue={
                                header !== undefined
                                  ? appEmplList.filter((item) =>
                                      header.EMPLREFR.includes(item.EMPLCODE)
                                    )
                                  : []
                              }
                              textField="EMPLNAME"
                              dataItemKey="EMPLCODE"
                              onComboboxChange={(e) => {
                                var listEmpCode = [];
                                e.value.map((item) =>
                                  listEmpCode.push(item.EMPLCODE)
                                );
                                setHeader({
                                  ...header,
                                  EMPLREFR: listEmpCode.join(),
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
    </div>
  );
};

export default ServiceContactEditMain;
