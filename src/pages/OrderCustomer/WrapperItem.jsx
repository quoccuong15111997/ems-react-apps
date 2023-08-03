import React from "react";

const WrapperItem = ({ children }) => {
  return (
    <div className="flex justify-between gap-3 items-center mb-3 whitespace-nowrap">
      {children}
    </div>
  );
};

export default WrapperItem;
