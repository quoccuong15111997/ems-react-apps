import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcGlobe } from "react-icons/fc";
import Transition from "../../utils/Transition";
import VietNamIcon from "../../images/vietnam.png";
import EnglishIcon from "../../images/unitedkingdom.png";
import { useStateContext } from "../../context/ContextProvider";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
function Language() {
  const { langCode, setSystemLangCode, locations } = useStateContext();
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
  const handelLanguageChange = (languageCode) => {
    setSystemLangCode(languageCode);
  };
  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <div className="inline-flex ml-3 language-switch">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ${
          visible && "bg-slate-200"
        }`}
        aria-haspopup="true"
        onClick={() => setVisible(true)}
        aria-expanded={visible}
      >
        <span className="sr-only">Ngôn ngữ</span>
        <img
          src={langCode === "v" ? VietNamIcon : EnglishIcon}
          className="w-4 h-4"
        />
      </button>
      {visible && (
        <Dialog onClose={toggleDialog} width={200} closeIcon={true}>
          <div className="example-config" ref={dropdown}>
            <div className="text-xs font-semibold text-primary uppercase ">
              Ngôn ngữ
            </div>
            <ul>
              <li>
                <button
                  className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                  onClick={() => {
                    toggleDialog();
                    handelLanguageChange("v");
                  }}
                >
                  <img
                    src={VietNamIcon}
                    className="w-4 h-4 text-indigo-300 mr-2"
                  />
                  <span>Tiếng Việt</span>
                </button>
              </li>
              <li>
                <button
                  className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                  onClick={() => {
                    toggleDialog();
                    handelLanguageChange("e");
                  }}
                >
                  <img
                    src={EnglishIcon}
                    className="w-4 h-4 text-indigo-300 mr-2"
                  />
                  <span>English</span>
                </button>
              </li>
            </ul>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default Language;
