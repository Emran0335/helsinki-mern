import React from "react";

const Footer = () => {
  const footerSyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerSyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2023
      </em>
    </div>
  );
};

export default Footer;
