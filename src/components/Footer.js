import React from "react";

const Footer = () => {
  let style = {
    marginTop: "10px",
    fontFamily: "Roboto",
    color: "red",
  };

  style = { ...style, color: "green" };

  return <p style={style}>NoteApp Copyright Tejcenter</p>;
};

export default Footer;
