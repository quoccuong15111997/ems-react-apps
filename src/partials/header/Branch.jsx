import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";
import BranchIcon from "../../images/branch.png";
import BranchItem from "../branch/BranchItem";
import { useStateContext } from "../../context/ContextProvider";
import { v4 } from "uuid";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { comCodeCommon } from "../../constants";
import api from "../../api";
import { apiUrl } from "../../constants";
function Branch() {
  const {
    locations,
    company,
    setUserData,
    setNotificationsAutoClose,
    disableLocation,
  } = useStateContext();
  const [visible, setVisible] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !visible ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setVisible(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!visible || keyCode !== 27) return;
      setVisible(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  const toggleDialog = () => {
    setVisible(!visible);
  };
   const handelLocationChange = (lctCode) => {
    setVisible(!visible);
     if (lctCode !== JSON.parse(localStorage.getItem("userData")).LCTNCODE) {
       handelLogin(lctCode);
       //setNotificationsAutoClose("Đã đổi chi nhánh thành công");
     }
   };
   const handelLogin = (lct) => {
     console.log("handelLogin");
     api(localStorage.getItem("usertoken"))
       .post(apiUrl.sysLogin.value, {
         LGGECODE: "V",
         PASSWORD: JSON.parse(localStorage.getItem("userLogin")).password,
         PHONNAME: "CE03657B-73CE-45CE-8378-9A37F11E991E",
         SYSTCODE: 4,
         COMPCODE: comCodeCommon,
         USERLGIN: JSON.parse(localStorage.getItem("userLogin")).username,
         TKENDEVC:
           "ekbucq5wKUNZjaajiIzJvv:APA91bH9VgdpAS3gfoDRgqJx0q1Orpty-5QtNEByLPPw6XGibD3BhecJ4zVH2_okKgmQpq_3qa9vhCydboidXulGH1pP1_T75WTZmhNhoZNzA_k09ommNbJCgGnZflkBIhOqint3PCB7",
         APP_CODE: "WER",
       })
       .then((res) => {
         var data = res.data;
         if (data === null || data.RETNDATA === null) {
           setErrorMessage(
             error ? error : "Đăng nhập thất bại|JSON = " + JSON.stringify(data)
           );
           return;
         }
         var returnCode = data.RETNCODE;
         if (returnCode == false) {
           setErrorMessage(
             data.RETNMSSG ? data.RETNMSSG : "Đăng nhập thất bại"
           );
           return;
         }
         var returnData = data.RETNDATA;
         localStorage.setItem("usertoken", returnData.TOKEN);
         handelLoginCompany(lct);
       })
       .catch((error) => {
         setErrorMessage(error ? error : "Đăng nhập thất bại");
       });
   };
   const handelLoginCompany = (lct) => {
     api(localStorage.getItem("usertoken"))
       .post(apiUrl.locationLogin.value, {
         COMPCODE: JSON.parse(localStorage.getItem("company")).COMPCODE,
         LCTNCODE: lct,
       })
       .then((res) => {
         var data = res.data;
         var returnCode = data.RETNCODE;
         if (returnCode == false) {
           setErrorMessage(
             data.RETNMSSG ? data.RETNMSSG : "Đăng nhập thất bại"
           );
           return;
         }
         var returnData = data.RETNDATA;
         console.log(res.data);
         localStorage.setItem("usertoken", returnData.TOKEN);
         saveUserData(returnData.USERLGIN);
         saveCompany(returnData.COMPLIST[0]);
         setLocationsList(returnData.COMPLIST[0].LCTNLIST);
         setUserData(JSON.parse(localStorage.getItem("userData")));
         setNotificationsAutoClose("Đổi chi nhánh thành công");
       })
       .catch((error) => console.log(error));
   };
   const saveUserData = (userLogin) => {
     //alert(JSON.stringify(userLogin));
     localStorage.setItem("userData", JSON.stringify(userLogin));
   };

   const saveCompany = (company) => {
     localStorage.setItem("company", JSON.stringify(company));
   };
   const setLocationsList = (locationsList) => {
     localStorage.setItem("locations", JSON.stringify(locationsList));
   };
  return (
    <>
      {!disableLocation && locations && locations.length > 0 && (
        <div className="relative inline-flex ml-3">
          <button
            ref={trigger}
            className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ${
              visible && "bg-slate-200"
            }`}
            aria-haspopup="true"
            onClick={() => setVisible(!visible)}
            aria-expanded={visible}
            disabled={disableLocation}
          >
            <span className="sr-only">Chi nhánh</span>
            <img src={BranchIcon} className="w-4 h-4" />

            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-white rounded-full"></div>
          </button>
          {visible && (
            <Dialog onClose={toggleDialog} width={350} closeIcon={true}>
              <div className="example-config" ref={dropdown}>
                <div className="text-xs font-semibold text-primary uppercase pt-1.5 pb-2 px-4">
                  Chi nhánh
                </div>
                {locations.map((item) => (
                  <BranchItem
                    key={v4()}
                    title={item.LCTNNAME}
                    code={item.LCTNCODE}
                    selected={
                      item.LCTNCODE ===
                      JSON.parse(localStorage.getItem("userData")).LCTNCODE
                    }
                    onClick={handelLocationChange}
                  />
                ))}
              </div>
            </Dialog>
          )}
        </div>
      )}
    </>
  );
}

export default Branch;
