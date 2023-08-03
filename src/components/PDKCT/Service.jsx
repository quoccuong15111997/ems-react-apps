import * as api from "../../api/index";
import moment from "moment";
import { deletePDKCT, lockPDKCT } from "../../actions/pdkct";
export const editDetailsAfterPost = (details) => {
  var newDetails = [];
  details.map((detail) => {
    newDetails.push({
      ...detail,
      FRLVDATE: detail.FRLVDATE.toISOString(),
      TOLVDATE: detail.TOLVDATE.toISOString(),
      TIMEMORN: detail.TIMEMORN ? detail.TIMEMORN.ITEMCODE : "",
      TIMEEVEN: detail.TIMEEVEN ? detail.TIMEEVEN.ITEMCODE : "",
      TIMEAFTR: detail.TIMEAFTR ? detail.TIMEAFTR.ITEMCODE : "",
      WORKTYPE: detail.WORKTYPE.ITEMCODE,
      WORKPLAC: detail.WORKPLAC.ITEMCODE,
    });
  });
  return newDetails;
};

export const refreshSumLeav = (header, setHeader) => {
  var sum = 0.0;
  if (header.DETAIL != null && header.DETAIL.length > 0) {
    header.DETAIL.map((item) => {
      sum += item.SUMLVDT;
    });
  }
  setHeader({ ...header, WORK_DAY: sum });
};

export const deleteService = (dcmncCode, header, dispatch) => {
  const body = {
    DCMNCODE: dcmncCode,
    KEY_CODE: header.KKKK0000,
  };
  dispatch(deletePDKCT(body));
};

export const lockService = (dcmncCode, header, dispatch) => {
  const body = {
    DCMNCODE: dcmncCode,
    KEY_CODE: header.KKKK0000,
  };
  dispatch(lockPDKCT(body));
};

export const postFileService = (dcmncCode, keycode, files) => {
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

export const deleteFileService = (removeFiles, setRemoveFiles) => {
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

export const editService = (item, setEditItem, setOpenForm) => {
  setOpenForm(true);
  setEditItem({
    ...item,
    FRLVDATE: item.FRLVDATE !== "" ? new Date(item.FRLVDATE) : new Date(),
    TOLVDATE: item.TOLVDATE !== "" ? new Date(item.TOLVDATE) : new Date(),
  });
};

export const removeService = (item, header, setHeader) => {
  var newData = header.DETAIL.filter(
    (detail) => detail.BUSNCODE !== item.BUSNCODE
  );
  var sum = 0.0;
  newData.map((item) => {
    sum += item.SUMLVDT;
  });
  setHeader({ ...header, DETAIL: newData, WORK_DAY: sum });
};

export const submitService = async (e, userData, header, setHeader, setOpenForm) => {
    console.log("submitService called");
    console.log("events = " + JSON.stringify(e));
  var body = {
    DCMNCODE: "apiGet_LvTm",
    PARA_001: userData.EMPLCODE,
    PARA_002: e.TIMEMORN != null ? e.TIMEMORN.ITEMCODE : "",
    PARA_003: e.TIMEAFTR != null ? e.TIMEAFTR.ITEMCODE : "",
    PARA_004: e.TIMEEVEN != null ? e.TIMEEVEN.ITEMCODE : "",
    BEG_DATE: e.FRLVDATE.toISOString(),
    END_DATE: e.TOLVDATE.toISOString(),
    LGGECODE: "{{0302}}",
  };
  const { data } = await api.fetchCommonDcmn(body);
  var event = {
    ...e,
    RFRNDATE: moment(e.RFRNDATE).format("YYYY-MM-DD"),
    SUMLVDT: data.RETNDATA[0].NUMBLVTM,
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
  var sum = 0.0;
  newData.map((item) => {
    sum += item.SUMLVDT;
  });
  setHeader({ ...header, DETAIL: newData, WORK_DAY: sum });
  setOpenForm(false);
};
