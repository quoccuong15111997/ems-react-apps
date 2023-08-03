import React from 'react'

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 z-20 w-full p-1 items-center justify-center border-t text-center shadow md:flex md:items-center md:justify-between md:p-2 bg-gray-800 border-gray-600">
      <span className="text-xs text-gray-300 sm:text-center text-center w-full">
        Bản quyền © 2023{" "}
        <a
          href="https://FirstEMS.com"
          className="hover:underline hover:text-blue-600"
        >
          FirstEMS
        </a>
        {" "}IT SOLUTION Co., LTD.
        <br />
        <a>Địa chỉ: 56 Đường số 3, Khu Trung sơn, Bình hưng, Tp. Hồ Chí Minh</a>
        <br />
        <a>Email: Info@FirstEMS.com - Website: https://FirstEMS.com</a>
      </span>
    </footer>
  );
}

export default Footer