import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./OrderCustomer.css";

import { Link, NavLink } from "react-router-dom";
import api from "../../api";
import moment from "moment";
import {
  FieldEditCombobox,
  OrderDetailHeader,
  MyCommandCell,
  DropdowCell,
  FileItem,
  OrderDetailItem,
} from "../../components";
import { v4 } from "uuid";

import { FcTodoList, FcGenealogy, FcFullTrash, FcUnlock } from "react-icons/fc";
import { BiSave, BiArrowBack } from "react-icons/bi";
import {
  AiFillFileExcel,
  AiFillFileImage,
  AiFillFileText,
  AiOutlineFilePdf,
  AiOutlineEdit,
} from "react-icons/ai";
import {
  MdAddCircle,
  MdAddCircleOutline,
  MdContentCopy,
  MdLockOutline,
  MdOutlineDelete,
  MdOutlineSave,
  MdOutlineKeyboardBackspace,
} from "react-icons/md";

import { ComboBox, DropDownList } from "@progress/kendo-react-dropdowns";
import { Label } from "@progress/kendo-react-labels";
import { apiUrl, baseUrl } from "../../constants";
import { filterBy } from "@progress/kendo-data-query";
import { DatePicker, DateTimePicker } from "@progress/kendo-react-dateinputs";
import { FieldWrapper } from "@progress/kendo-react-form";
import {
  Input,
  NumericTextBox,
  TextArea,
  Checkbox,
  MaskedTextBox,
} from "@progress/kendo-react-inputs";
import Multiselect from "multiselect-react-dropdown";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { Loader } from "@progress/kendo-react-indicators";
import { errorMessage } from "../../constants";
import { Popup } from "@progress/kendo-react-popup";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
} from "@progress/kendo-react-listview";
import {
  Grid,
  GridColumn,
  GridToolbar,
  GridNoRecords,
} from "@progress/kendo-react-grid";

import { useStateContext } from "../../context/ContextProvider";

import WrapperItem from "../OrderCustomer/WrapperItem";

var LCTN_PARA, DcmnView_DATA, DcmnViewDDH;
if (localStorage.getItem("appSaleVchr")) {
  LCTN_PARA = localStorage.getItem("appSaleVchr").LCTNLIST[0].LCTNCODE;
}
if (localStorage.getItem("DcmnView")) {
  DcmnView_DATA = JSON.parse(localStorage.getItem("DcmnView"));
  DcmnViewDDH = DcmnView_DATA.find(
    (item) => item.DCMNCODE === "DDHKH"
  ).GRP_VIEW;
}

