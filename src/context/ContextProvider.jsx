import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { apiUrl, staticToken } from "../constants";
import { data } from "autoprefixer";
import { stringify } from "uuid";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu")
      ? localStorage.getItem("activeMenu")
      : true
  );
  if (
    localStorage.getItem("appMenu" == null) ||
    localStorage.getItem("appMenu" == undefined)
  ) {
    localStorage.setItem(
      "appMenu",
      JSON.stringify(localStorage.getItem("userData")).APP_MENU
    );
  }
  const [disableLocation, setDisableLocation] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [token, setAppToken] = useState(undefined);
  const [titleColor, setTitleColor] = useState("#019676");
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [editState, setEditState] = useState(undefined);
  const [passwordGlobal, setPasswordGlobal] = useState("");

  const [appMenu, setAppMenu] = useState(
    JSON.parse(localStorage.getItem("appMenu"))
  );
  const [appColors, setAppColors] = useState({
    inputColor: "bg-white",
    stackColor: "bg-blue-50",
  });
  const [notification, setNotification] = useState({
    visible: false,
    message: "Test Notifications",
  });
  const initLocations = localStorage.getItem("locations")
    ? JSON.parse(localStorage.getItem("locations"))
    : [];
  const [locations, setLocations] = useState(initLocations);
  const initUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : undefined;
  const [userData, setUserData] = useState(initUserData);
  const setToken = (newToken) => {
    setAppToken(newToken);
    localStorage.setItem("user_token", newToken);
  };
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };
  useEffect(() => {
    if (
      localStorage.getItem("sysLabels-e") === null ||
      localStorage.getItem("sysLabels-e") === undefined
    ) {
      loadLabelEnglish();
    }
    if (
      localStorage.getItem("sysLabels-v") === null ||
      localStorage.getItem("sysLabels-v") === undefined
    ) {
      loadLabelVietNam();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeMenu", activeMenu);
  }, [activeMenu]);
  const setNotificationsAutoClose = (mess) => {
    setNotification({
      ...notification,
      message: mess,
      visible: true,
    });
    setTimeout(function () {
      setNotification({
        ...notification,
        mess: "Đã đổi chi nhánh thành công",
        visible: false,
      });
    }, 3000); //5 Second delay
  };
  const loadLabelVietNam = () => {
    // console.log("Loading label VN...");
    api(staticToken)
      .post(apiUrl.label.value, {
        APP_CODE: "WER",
        LGGECODE: "V",
      })
      .then((res) => {
        // console.log(res);
        if (res.data.RETNDATA === null) {
          alert("Không tải được nhãn|Json = " + JSON.stringify(res.data));
        }
        localStorage.setItem("sysLabels-v", JSON.stringify(res.data.RETNDATA));
        if (
          localStorage.getItem("sysLabels-v") === null ||
          localStorage.getItem(
            "sysLabels-v" !== JSON.stringify(res.data.RETNDATA)
          )
        ) {
          localStorage.setItem(
            "sysLabels-v",
            JSON.stringify(res.data.RETNDATA)
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const loadLabelEnglish = () => {
    // console.log("Loading label EN...");
    api(staticToken)
      .post(apiUrl.label.value, {
        APP_CODE: "WER",
        LGGECODE: "e",
      })
      .then((res) => {
        // alert(JSON.stringify(res.data));
        if (res.data.RETNDATA === null) {
          alert("Không tải được nhãn|Json = " + JSON.stringify(res.data));
        }
        // console.log("Loaded label EN...="+JSON.stringify(res.data));
        if (
          localStorage.getItem("sysLabels-e") === null ||
          localStorage.getItem("sysLabels-e") === undefined ||
          localStorage.getItem(
            "sysLabels-e" !== JSON.stringify(res.data.RETNDATA)
          )
        ) {
          // console.log("set label E to local");
          localStorage.setItem(
            "sysLabels-e",
            JSON.stringify(res.data.RETNDATA)
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const [langCode, setLangCode] = useState(
    localStorage.getItem("langCode") != null
      ? localStorage.getItem("langCode")
      : "v"
  );
  const [labels, setLabels] = useState(
    JSON.parse(localStorage.getItem("sysLabels-v"))
  );

  useEffect(() => {
    setLabels(JSON.parse(localStorage.getItem("sysLabels-" + langCode)));
    updateLanguage(langCode);

    api(
      "CmzFIKFr7UvPe6zBPBtn3nkrWOY3UYSLLnTfii/H9QG56Ur6b9XtFty3M9tBEKV1l3d+0mGEXmfQyuGFjrNHYGSODDy+ihkBmsHYUNPgD44="
    )
      .post(apiUrl.config.value, {
        COMPCODE: JSON.parse(localStorage.getItem("company"))?.COMPCODE,
        APP_CODE: "AER",
        SYSTCODE: 4,
      })
      .then((res) => {
        const bodyComp = {
          LGGECODE: langCode.toUpperCase(),
          PASSWORD: "11111111", // anh co khoi tao passwordGlobal, setPasswordGlobal de lay gia tri tu Login qua ma khong dc
          PHONNAME: "",
          SYSTCODE: 4,
          COMPCODE: JSON.parse(localStorage.getItem("company")).COMPCODE,
          USERLGIN: JSON.parse(localStorage.getItem("userData")).USERCODE,
          TKENDEVC: "",
          APP_CODE: "AER",
        };

        api(res.data.RETNDATA.TOKEN)
          .post(apiUrl.sysLogin.value, JSON.stringify(bodyComp))
          .then((res) => {
            // setAppMenu(res.data.RETNDATA.USERLGIN.APP_MENU);
            const bodyMenu = {
              MENUCODE: "WER1001001",
              TREECODE: "",
              TREELVEL: 10,
              MENU_ALL: 0,
            };

            api(res.data.RETNDATA.TOKEN)
              .post(apiUrl.menu.value, JSON.stringify(bodyMenu))
              .then((res) => {
                res.data.RETNDATA.USERLGIN && setAppMenu(
                  res.data.RETNDATA.USERLGIN.APP_MENU
                );
              });
          });
      })
      .catch((err) => console.log(err));
  }, [langCode]);

  const setSystemLangCode = (code) => {
    localStorage.setItem("langCode", code);
    setLangCode(code);
  };
  const getLabelValue = (code, defaultValue) => {
    if (labels == null) {
      return defaultValue;
    }
    const value = labels.find(
      (x) => x.FUNCCODE === "Label_WER" && x.ITEMCODE === code
    );
    if (value != null && value != undefined) {
      return value.ITEMNAME;
    }
    return defaultValue;
  };
  const updateLanguage = (code) => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.updateLanguage.value, {
        LGGECODE: code,
      })
      .then((res) => {
        loadMenu();
      })
      .catch((err) => console.log(err));
  };
  const loadMenu = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.menu.value, {
        MENUCODE: "WER1001001",
        TREECODE: "",
        TREELVEL: 10,
        MENU_ALL: 0,
      })
      .then((res) => {
        try {
          // console.log(JSON.stringify(res.data));
          localStorage.setItem("appMenu", JSON.stringify(res.data.RETNDATA));
          setAppMenu(res.data.RETNDATA);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.log(err));
  };
  const [company, setCompany] = useState(
    JSON.parse(localStorage.getItem("company"))
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        token,
        setToken,
        currentMode,
        setCurrentMode,
        currentColor,
        setCurrentColor,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
        titleColor,
        setTitleColor,
        locations,
        setLocations,
        userData,
        setUserData,
        notification,
        setNotification,
        setNotificationsAutoClose,
        langCode,
        setSystemLangCode,
        labels,
        getLabelValue,
        disableLocation,
        setDisableLocation,
        appColors,
        editState,
        setEditState,
        appMenu,
        setAppMenu,
        company,
        setCompany,
        sidebarOpen,
        setSidebarOpen,
        passwordGlobal,
        setPasswordGlobal,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
