import React from "react";

const FooterLess = () => {
  return (
    // <footer className="bottom-0 left-0 z-20 w-full items-center justify-center border-t text-center md:flex md:items-center md:justify-between md:p-2 bg-white">
    <footer className="sticky bottom-0 z-20 w-full items-center justify-center border-t text-center md:flex md:items-center md:justify-between md:p-2 bg-[#ffbf7d] h-9">
      <span className="text-xs text-black sm:text-center text-center w-full">
        Copyright © 2023{" "}
        <a
          href="https://www.firstems.com"
          className="hover:text-[#eb7a06] font-semibold hover:no-underline"
          target="_blank"
        >
          FirstEMS
        </a>
      </span>
    </footer>
  );
};

export default FooterLess;