/* Function Global */
const loadDistList = async (PrvnCode) => {
  try {
    api(localStorage.getItem("usertoken")).post(apiUrl.listCommon.value, {
      LISTCODE: "lstDistrict",
      CONDFLTR: `PrvnCode='${PrvnCode}'`,
    });
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

const OrderCustomer2 = forwardRef((props, ref) => {
  const [tabSelected, setTabSelected] = useState(0);
  const handleTabSelect = (e) => {
    setTabSelected(e.selected);
  };

  useImperativeHandle(ref, () => ({
    getAlert() {
      if (header != null && header !== undefined) {
        setHeader({
          ...header,
          ODERCODE: "",
          KKKK0000: "",
          STTESIGN: 0,
          STTENAME: "",
          ODERDATE: moment(currentDate).format("YYYY-MM-DD"),
        });
        setPermissions(true);
        setkeyCode(null);
        if (orderDetails != null && orderDetails !== undefined) {
          var newList = [];
          for (var i = 0; i < orderDetails.length; i++) {
            var item = orderDetails[i];
            item.inEdit = true;
            newList.push(item);
            delete item.KKKK0001;
          }
          setOrderDetails(newList);
        }
      }
    },
    functionClick(mainFunction) {
      handleMainFunction(mainFunction);
    },
  }));

  const { setDisableLocation, getLabelValue, appColors } = useStateContext();
  const [permissions, setPermissions] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customersFilter, setCustomersFilter] = useState([]);
  const [customer, setCustomer] = useState({});
  const [keyCode, setkeyCode] = useState(props.keycode);
  const initListCode = {
    ITEMCODE: "%",
    ITEMNAME: "%",
  };
  const [mainFucntions, setMainFucntions] = useState(
    props.keycode
      ? [
          {
            text: getLabelValue(78, "Lưu"),
            id: "save",
            icon: <MdOutlineSave className="text-primary" />,
          },
          {
            text: getLabelValue(79, "Trình ký"),
            id: "lock",
            icon: <MdLockOutline className="text-primary" />,
          },
          {
            text: getLabelValue(80, "Xóa"),
            id: "delete",
            icon: <MdOutlineDelete className="text-red-600" />,
            customClass: "text-red-600",
          },
        ]
      : [
          {
            text: getLabelValue(78, "Lưu"),
            id: "save",
            icon: <MdOutlineSave className="text-primary" />,
          },
          {
            text: getLabelValue(79, "Trình ký"),
            id: "lock",
            icon: <MdLockOutline className="text-primary" />,
          },
        ]
  );
  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState(initListCode);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentCycles, setPaymentCycles] = useState([]);
  const [paymentCyclesSelected, setpaymentCyclesSelected] = useState({});
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [deliveryMethodsSelected, setDeliveryMethodsSelected] = useState({});
  const [deliveryTypes, setDeliveryTypes] = useState([]);
  const [deliveryTypesSelected, setdeliveryTypesSelected] = useState({});
  const [deliveryTimes, setDeliveryTimes] = useState([]);
  const [deliveryTimesSelected, setDeliveryTimesSelected] = useState({});
  const [detailPaymentVisible, setDetailPaymentVisible] = useState(false);
  const [detailDeliveryVisible, setDetailDeliveryVisible] = useState(false);
  const [detailNoteVisible, setDetailNoteVisible] = useState(false);
  const [shortValuePayment, setShortValuePayment] = useState(
    "Chưa thiết lặp thông tin thanh toán"
  );
  const [quoms, setQuoms] = useState([]);
  const [shortValueNote, setShortValueNote] = useState("Chưa có ghi chú");
  const [files, setFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  const [notifyDialog, setNotifyDialog] = useState({
    visible: false,
    title: getLabelValue(83, "Thông báo"),
    message: "",
    button: getLabelValue(84, "Đóng"),
  });
  const [orderDetails, setOrderDetails] = useState([]);
  const EDIT_FIELD = "inEdit";
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sumMoney, setsumMoney] = useState(0);
  const currentDate = new Date();

  const initOrderHeader = {
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

  useEffect(() => {
    setDisableLocation(true);
    props.updateMainFunction(mainFucntions);
  }, []);

  useEffect(() => {
    props.updatePermissions(permissions);
  }, [permissions]);

  const [header, setHeader] = useState(initOrderHeader);
  useEffect(() => {
    // console.log("keycode is changed = " + keyCode);
    if (keyCode !== undefined && keyCode !== null && keyCode !== "") {
      loadQuoms();
    } else if (keyCode !== undefined && keyCode !== null && keyCode === "") {
      setHeader(initOrderHeader);
      setOrderDetails([]);
      setPermissions(true);
      setCustomer({});
      setFiles([]);
    } else {
      // console.log("update mainfunction");
      props.updateMainFunction([
        {
          text: getLabelValue(78, "Lưu"),
          id: "save",
          icon: <MdOutlineSave className="text-primary" />,
        },
        {
          text: getLabelValue(79, "Trình ký"),
          id: "lock",
          icon: <MdLockOutline className="text-primary" />,
        },
      ]);
    }
  }, [keyCode]);

  useEffect(() => {
    setkeyCode(props.keycode);
  }, [props.item]);

  const loadDefaultOrder = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.defaultDocument.value, {
        DCMNCODE: "DDHKH",
      })
      .then((res) => {
        setOrderDetails([]);
        var data = res.data;
        setHeader(data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadQuoms = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lstQUOM",
      })
      .then((res) => {
        setQuoms(res.data.RETNDATA);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadDetail = () => {
    const body = {
      DCMNCODE: "DDHKH",
      KEY_CODE: keyCode,
    };
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.detailDocument.value, body)
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        var data = res.data;
        setHeader(data.RETNDATA[0]);
        var right = !(data.RETNDATA[0].STTESIGN >= 1);
        setPermissions(right);

        updateMainFunction(right);
        updateStaticFunction(right);
        updateOrder(data.RETNDATA[0].KKKK0000, data.RETNDATA[0].ODERCODE);

        var details = data.RETNDATA[0].DETAIL;
        details.map((item) => {
          item.inEdit = right;
          if (quoms.length > 0) {
            item.QUOMNAME = quoms.find(
              (q) => q.ITEMCODE === item.QUOMCODE + ""
            ).ITEMNAME;
          } else {
            item.QUOMNAME = item.QUOMCODE;
          }
        });
        setOrderDetails(details);
        var fileList = data.RETNDATA[0].DCMNFILE;
        if (fileList.length > 0) {
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
      })
      .catch((err) => console.log(err));
  };
  const updateOrder = (key, orderCode) => {
    props.updateOrder({
      keycode: key,
      maincode: orderCode,
    });
  };
  const updateStaticFunction = (right) => {
    props.updateStaticFunctions(
      right
        ? {
            showProduce: true,
            showProgress: false,
            showAdd: true,
            showDuplicate: true,
          }
        : {
            showProduce: true,
            showProgress: true,
            showAdd: true,
            showDuplicate: true,
          }
    );
  };
  const updateMainFunction = (right) => {
    props.updateMainFunction(
      right
        ? [
            {
              text: getLabelValue(78, "Lưu"),
              id: "save",
              icon: <MdOutlineSave className="text-primary" />,
            },
            {
              text: getLabelValue(79, "Trình ký"),
              id: "lock",
              icon: <MdLockOutline className="text-primary" />,
            },
            {
              text: getLabelValue(80, "Xóa"),
              id: "delete",
              icon: <MdOutlineDelete className="text-red-600" />,
              customClass: "text-red-600",
            },
          ]
        : []
    );
  };
  useEffect(() => {
    if (quoms.length > 0) {
      loadDetail();
    }
  }, [quoms]);

  useEffect(() => {
    loadCustomers();
    loadPaymentMethods();
    loadPaymentCycles();
    loadDeliveryMethods();
    loadDeliveryType();
    loadDeliveryTimes();
    loadDataProduct();
    loadCuomCode();
    loadListPrvn();
    loadPymnPerd();
    loadDlvrAddr();
  }, []);

  const loadDataProduct = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listProduct.value, {
        DCMNCODE: "appPrdcList",
        LCTNCODE: JSON.parse(localStorage.getItem("userData")).LCTNCODE,
        PARACODE: "001",
        LGGECODE: "v",
        SCTNCODE: 1,
        JSTFDATE: "1990-01-01",
        KEY_WORD: "%",
        SHOPCODE: "%",
        CUSTCODE: customer.CUSTCODE,
      })
      .then((res) => {
        // console.log(res.data);
        var data = res.data.RETNDATA;
        data.map((item) => {
          item.PRCESALE = 100000;
          item.inEdit = true;
        });
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadDeliveryTimes = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lstListHour",
      })
      .then((res) => {
        setDeliveryTimes(res.data.RETNDATA);
        setDeliveryTimesSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadDeliveryType = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lstDlvrType",
      })
      .then((res) => {
        setDeliveryTypes(res.data.RETNDATA);
        setdeliveryTypesSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadDeliveryMethods = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lstDlvrMthd",
      })
      .then((res) => {
        setDeliveryMethods(res.data.RETNDATA);
        setDeliveryMethodsSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadPaymentMethods = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lst_inpCustOdMt_Pay_Mthd_2",
      })
      .then((res) => {
        setPaymentMethods(res.data.RETNDATA);
        setPaymentMethodSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadPaymentCycles = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lstTimeType",
      })
      .then((res) => {
        setPaymentCycles(res.data.RETNDATA);
        setpaymentCyclesSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadCustomers = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCustomer.value, {
        DCMNCODE: "appCustList",
        EMPLCODE: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
        PARACODE: "001",
        KEY_WORD: "%",
      })
      .then((res) => {
        var data = res.data;
        var returnCode = data.RETNCODE;
        var returnData = data.RETNDATA;
        if (returnCode) {
          returnData.map((item) => {
            item.Display = item.CUSTNAME + " (#" + item.CUSTCODE + ")";
          });
          setCustomers(returnData);
          setCustomersFilter(returnData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [chooseVAT, setChooseVAT] = useState(false);
  const [chooseVAT, setChooseVAT] = useState(
    header.VAT_OUPT === 1 ? true : false
  );
  const toggleChooseVAT = () => {
    setChooseVAT(!chooseVAT);
  };

  const [CuomCode, setCuomCode] = useState([]);
  const [CuomCodeSelected, setCuomCodeSelected] = useState({});
  const loadCuomCode = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lstCUOM",
      })
      .then((res) => {
        setCuomCode(res.data.RETNDATA);
        setCuomCodeSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [listPrvn, setListPrvn] = useState([]);
  const [PrvnSelected, setPrvnSelected] = useState({});
  const loadListPrvn = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lstProvince",
      })
      .then((res) => {
        setListPrvn(res.data.RETNDATA);
        setPrvnSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [listDist, setListDist] = useState([]);
  const [DistSelected, setDistSelected] = useState({});
  const [listWard, setListWard] = useState([]);
  const [WardSelected, setWardSelected] = useState({});
  const [dlvrNumb, setDlvrNumb] = useState("");

  const PrvnChgeHandler = (event) => {
    setDistSelected(null);
    setWardSelected(null);

    if (event !== null && event.value !== null) {
      setHeader({
        ...header,
        DLVRPRVN: event.value.ITEMCODE,
      });

      // // Lay danh sach Quan - Huyen
      // const loadListDist = () => {
      //   api(localStorage.getItem("usertoken"))
      //     .post(apiUrl.listCommon.value, {
      //       LISTCODE: "lstDistrict",
      //       CONDFLTR: `PrvnCode='${event.value.ITEMCODE}'`,
      //     })
      //     .then((res) => {
      //       // setDistSelected(res.data.RETNDATA[0]);

      //       const sortDist = res.data.RETNDATA.sort((a, b) =>
      //         a.ITEMNAME > b.ITEMNAME ? 1 : b.ITEMNAME > a.ITEMNAME ? -1 : 0
      //       );
      //       setListDist(sortDist);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // };
      loadDistList(header.DLVRPRVN);

      loadListDist();
    } else {
      setHeader({ ...header, DLVRPRVN: "", DLVRDIST: "", DLVRWARD: "" });
    }
  };

  const DistChgeHandler = (event) => {
    setDistSelected(event.value);
    setWardSelected(null);

    if (event !== null && event.value !== null) {
      setHeader({
        ...header,
        DLVRDIST: event.value.ITEMCODE,
        DLVRWARD: "",
      });

      // Lay danh sach Phuong - Xa
      const loadListWard = () => {
        api(localStorage.getItem("usertoken"))
          .post(apiUrl.listCommon.value, {
            LISTCODE: "lstWard",
            CONDFLTR: `DistCode='${event.value.ITEMCODE}'`,
          })
          .then((res) => {
            // setWardSelected(res.data.RETNDATA[0]);

            const sortDist = res.data.RETNDATA.sort((a, b) =>
              a.ITEMNAME > b.ITEMNAME ? 1 : b.ITEMNAME > a.ITEMNAME ? -1 : 0
            );
            setListWard(sortDist);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      loadListWard();
    } else {
      setHeader({ ...header, DLVRDIST: "", DLVRWARD: "" });
    }
  };

  const WardChgeHandler = (event, id) => {
    setWardSelected(event.value);

    if (event !== null && event.value !== null) {
      setHeader({ ...header, DLVRWARD: event.value.ITEMCODE });
    } else {
      setHeader({ ...header, DLVRWARD: "" });
    }
  };

  useEffect(() => {
    var DlvrPlce = "";
    if (header.DLVRNUMB !== "") {
      DlvrPlce = DlvrPlce + header.DLVRNUMB;
    }

    if (header.DLVRWARD !== "") {
      DlvrPlce = DlvrPlce + ", " + WardSelected.ITEMNAME;
    }

    if (header.DLVRDIST !== "") {
      DlvrPlce = DlvrPlce + ", " + DistSelected.ITEMNAME;
    }

    if (header.DLVRPRVN !== "") {
      DlvrPlce = DlvrPlce + ", " + PrvnSelected.ITEMNAME;
    }

    setHeader({
      ...header,
      DLVRPLCE: DlvrPlce,
    });
  }, [header.DLVRPRVN, header.DLVRDIST, header.DLVRWARD, header.DLVRNUMB]);

  const [PymnPerd, setPymnPerd] = useState([]);
  const [PymnPerdSelected, setPymnPerdSelected] = useState({});
  const loadPymnPerd = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lstTimeType",
        CONDFLTR: "DataCode in('D','M','Q','Y')",
      })
      .then((res) => {
        setPymnPerd(res.data.RETNDATA);
        setPymnPerdSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [dlvrAddr, setDlvrAddr] = useState([]);
  const [dlvrAddrSelected, setDlvrAddrSelected] = useState({});
  const loadDlvrAddr = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.listCommon.value, {
        LISTCODE: "lst_inpDlvrAddr",
        CONDFLTR: "",
      })
      .then((res) => {
        setDlvrAddr(res.data.RETNDATA);
        setDlvrAddrSelected(res.data.RETNDATA[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [car_Addr, setCar_Addr] = useState([]);
  const [Car_AddrSelected, setCar_AddrSelected] = useState({});
  const [chooseCar, setChooseCar] = useState(true);

  const DlverAddrChgeHandler = (e) => {
    if (e.value.ITEMCODE !== "003") {
      setCar_Addr([]);
      setCar_AddrSelected(null);
    } else if (e.value.ITEMCODE === "003") {
      setChooseCar(false);

      const loadCar_Addr = () => {
        api(localStorage.getItem("usertoken"))
          .post(apiUrl.listCommon.value, {
            LISTCODE: "lst_TsprSplr",
            CONDFLTR: "",
          })
          .then((res) => {
            setCar_Addr(res.data.RETNDATA);
            s;
            setCar_AddrSelected(res.data.RETNDATA[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      loadCar_Addr();
    }
  };

  const filterData = (filter) => {
    const data = customers.slice();
    return filterBy(data, filter);
  };
  const customerFilterChange = (event) => {
    // console.log(event.filter);
    if (event.filter.value == "") {
      setCustomersFilter(customers);
    }
    setCustomersFilter(filterData(event.filter));
  };
  const itemChange = (event) => {
    let field = event.field || "";
    event.dataItem[field] = event.value;
    let newData = orderDetails.map((item) => {
      if (item.PRDCCODE === event.dataItem.PRDCCODE) {
        item[field] = event.value;
        if (field == "PRDCQTTY" || field == "SALEPRCE" || field == "DISCRATE") {
          item["DCPRAMNT"] =
            (item["PRDCQTTY"] * item["SALEPRCE"] * item["DISCRATE"]) / 100;
          item["MNEYAMNT"] =
            item["PRDCQTTY"] * item["SALEPRCE"] - item["DCPRAMNT"];
        }

        // console.log(
        //   "id = " +
        //     event.dataItem.PRDCCODE +
        //     " change = " +
        //     field +
        //     " value = " +
        //     event.value
        // );
      }

      return item;
    });
    setOrderDetails(newData);
  };
  const remove = (dataItem) => {
    const newData = orderDetails.filter(
      (item) => item.PRDCCODE !== dataItem.PRDCCODE
    );
    // console.log("Length new data = " + newData.length);
    setOrderDetails(newData);
  };
  const editField = "inEdit";
  const CommandCell = (props) => (
    <MyCommandCell {...props} editField={editField} remove={remove} />
  );
  const [visibleDialog, setVisibleDialog] = useState(false);
  const onDialogToggle = () => {
    setVisibleDialog(!visibleDialog);
  };
  const onSelect = (selectedList, selectedItem) => {
    setSelectedProducts(selectedList);
  };
  const onDoneSelectProduct = () => {
    onDialogToggle();
    if (selectedProducts.length == 0) return;
    for (let i = 0; i < selectedProducts.length; i++) {
      var item = selectedProducts[i];
      if (checkProductExits(item)) {
        continue;
      }
      const cloneItem = Object.assign({}, item);
      cloneItem.PRDCQTTY = 1;
      cloneItem.SALEPRCE = cloneItem.PRCESALE;
      cloneItem.DISCRATE = 0;
      cloneItem.DCPRAMNT = 0;
      cloneItem.inEdit = true;
      cloneItem.MNEYAMNT = cloneItem.PRDCQTTY * cloneItem.SALEPRCE;
      setOrderDetails((prevState) => [...prevState, cloneItem]);
    }
  };
  const checkProductExits = (item) => {
    var prd = orderDetails.find((element) => element.PRDCCODE == item.PRDCCODE);
    return prd != null;
  };
  useEffect(() => {
    if (paymentMethodSelected && paymentMethodSelected.ITEMNAME) {
      setShortValuePayment(paymentMethodSelected.ITEMNAME);
    }
  }, [paymentMethodSelected]);

  // CAP NHAT TIEN
  useEffect(() => {
    var sumProductQuantity = 0;
    var sumProductMoney = 0;
    orderDetails.map((item) => {
      sumProductQuantity += item.PRDCQTTY;
      sumProductMoney += item.MNEYAMNT;
    });

    setHeader({
      ...header,
      SUM_CRFR: sumProductMoney,
      SMPRQTTY: sumProductQuantity,
    });
    setsumMoney(sumProductMoney);
  }, [orderDetails]);

  useEffect(() => {
    var DlvrCram = header.DLVRCRAM === undefined ? 0 : header.DLVRCRAM;
    var DlvrRate = header.DLVRRATE === undefined ? 0 : header.DLVRRATE;

    var RdtnCram = (sumMoney * header.RDTNRATE) / 100; // Tien chiet khau

    var vatCramValue = ((sumMoney - RdtnCram) * header.VAT_RATE) / 100; // Tien thue = ((Tien thue Tien hang - Tien chiet khau)*thue suat)/100
    var varAmntValue =
      (((sumMoney - RdtnCram) * header.VAT_RATE) / 100) * header.CUOMRATE; // Tien thue VND = (((Tien thue Tien hang - Tien chiet khau)*thue suat)/100)*Ty gia

    var DlvrTaxCram = 0; // Tien thue VC
    var DlvrTaxAmnt = 0; // Tien thue VC vnd

    if (DlvrCram !== 0 && DlvrRate !== 0) {
      DlvrTaxCram = (DlvrCram * DlvrRate) / 100;
      DlvrTaxAmnt = ((DlvrCram * DlvrRate) / 100) * header.CUOMRATE;
    } else if (DlvrRate === 0 || DlvrCram === 0) {
      DlvrTaxCram = 0;
    }

    var DlvrAmnt = (DlvrCram === undefined ? 0 : DlvrCram) * header.CUOMRATE; // Tien VC vnd

    var vatCram = vatCramValue + DlvrTaxCram; // Tien thue
    var varAmnt = varAmntValue + DlvrTaxAmnt; // Tien thue vnd

    setHeader({
      ...header,
      RDTNCRAM: RdtnCram,
      VAT_CRAM: vatCram,
      VAT_AMNT: varAmnt,
      DLVRAMNT: DlvrAmnt,
      SUM_CRAM: sumMoney - RdtnCram + vatCramValue,
    });
  }, [
    sumMoney,
    header.RDTNRATE,
    header.VAT_RATE,
    header.DLVRRATE,
    header.DLVRCRAM,
  ]);

  useEffect(() => {
    var sum_amfrnew = header.SUM_CRFR * header.CUOMRATE;
    var vat_amntnew = (header.VAT_CRAM * header.CUOMRATE) / 100;
    var rdtnamntnew = header.RDTNCRAM * header.CUOMRATE;
    var sum_amntnew = header.SUM_CRAM * header.CUOMRATE;
    var dlvrAmntNew =
      (header.DLVRCRAM === undefined ? 0 : header.DLVRCRAM) * header.CUOMRATE;

    setHeader({
      ...header,
      SUM_AMFR: sum_amfrnew,
      VAT_AMNT: vat_amntnew,
      RDTNAMNT: rdtnamntnew,
      SUM_AMNT: sum_amntnew,
      DLVRAMNT: dlvrAmntNew,
    });
  }, [header.CUOMRATE]);

  console.log(header);

  const handleMainFunction = (mainFunction) => {
    if (mainFunction.id === "delete") {
      doDeleteOrder();
    } else {
      if (header.CUSTCODE === undefined) {
        handelError(errorMessage.oders.customerUndefined);
        return;
      }

      // if (
      //   header.RCVREMPL === "" ||
      //   header.RCVR_TEL === "" ||
      //   header.DLVRADDR === "" ||
      //   header.DLVRPLCE === ""
      // ) {
      //   handelError(errorMessage.oders.rcvUndefined);
      //   setDetailDeliveryVisible(true);
      //   return;
      // }

      if (orderDetails.length === 0) {
        handelError(errorMessage.oders.detailsUndefined);
        return;
      }

      var mainDate = moment(header.ODERDATE).format("YYYY-MM-DD");
      setHeader({
        ...header,
        DLVRTYPE: deliveryTypesSelected.ITEMCODE,
        DLVRMTHD: parseInt(deliveryMethodsSelected.ITEMCODE),
        PAY_MTHD:
          paymentMethodSelected === undefined
            ? 0
            : parseInt(paymentMethodSelected.ITEMCODE),
        VAT_AMNT: header.VAT_CRAM,
        SUM_AMNT: header.SUM_CRAM,
        RDTNAMNT: header.RDTNCRAM,
        ODERDATE: mainDate,
      });

      setHeader({ ...header, ODERDATE: mainDate });

      var postDetails = [];
      orderDetails.map((item) => {
        var detail = {
          PRDCCODE: item.PRDCCODE,
          QUOMCODE: item.QUOMCODE,
          QUOMQTTY: item.PRDCQTTY,
          PRDCQTTY: item.PRDCQTTY,
          CUOMCODE: "VND",
          CUOMRATE: 1,
          CRSLPRCE: item.SALEPRCE,
          SALEPRCE: item.SALEPRCE,
          DCPRCRAM: item.DCPRAMNT,
          DCPRAMNT: item.DCPRAMNT,
          DISCRATE: item.DISCRATE,
          OVPRCRAM: 0,
          OVPRAMNT: 0,
          OVERDISC: 0,
          OVERCRAM: 0,
          OVERAMNT: 0,
          PRCECRAM: item.PRDCQTTY * item.SALEPRCE - item.DCPRAMNT,
          PRCEAMNT: item.PRDCQTTY * item.SALEPRCE - item.DCPRAMNT,
          MNEYCRAM: item.PRDCQTTY * item.SALEPRCE - item.DCPRAMNT,
          MNEYAMNT: item.PRDCQTTY * item.SALEPRCE - item.DCPRAMNT,
          SORTCODE: 1,
          ORGNCODE: 1,
          NOTETEXT_DT: "",
        };
        postDetails.push(detail);
      });

      if (props.keycode === undefined || props.keycode === "") {
        header.KEY_CODE = props.keycode;
      }

      header.DETAIL = postDetails;
      var postHeaders = [];
      postHeaders.push(header);
      var postOrder = {
        DCMNCODE: "DDHKH",
        HEADER: postHeaders,
      };
      // console.log(JSON.stringify(postOrder));
      if (mainFunction.id === "save") {
        if (
          keyCode === null ||
          props.keycode === undefined ||
          props.keycode === ""
        ) {
          doPostOrder(postOrder, 0, false);
        } else {
          doPostOrder(postOrder, 1, false);
        }
      } else if (mainFunction.id === "lock") {
        if (props.keycode === undefined || props.keycode === "") {
          doPostOrder(postOrder, 0, true);
        } else {
          doPostOrder(postOrder, 1, true);
        }
      }
    }
  };
  const doDeleteOrder = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.deleteDocument.value, {
        DCMNCODE: "DDHKH",
        KEY_CODE: props.keycode,
      })
      .then((res) => {
        var data = res.data;
        if (data.RETNCODE) {
          handelSuccessClose(data.RETNMSSG);
        } else {
          handelError(data.RETNMSSG);
        }
      })
      .catch((err) => console.log(err));
  };
  const doPostOrder = (body, type, lock) => {
    var postUrl = keyCode
      ? apiUrl.updateDocument.value
      : apiUrl.postDocument.value;
    api(localStorage.getItem("usertoken"))
      .post(postUrl, body)
      .then((res) => {
        var data = res.data;
        if (data.RETNCODE) {
          setkeyCode(data.RETNDATA[0].KKKK0000);
          deleteFiles();
          if (files.length > 0) {
            doPostFile(data.RETNDATA[0].KKKK0000, lock, data.RETNMSSG);
          } else {
            if (lock) {
              doPostLock(data.RETNDATA[0].KKKK0000);
            } else {
              setkeyCode(data.RETNDATA[0].KKKK0000);
              handelSuccess(data.RETNMSSG);
            }
          }
        } else {
          handelError(data.RETNMSSG);
        }
      })
      .catch((err) => console.log(err));
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
  const doPostFile = (keycode, lock, message) => {
    var myHeaders = new Headers();
    myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
    var formdata = new FormData();
    formdata.append("DCMNCODE", "DDHKH");
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
    // console.log(JSON.stringify(formdata));
    fetch(baseUrl + apiUrl.postFile.value, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        if (lock) {
          doPostLock(keycode);
        } else {
          handelSuccess(message);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const doPostLock = (keycode) => {
    const body = {
      DCMNCODE: "DDHKH",
      KEY_CODE: keycode,
    };
    // console.log(JSON.stringify(body));
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.lockDocument.value, body)
      .then((res) => {
        setkeyCode(res.data.RETNDATA[0].KKKK0000);
        loadQuoms();
        // console.log(res);
        handelSuccess(res.data.RETNMSSG);
      })
      .catch((error) => console.log(error));
  };
  const handelError = (message) => {
    setNotifyDialog({ ...notifyDialog, message: message, visible: true });
  };
  const handelSuccess = (message) => {
    setNotifyDialog({ ...notifyDialog, message: message, visible: true });
    //props.onSuccess();
  };
  const handelSuccessClose = (message) => {
    setNotifyDialog({ ...notifyDialog, message: message, visible: true });
    props.onSuccess();
  };
  useEffect(() => {
    if (customer) {
      setHeader({
        ...header,
        MCUSTNME: customer.CUSTNAME,
        CUSTCODE: customer.CUSTCODE,
        CUST_TEL: customer.CUST_TEL || "",
        CUSTADDR: customer.CUSTADDR,
      });
    }
  }, [customer]);
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
  const QuantityCell = (props) => {
    const field = props.field || "";
    const total = orderDetails.reduce(
      (acc, current) => acc + current[field],
      0
    );
    return (
      <td colSpan={props.colSpan} style={props.style}>
        <p className="text-right text-primary mr-9">{total}</p>
      </td>
    );
  };
  const SumMoneyCell = (props) => {
    const field = props.field || "";
    const total = orderDetails.reduce(
      (acc, current) => acc + current[field],
      0
    );
    return (
      <td colSpan={props.colSpan} style={props.style}>
        <p className="text-right text-primary">
          {new Intl.NumberFormat().format(total).replaceAll(".", ",")}
        </p>
      </td>
    );
  };
  const SumDcprAmntCell = (props) => {
    const field = props.field || "";
    const total = orderDetails.reduce(
      (acc, current) => acc + current[field],
      0
    );
    var valueFormatted = new Intl.NumberFormat().format(total);
    return (
      <td colSpan={props.colSpan} style={props.style}>
        <p className="text-right text-primary">
          {valueFormatted.toString().replaceAll(".", ",")}
        </p>
      </td>
    );
  };
  const SumTitleCell = (props) => {
    return (
      <td colSpan={props.colSpan} style={props.style}>
        {getLabelValue(72, "Tổng:")}
      </td>
    );
  };
  const CustomTitleBar = () => {
    return (
      <div
        className="custom-title"
        style={{
          fontSize: "18px",
          lineHeight: "1.3em",
        }}
      >
        {notifyDialog.title}
      </div>
    );
  };
  var anchorProcedure = useRef(null);
  var anchorProgress = useRef(null);
  const [reviewProgress, setReviewProgress] = useState([]);
  const [showPopupProcedure, setShowPopupProcedure] = useState(false);
  const [showPopupProgress, setShowPopupProgress] = useState(false);
  const [popupType, setPopupType] = useState(0);
  const [popupTitle, setPopupTitle] = useState(
    getLabelValue(86, "Quá trình phê duyệt")
  );
  const viewProcedure = () => {
    anchorProcedure = anchor;
    if (showPopupProcedure) {
      setShowPopupProcedure(false);
    }
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.progessStep.value, {
        DCMNCODE: "DDHKH",
        KEY_CODE: keyCode,
      })
      .then((res) => {
        var data = res.data;
        if (data.RETNCODE) {
          setPopupType(1);
          setPopupTitle(getLabelValue(85, "Quy trình phê duyệt"));
          setShowPopupProcedure(true);
          setReviewProgress(data.RETNDATA != undefined ? data.RETNDATA : []);
        } else {
          alert(JSON.stringify(res.data));
        }
      })
      .catch((err) => console.log(err));
  };
  const viewProgress = () => {
    if (showPopupProgress) {
      setShowPopupProgress(false);
    }
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.reviewStep.value, {
        DCMNCODE: "dmsAprvVchr",
        PARA_001: "DDHKH",
        PARA_002: keyCode,
        PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
      })
      .then((res) => {
        var data = res.data;
        if (data.RETNCODE) {
          setPopupType(0);
          setPopupTitle(getLabelValue(86, "Quá trình phê duyệt"));
          setShowPopupProgress(true);
          setReviewProgress(
            data.RETNDATA[0] != undefined ? data.RETNDATA[0].DETAIL : []
          );
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // console.log(JSON.stringify(removeFiles));
  }, [removeFiles]);

  document.body.addEventListener("click", (e) => {
    setShowPopupProcedure(false);
    setShowPopupProgress(false);
  });

  const MyListHeader = () => {
    return (
      <ListViewHeader
        style={{
          color: "rgb(160, 160, 160)",
          fontSize: 14,
        }}
        className="pl-3 pb-2 pt-2 text-blue-600"
      >
        Danh sách sản phẩm
      </ListViewHeader>
    );
  };
  const MyListFooter = () => {
    return (
      <ListViewFooter
        style={{
          color: "rgb(160, 160, 160)",
          fontSize: 14,
        }}
        className="pl-3 pb-2 pt-2"
      >
        Tổng số lượng:
        <span className="text-blue-600 font-semibold ml-1">
          {header != null && header.SMPRQTTY != null ? header.SMPRQTTY : "0"}
        </span>
      </ListViewFooter>
    );
  };
  const CustomOrderDetailItem = (props) => (
    <OrderDetailItem {...props} onDeleteClick={remove} isEdit={permissions} />
  );

  return (
    <div className="pb-10">
      {/* Nut Loading */}
      {/* <div className="flex items-center justify-center w-full h-full lg:hidden">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <Loader className="p-5" type="converging-spinner" />
        </div>
      </div> */}

      {/* Popup Them san pham */}
      {visibleDialog && (
        <Dialog
          title={getLabelValue(74, "Thêm sản phẩm")}
          onClose={onDialogToggle}
        >
          <div className="w-[400px] h-[300px]">
            <Multiselect
              className="h-full"
              options={products}
              displayValue="PRDCNAME"
              showCheckbox
              placeholder={getLabelValue(75, "Chọn sản phẩm")}
              emptyRecordMsg={getLabelValue(71, "Không có dữ liệu")}
              showArrow
              hideSelectedList
              onSelect={onSelect}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-primary text-sm text-white rounded-md pr-3 pl-3 pt-1 pb-1"
              onClick={onDoneSelectProduct}
            >
              Thêm
            </button>
            <button
              className="bg-red-500 text-sm text-white rounded-md pr-3 pl-3 pt-1 pb-1 ml-3"
              onClick={onDialogToggle}
            >
              Hủy
            </button>
          </div>
        </Dialog>
      )}

      {/* Popup Thong bao */}
      {notifyDialog.visible && (
        <Dialog title={<CustomTitleBar />} onClose={onDialogToggle}>
          <div className="w-[300px] h-[50px] text-center">
            {notifyDialog.message}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-sm text-white rounded-md pr-3 pl-3 pt-1 pb-1 ml-3"
              onClick={() => {
                setNotifyDialog({ ...notifyDialog, visible: false });
              }}
            >
              {notifyDialog.button}
            </button>
          </div>
        </Dialog>
      )}

      {/* Thông tin Header DDH */}
      {/* <h3 className="text-xl pl-5 pt-3">{props.title}</h3> */}
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
                  {getLabelValue(24, "Đơn đặt hàng")} {"#"}
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
            {/* theo LE MINH LOC */} 
            <TabStrip
              selected={tabSelected}
              onSelect={handleTabSelect}
              className="Tab-flex"
            >
              <TabStripTab title={getLabelValue(105, "Thông tin Đơn hàng")}>
                <div className="order-customer">
                  <div className="wrapper lg:flex lg:justify-between flex-none gap-4">
                    <div className="lg:w-1/3 w-full">
                      <div className="wrapper-item">
                        {/* Ma don hang */}
                        <WrapperItem>
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(19, "Mã đơn hàng")}
                          </Label>
                          <Input
                            id="ODERCODE"
                            name="ODERCODE"
                            style={{ borderColor: "grey" }}
                            value={header?.ODERCODE}
                            type="text"
                            disabled={true}
                            className={appColors.inputColor}
                          />
                        </WrapperItem>

                        {/* Ngay tao */}
                        <WrapperItem>
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(27, "Ngày tạo")}
                          </Label>
                          <DatePicker
                            format="dd/MM/yyyy"
                            weekNumber={true}
                            defaultValue={currentDate}
                            disabled={!permissions}
                            className={appColors.inputColor}
                          />
                        </WrapperItem>

                        {/* Khach hang */}
                        <div className="mb-3">
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(28, "Khách hàng")}
                          </Label>
                          <ComboBox
                            style={{}}
                            data={customersFilter}
                            value={
                              customersFilter.find(
                                (item) => item.CUSTCODE === header.CUSTCODE
                              ) || {}
                            }
                            onChange={(e) => setCustomer(e.value)}
                            textField="Display"
                            dataItemKey="CUSTCODE"
                            filterable={true}
                            onFilterChange={customerFilterChange}
                            disabled={!permissions}
                            clearButton={false}
                            className={appColors.inputColor}
                          />
                        </div>

                        {/* Ma KH + MST */}
                        <FieldWrapper className="w-full mb-3">
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(29, "Mã khách hàng")}
                          </Label>
                          <div className={"k-form-field-wrap"}>
                            <Input
                              id="CUSTCODE"
                              name="CUSTCODE"
                              style={{ borderColor: "grey" }}
                              value={header.CUSTCODE}
                              onChange={(e) => {
                                setHeader({
                                  ...header,
                                  CUSTCODE: e.target.value,
                                });
                              }}
                              type="text"
                              disabled
                              className={appColors.inputColor}
                            />
                          </div>
                        </FieldWrapper>

                        {/* Dien thoai */}
                        <WrapperItem>
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(89, "Điện thoại")}
                          </Label>
                          {/* <div className={"k-form-field-wrap"}> */}
                          <Input
                            id="CUST_TEL"
                            name="CUST_TEL"
                            style={{ borderColor: "grey" }}
                            value={header.CUST_TEL}
                            onChange={(e) => {
                              setHeader({
                                ...header,
                                CUST_TEL: e.target.value,
                              });
                            }}
                            type="text"
                            disabled={!permissions}
                            className={appColors.inputColor}
                          />
                          {/* </div> */}
                        </WrapperItem>

                        {/* Dia chi Khach hang */}
                        <div className="mb-3">
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(31, "Địa chỉ")}
                          </Label>
                          <TextArea
                            rows={2}
                            value={header.CUSTADDR}
                            disabled
                            className={appColors.inputColor}
                          />
                        </div>

                        {/* Ghi chu don hang */}
                        <div className="mb-3">
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(32, "Ghi chú đơn hàng")}
                          </Label>
                          <TextArea
                            className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
                            rows={2}
                            value={header.NOTETEXT}
                            disabled={!permissions}
                            onChange={(e) => {
                              setHeader({
                                ...header,
                                NOTETEXT: e.target.value,
                              });
                            }}
                          />
                        </div>

                        {/* NV Ban hang */}
                        {/* <WrapperItem>
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(99, "NV Bán hàng")}
                          </Label>
                          <Input
                            id="EMPLCODE"
                            name="EMPLCODE"
                            style={{ borderColor: "grey" }}
                            value={
                              JSON.parse(localStorage.getItem("userData"))
                                .EMPLNAME
                            }
                            type="text"
                            disabled={true}
                            className={appColors.inputColor}
                          />
                        </WrapperItem> */}
                      </div>
                    </div>

                    <div className="lg:w-1/3 w-full">
                      <div className="wrapper-item">
                        {/* Loai tien */}
                        <div className="mb-3">
                          <FieldEditCombobox
                            title={getLabelValue(87, "Loại tiền")}
                            id={"CuomCode"}
                            data={CuomCode}
                            defaultValue={
                              header !== undefined
                                ? CuomCode.find(
                                    (item) =>
                                      item.ITEMCODE === header.CUOMCODE + ""
                                  )
                                : CuomCodeSelected
                            }
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

                        {/* Phuong thuc Thanh toan */}
                        {DcmnViewDDH[9].DATAVIEW === 1 && (
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={getLabelValue(
                                37,
                                "Phương thức thanh toán"
                              )}
                              id={paymentMethods}
                              data={paymentMethods}
                              defaultValue={
                                header !== undefined
                                  ? paymentMethods.find(
                                      (item) =>
                                        item.ITEMCODE ===
                                        header.PAY_MTHD.toString() + ""
                                    )
                                  : paymentMethodSelected
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) =>
                                setPaymentMethodSelected(e.target.value)
                              }
                              disabled={!permissions}
                            />
                          </div>
                        )}

                        {/* Thong tin Ky han thanh toan */}
                        {DcmnViewDDH[10].DATAVIEW === 1 && (
                          // Ky han thanh toan
                          <WrapperItem>
                            <Label
                              className="text-sm"
                              style={{ color: "grey" }}
                            >
                              {getLabelValue(100, "Kỳ hạn TT")}
                            </Label>
                            {/* So ngay */}
                            <NumericTextBox
                              id="PYMNNUMB"
                              name="PYMNNUMB"
                              style={{
                                borderColor: "grey",
                                textAlign: "right",
                              }}
                              className={`text-number ${appColors.inputColor}`}
                              disabled={!permissions}
                              onChange={(e) => {
                                setHeader({
                                  ...header,
                                  PYMNNUMB: e.target.value,
                                });
                              }}
                              defaultValue={1}
                            />
                            {/* Loai Ky han */}
                            <ComboBox
                              className={appColors.inputColor}
                              name="PymnPerd"
                              id="PymnPerd"
                              style={{ borderColor: "grey" }}
                              data={PymnPerd}
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              defaultValue={
                                header !== undefined
                                  ? PymnPerd.find(
                                      (item) =>
                                        item.ITEMCODE === header.PYMNPERD + ""
                                    )
                                  : PymnPerdSelected
                              }
                              onChange={(e) => {
                                setPymnPerdSelected(e.target.value);
                                setHeader({
                                  ...header,
                                  PYMNPERD: parseInt(e.target.value.ITEMCODE),
                                });
                              }}
                            />
                          </WrapperItem>
                        )}

                        {/* Thong tin Ky han thanh toan */}
                        {/* <div className="mb-3">
                          <div className="flex gap-3">
                            <FieldWrapper className="w-full">
                              <Label
                                className="text-sm"
                                style={{ color: "grey" }}
                              >
                                {getLabelValue(101, "Thời gian thanh toán")}
                              </Label>
                              <div className={"k-form-field-wrap"}>
                                <Input
                                  id="PYMNNUMB"
                                  name="PYMNNUMB"
                                  style={{ borderColor: "grey" }}
                                  type="number"
                                  value={0}
                                  className={appColors.inputColor}
                                />
                              </div>
                            </FieldWrapper>
                            <div className="w-full">
                              <Label
                                className="text-sm"
                                style={{ color: "grey" }}
                              >
                                {getLabelValue(102, "Kỳ thanh toán")}
                              </Label>
                              <FieldEditCombobox
                                title=""
                                id={"PYMNPERD"}
                                data={paymentCycles}
                                defaultValue={paymentCycles[0]}
                                textField="ITEMNAME"
                                dataItemKey="ITEMCODE"
                                onComboboxChange={(e) =>
                                  setpaymentCyclesSelected(e.target.value)
                                }
                                disabled={!permissions}
                                className={appColors.inputColor}
                              />
                            </div>
                          </div>
                        </div> */}

                        {/* Thong tin ve Xuat hoa don */}
                        {DcmnViewDDH[8].DATAVIEW === 1 && (
                          <div>
                            {/* Xuat hoa don ? */}
                            <div className="VATInfo-wrapper w-full mb-3">
                              <FieldWrapper>
                                <Checkbox
                                  className="mr-2"
                                  size="large"
                                  checked={header.VAT_OUPT === 1 ? true : false}
                                  value={header.VAT_OUPT}
                                  onChange={(e) => {
                                    setHeader({
                                      ...header,
                                      VAT_OUPT: e.target.value === true ? 1 : 0,
                                    });
                                    toggleChooseVAT();
                                  }}
                                />
                                <Label
                                  className="text-sm"
                                  style={{ color: "grey" }}
                                >
                                  {getLabelValue(91, "Xuất hóa đơn")}
                                </Label>
                              </FieldWrapper>
                            </div>

                            {/* Ten Khach hang */}
                            <div className="w-full mb-3">
                              <FieldWrapper>
                                <Label
                                  className="text-sm"
                                  style={{ color: "grey" }}
                                >
                                  {getLabelValue(92, "Tên khách hàng")}
                                </Label>
                                {header.VAT_OUPT === 1 ? (
                                  <Input
                                    value={header.VAT_CUST}
                                    className={appColors.inputColor}
                                    onChange={(e) =>
                                      setHeader({
                                        ...header,
                                        VAT_CUST: e.value,
                                      })
                                    }
                                    disabled={!permissions}
                                  />
                                ) : (
                                  <MaskedTextBox
                                    value={header.VAT_CUST}
                                    className={appColors.inputColor}
                                    disabled={true}
                                  />
                                )}
                              </FieldWrapper>
                            </div>

                            {/* Dia chi */}
                            <div className="w-full mb-3">
                              <FieldWrapper>
                                <Label
                                  className="text-sm"
                                  style={{ color: "grey" }}
                                >
                                  {getLabelValue(31, "Địa chỉ")}
                                </Label>
                                {header.VAT_OUPT === 1 ? (
                                  <Input
                                    value={header.VAT_ADDR}
                                    className={appColors.inputColor}
                                    onChange={(e) =>
                                      setHeader({
                                        ...header,
                                        VAT_ADDR: e.value,
                                      })
                                    }
                                  />
                                ) : (
                                  <MaskedTextBox
                                    value={header.VAT_ADDR}
                                    className={appColors.inputColor}
                                    disabled={true}
                                  />
                                )}
                              </FieldWrapper>
                            </div>

                            {/* Ma so thue */}
                            <div className="w-full mb-3">
                              <FieldWrapper>
                                <Label
                                  className="text-sm"
                                  style={{ color: "grey" }}
                                >
                                  {getLabelValue(30, "Mã số thuế")}
                                </Label>
                                {header.VAT_OUPT === 1 ? (
                                  <Input
                                    value={header.TAX_CODE}
                                    className={appColors.inputColor}
                                    onChange={(e) =>
                                      setHeader({
                                        ...header,
                                        TAX_CODE: e.value,
                                      })
                                    }
                                    disabled={!permissions}
                                  />
                                ) : (
                                  <MaskedTextBox
                                    value={header.TAX_CODE}
                                    className={appColors.inputColor}
                                    disabled={true}
                                  />
                                )}
                              </FieldWrapper>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lg:w-1/3 w-full">
                      <div className="wrapper-item">
                        {/* Nguoi nhan hang */}
                        {DcmnViewDDH[3].DATAVIEW === 1 && (
                          <FieldWrapper className="w-full mb-3">
                            <Label
                              className="text-sm"
                              style={{ color: "grey" }}
                            >
                              {getLabelValue(45, "Người nhận hàng")}
                            </Label>
                            <div className={"k-form-field-wrap"}>
                              <Input
                                id="RCVREMPL"
                                name="RCVREMPL"
                                className={appColors.inputColor}
                                style={{ borderColor: "grey" }}
                                type="text"
                                value={header.RCVREMPL || ""}
                                disabled={!permissions}
                                onChange={(e) => {
                                  setHeader({
                                    ...header,
                                    RCVREMPL: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </FieldWrapper>
                        )}

                        {/* So dien thoai nhan hang */}
                        {DcmnViewDDH[3].DATAVIEW === 1 && (
                          <FieldWrapper className="w-full mb-3">
                            <Label
                              className="text-sm"
                              style={{ color: "grey" }}
                            >
                              {getLabelValue(46, "Số điện thoại nhận hàng")}
                            </Label>
                            <div className={"k-form-field-wrap"}>
                              <Input
                                className={appColors.inputColor}
                                id="RCVR_TEL"
                                name="RCVR_TEL"
                                style={{ borderColor: "grey" }}
                                type="text"
                                value={header.RCVR_TEL || ""}
                                disabled={!permissions}
                                onChange={(e) => {
                                  setHeader({
                                    ...header,
                                    RCVR_TEL: e.target.value.toString(),
                                  });
                                }}
                              />
                            </div>
                          </FieldWrapper>
                        )}

                        {/* Tinh/ Thanh pho */}
                        {DcmnViewDDH[4].DATAVIEW === 1 && (
                          <FieldEditCombobox
                            title={getLabelValue(95, "Thành phố/ Tỉnh")}
                            id={"PrvnCode"}
                            data={listPrvn}
                            defaultValue={
                              header !== undefined
                                ? listPrvn.find(
                                    (item) =>
                                      item.ITEMCODE === header.DLVRPRVN + ""
                                  )
                                : PrvnSelected
                            }
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onComboboxChange={PrvnChgeHandler}
                            disabled={!permissions}
                          />
                        )}

                        {/* Quan / Huyen */}
                        {DcmnViewDDH[4].DATAVIEW === 1 && (
                          <FieldEditCombobox
                            title={getLabelValue(96, "Quận/ Huyện")}
                            id={"DistCode"}
                            data={listDist}
                            defaultValue={
                              header !== undefined
                                ? listDist.find(
                                    (item) =>
                                      item.ITEMCODE === header.DLVRDIST + ""
                                  )
                                : DistSelected
                            }
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onComboboxChange={DistChgeHandler}
                            disabled={!permissions}
                          />
                        )}

                        {/* Phuong / Xa */}
                        {DcmnViewDDH[4].DATAVIEW === 1 && (
                          <FieldEditCombobox
                            title={getLabelValue(97, "Phường/ Xã")}
                            id={"WardCode"}
                            data={listWard}
                            defaultValue={
                              header !== undefined
                                ? listWard.find(
                                    (item) =>
                                      item.ITEMCODE === header.DLVRWARD + ""
                                  )
                                : WardSelected
                            }
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onComboboxChange={WardChgeHandler}
                            disabled={!permissions}
                          />
                        )}

                        {/* Dia chi cu the  */}
                        {DcmnViewDDH[4].DATAVIEW === 1 && (
                          <FieldWrapper className="w-full mb-3">
                            <Label
                              className="text-sm"
                              style={{ color: "grey" }}
                            >
                              {getLabelValue(93, "Địa chỉ cụ thể")}
                            </Label>
                            <div className={"k-form-field-wrap"}>
                              <Input
                                className={appColors.inputColor}
                                id="DLVRNUMB"
                                name="DLVRNUMB"
                                style={{ borderColor: "grey" }}
                                type="text"
                                value={header.DLVRNUMB || " "}
                                disabled={!permissions}
                                onChange={(e) => {
                                  setDlvrNumb(e.value);
                                  setHeader({
                                    ...header,
                                    DLVRNUMB: e.target.value.toString(),
                                  });
                                }}
                              />
                            </div>
                          </FieldWrapper>
                        )}

                        {/* Dia diem nhan */}
                        {DcmnViewDDH[3].DATAVIEW === 1 && (
                          <FieldWrapper className="w-full mb-3">
                            <Label
                              className="text-sm"
                              style={{ color: "grey" }}
                            >
                              {getLabelValue(103, "Địa điểm giao")}
                            </Label>
                            <div className={"k-form-field-wrap"}>
                              <TextArea
                                className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
                                rows={2}
                                value={header.DLVRPLCE}
                                disabled={DcmnViewDDH[4].DATAVIEW === 1}
                              />
                            </div>
                          </FieldWrapper>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabStripTab>

              {DcmnViewDDH[2].DATAVIEW === 1 && (
                <TabStripTab title={getLabelValue(106, "Thông tin Giao hàng")}>
                  <div className="wrapper lg:flex lg:justify-between flex-none gap-4">
                    <div className="lg:w-1/2 w-full">
                      <div className="wrapper-item">
                        {/* Ngay gio giao hang */}
                        {DcmnViewDDH[2].DATAVIEW === 1 && (
                          <div className="w-full mb-3">
                            <Label className="text-sm text-gray-500">
                              {getLabelValue(44, "Thời gian giao hàng")}
                            </Label>
                            <DateTimePicker
                              className={`border-1 border-[#808080] ${appColors.inputColor}`}
                              format="dd/MM/yyyy HH:mm:ss"
                              weekNumber={true}
                              defaultValue={currentDate}
                              disabled={!permissions}
                            />
                          </div>
                        )}

                        {/* Phuong thuc giao hang */}
                        {DcmnViewDDH[6].DATAVIEW === 1 && (
                          <div className="w-full mb-3">
                            <FieldEditCombobox
                              title={getLabelValue(42, "Phương thức giao hàng")}
                              id={"DLVRMTHD"}
                              data={deliveryMethods}
                              className={appColors.inputColor}
                              defaultValue={
                                header !== undefined
                                  ? deliveryMethods.find(
                                      (item) =>
                                        item.ITEMCODE === header.DLVRMTHD + ""
                                    )
                                  : deliveryMethodsSelected
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              disabled={!permissions}
                              onComboboxChange={(e) => {
                                setDeliveryMethodsSelected(e.target.value);
                                setHeader({
                                  ...header,
                                  DLVRMTHD: parseInt(e.target.value.ITEMCODE),
                                });
                              }}
                            />
                          </div>
                        )}

                        {/* Phuong thuc van chuyen */}
                        {DcmnViewDDH[7].DATAVIEW === 1 && (
                          <div className={"w-full mb-3"}>
                            <FieldEditCombobox
                              className={appColors.inputColor}
                              title={getLabelValue(
                                43,
                                "Phương thức vận chuyển"
                              )}
                              id={"DLVRTYPE"}
                              data={deliveryTypes}
                              defaultValue={
                                header !== undefined && header.DLVRTYPE !== ""
                                  ? deliveryTypes.find(
                                      (item) =>
                                        item.ITEMCODE === header.DLVRTYPE + ""
                                    )
                                  : deliveryTypesSelected
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              disabled={!permissions}
                              onComboboxChange={(e) => {
                                setdeliveryTypesSelected(e.target.value);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                      <div className="wrapper-item">
                        {/* Dia diem giao */}
                        {DcmnViewDDH[5].DATAVIEW === 1 && (
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={getLabelValue(103, "Địa điểm giao")}
                              id={"dlvrAddr"}
                              data={dlvrAddr}
                              defaultValue={
                                header !== undefined
                                  ? listPrvn.find(
                                      (item) =>
                                        item.ITEMCODE === header.DLVRADDR + ""
                                    )
                                  : dlvrAddrSelected
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={DlverAddrChgeHandler}
                              disabled={!permissions}
                            />
                          </div>
                        )}

                        {/* Chanh xe */}
                        {DcmnViewDDH[5].DATAVIEW === 1 && (
                          <div className="mb-3">
                            <FieldEditCombobox
                              title={getLabelValue(104, "Chành xe")}
                              id={"Car_Addr"}
                              data={car_Addr}
                              defaultValue={
                                header !== undefined
                                  ? car_Addr?.find(
                                      (item) =>
                                        item.ITEMCODE === header.CAR_ADDR + ""
                                    )
                                  : Car_AddrSelected
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onComboboxChange={(e) =>
                                setCar_AddrSelected(e.target.value)
                              }
                              disabled={!permissions}
                            />
                          </div>
                        )}

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
                  </div>
                </TabStripTab>
              )}

              {/* {DcmnViewDDH[11].DATAVIEW === 1 && (
                <TabStripTab title={getLabelValue(107, "Thông tin Đính kèm")}>
                  <div className="wrapper flex justify-between gap-4">
                    <div className="basis-1/3">
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
                </TabStripTab>
              )} */}
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
              {/* Tong so luong */}
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-500 w-full">
                  {getLabelValue(50, "Tổng số lượng:")}
                </p>
                <NumericTextBox
                  id="SMPRQTTY"
                  name="SMPRQTTY"
                  style={{ borderColor: "grey", textAlign: "right" }}
                  value={header.SMPRQTTY}
                  type="number"
                  disabled
                  className={`text-number ${appColors.inputColor}`}
                />
              </div>

              {/* Tien hang */}
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-500 w-full">
                  {getLabelValue(98, "Tiền hàng:")}
                </p>
                <NumericTextBox
                  id="SUM_CRFR"
                  name="SUM_CRFR"
                  style={{ borderColor: "grey", textAlign: "right" }}
                  type="number"
                  className={`text-number ${appColors.inputColor}`}
                  disabled={!permissions}
                  value={header.SUM_CRFR}
                  onChange={(e) => {
                    setHeader({ ...header, SUM_CRFR: e.target.value });
                  }}
                />
              </div>

              {/* Ty le Chiet khau */}
              {DcmnViewDDH[0].DATAVIEW === 1 && (
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {getLabelValue(51, "% chiết khấu:")}
                  </p>
                  <NumericTextBox
                    id="RDTNRATE"
                    name="RDTNRATE"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    value={header.RDTNRATE}
                    type="number"
                    className={`text-number ${appColors.inputColor}`}
                    disabled={!permissions}
                    onChange={(e) =>
                      setHeader({ ...header, RDTNRATE: e.target.value })
                    }
                  />
                </div>
              )}

              {/* Tien Chiet khau */}
              {DcmnViewDDH[0].DATAVIEW === 1 && (
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {getLabelValue(52, "Tiền chiết khấu:")}
                  </p>
                  <NumericTextBox
                    id="RDTNCRAM"
                    name="RDTNCRAM"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    value={header.RDTNCRAM}
                    type="number"
                    className={`text-number ${appColors.inputColor}`}
                    disabled
                  />
                </div>
              )}

              {/* Ty le Hoa hong */}
              {DcmnViewDDH[1].DATAVIEW === 1 && (
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {getLabelValue(53, "% hoa hồng:")}
                  </p>
                  <NumericTextBox
                    id="CSCMRATE"
                    name="CSCMRATE"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    type="number"
                    className={`text-number ${appColors.inputColor}`}
                    disabled={!permissions}
                    value={header.CSCMRATE}
                    onChange={(e) => {
                      setHeader({ ...header, CSCMRATE: e.target.value });
                    }}
                  />
                </div>
              )}

              {/* Thue suat */}
              {DcmnViewDDH[13].DATAVIEW === 1 && (
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {getLabelValue(54, "Thuế xuất:")}
                  </p>
                  <NumericTextBox
                    id="VAT_RATE"
                    name="VAT_RATE"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    type="number"
                    className={`text-number ${appColors.inputColor}`}
                    value={header.VAT_RATE}
                    onChange={(e) =>
                      setHeader({ ...header, VAT_RATE: e.target.value })
                    }
                  />
                </div>
              )}

              {/* Tien thue */}
              {DcmnViewDDH[13].DATAVIEW === 1 && (
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {getLabelValue(55, "Tiền thuế:")}
                  </p>
                  <NumericTextBox
                    id="VAT_CRAM"
                    name="VAT_CRAM"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    value={header.VAT_CRAM}
                    type="number"
                    className={`text-number ${appColors.inputColor}`}
                    disabled
                  />
                </div>
              )}

              {/* Thue suat Vận chuyển */}
              {DcmnViewDDH[12].DATAVIEW === 1 && (
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {getLabelValue(108, "Thuế vận chuyển:")}
                  </p>
                  <NumericTextBox
                    id="DLVRRATE"
                    name="DLVRRATE"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    type="number"
                    className={`text-number ${appColors.inputColor}`}
                    value={header.DLVRRATE ? header.DLVRRATE : 0}
                    onChange={(e) =>
                      setHeader({ ...header, DLVRRATE: e.target.value })
                    }
                    defaultValue={0}
                  />
                </div>
              )}

              {/* Tien vân chuyển*/}
              {DcmnViewDDH[12].DATAVIEW === 1 && (
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-500 w-full">
                    {getLabelValue(109, "Tiền vận chuyển:")}
                  </p>
                  <NumericTextBox
                    id="DLVRCRAM"
                    name="DLVRCRAM"
                    style={{ borderColor: "grey", textAlign: "right" }}
                    value={header.DLVRCRAM ? header.DLVRCRAM : 0}
                    type="number"
                    className={`text-number ${appColors.inputColor}`}
                    onChange={(e) =>
                      setHeader({ ...header, DLVRCRAM: e.target.value })
                    }
                    defaultValue={0}
                  />
                </div>
              )}

              {/* Tong tien sau thue + chi phi */}
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-500 w-full">
                  {getLabelValue(56, "Tổng tiền:")}
                </p>
                <NumericTextBox
                  id="SUM_CRAM"
                  name="SUM_CRAM"
                  style={{ borderColor: "grey", textAlign: "right" }}
                  value={header.SUM_CRAM}
                  type="number"
                  className={`text-number ${appColors.inputColor}`}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiet */}
      <div className="lg:m-2 m-0 mt-4 bg-blue-50 border-solid border-[1px] border-borderBase hover:border-blue-700">
        <div className="hidden lg:block md:block">
          <Grid
            data={orderDetails}
            dataItemKey={"PRDCCODE"}
            // rowHeight={50}
            onItemChange={itemChange}
            editField={EDIT_FIELD}
            style={{ height: "100%" }}
          >
            <GridNoRecords>
              <p className="text-red-700 italic">
                {" "}
                {getLabelValue(71, "Không có dữ liệu")}
              </p>
            </GridNoRecords>
            <GridColumn
              headerCell={OrderDetailHeader}
              field="PRDCCODE"
              title={getLabelValue(61, "Mã")}
              width="110px"
              editable={false}
              footerCell={SumTitleCell}
            />
            <GridColumn
              headerCell={OrderDetailHeader}
              field="PRDCNAME"
              title={getLabelValue(62, "Tên")}
              width="400px"
              editable={false}
            />
            <GridColumn
              headerCell={OrderDetailHeader}
              field="sortSale"
              title={getLabelValue(63, "Phân loại")}
              width="150px"
              cell={DropdowCell}
            />
            <GridColumn
              headerCell={OrderDetailHeader}
              field="PRDCQTTY"
              title={getLabelValue(64, "Số lượng")}
              editor="numeric"
              footerCell={QuantityCell}
              className="customColumn numberic-right"
              width="100px"
            />
            <GridColumn
              headerCell={OrderDetailHeader}
              field="QUOMNAME"
              title={getLabelValue(65, "ĐVT")}
              editable={false}
              width="70px"
            />
            <GridColumn
              headerCell={OrderDetailHeader}
              field="SALEPRCE"
              title={getLabelValue(66, "Giá bán")}
              editor="numeric"
              format="{0:n}"
              className="customColumn numberic-right"
              width="150px"
            />
            <GridColumn
              headerCell={OrderDetailHeader}
              field="DISCRATE"
              title={getLabelValue(67, "% Chiết khấu")}
              editor="numeric"
              className="customColumn numberic-right"
              width="100px"
            />
            <GridColumn
              headerCell={OrderDetailHeader}
              field="DCPRAMNT"
              title={getLabelValue(68, "Tiền Chiết khấu")}
              format="{0:n}"
              editor="numeric"
              editable={false}
              footerCell={SumDcprAmntCell}
              className="customColumn numberic-right"
              width="140px"
            />
            <GridColumn
              headerCell={OrderDetailHeader}
              className="customColumn numberic-right"
              field="MNEYAMNT"
              title={getLabelValue(69, "Thành tiền")}
              editable={false}
              editor="numeric"
              format="{0:n}"
              footerCell={SumMoneyCell}
              style={{ textAlign: "right" }}
              width="180px"
            />
            {permissions && (
              <GridColumn
                cell={CommandCell}
                width="100px"
                title={getLabelValue(70, "Chức năng")}
                headerCell={OrderDetailHeader}
              />
            )}
          </Grid>
        </div>
        <div className="block lg:hidden md:hidden">
          <ListView
            data={orderDetails}
            item={CustomOrderDetailItem}
            style={{
              width: "100%",
            }}
            header={MyListHeader}
            footer={MyListFooter}
          />
        </div>

        <div className="h-[1px] bg-borderBase"></div>

        {/* Nut Them dong Detail */}
        <div className="p-3">
          {permissions && (
            <button
              type="button"
              disabled={!permissions}
              className={`outline outline-offset-2 outline-1 hover:outline-2 rounded-sm pr-2 pl-2 text-sm`}
              onClick={() => setVisibleDialog(true)}
            >
              {getLabelValue(73, "Thêm dòng")}
            </button>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
});

export default OrderCustomer2;
