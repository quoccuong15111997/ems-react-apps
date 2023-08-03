import React, { useState, useRef, useEffect } from "react";
import Transition from "../../utils/Transition";
import VietNamIcon from "../../images/vn-square.png";
import EnglishIcon from "../../images/uk-square.png";
import { useStateContext } from "../../context/ContextProvider";

const Language2 = () => {
  const { langCode, setSystemLangCode, locations } = useStateContext();
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const LangChgeHandler = (languageCode) => {
    setSystemLangCode(languageCode);
  };

  return (
    <div className="inline-flex ml-3 language-switch relative">
      <button
        ref={trigger}
        className={`w-8 h-6 flex items-center justify-center transition duration-150 rounded border  border-slate-700 bg-slate-200 ${
          visible && "bg-slate-200"
        }`}
        aria-haspopup="true"
        onClick={() => {
          // setVisible(true);
          setDropdownOpen(!dropdownOpen);
        }}
        aria-expanded={visible}
      >
        <span className="sr-only">Ngôn ngữ</span>
        <img
          src={langCode === "v" ? VietNamIcon : EnglishIcon}
          className="w-6 h-6"
        />
      </button>

      {/* {visible && ( */}
      <Transition
        className="lg:origin-top-right left-0 z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        {/* <div
            className="example-config shadow-lg shadow-gray-200 z-50 w-40 bg-white p-3 rounded transition ease-out duration-200 transform"
            ref={dropdown}
          > */}
        <div
          className="example-config z-50 w-40 p-3 rounded transition ease-out duration-200 transform"
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-primary uppercase">
            Ngôn ngữ
          </div>
          <ul>
            <li>
              <button
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                onClick={() => {
                  toggleDialog();
                  LangChgeHandler("v");
                }}
              >
                <img
                  src={VietNamIcon}
                  className="w-5 h-5 text-indigo-300 mr-2"
                />
                <span>Tiếng Việt</span>
              </button>
            </li>
            <li>
              <button
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                onClick={() => {
                  toggleDialog();
                  LangChgeHandler("e");
                }}
              >
                <img
                  src={EnglishIcon}
                  className="w-5 h-5 text-indigo-300 mr-2"
                />
                <span>English</span>
              </button>
            </li>
          </ul>
        </div>
      </Transition>
      {/* )} */}
    </div>
  );
};

export default Language2;
