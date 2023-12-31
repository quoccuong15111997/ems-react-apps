import React from 'react'

const DetailHeader = (props) => {
  return (
    <a className="k-link text-center bg-primary" onClick={props.onClick}>
      <span
        className="font-semibold"
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        {props.title}
      </span>
      {props.children}
    </a>
  );
};

export default DetailHeader;