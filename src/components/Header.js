import React from "react";

const Header = ({ title, subtitle }) => {

  return (
    <div>
      <h2 style={{
        color: "#000000",
        fontWeight: "bold",
        marginBottom: "5px",
        textAlign: 'left'
      }}>
        {title}
      </h2>
      <h5 style={{
        color: "#2663a9",
        marginBottom: "5px",
        textAlign: 'left'
      }}>
        {subtitle}
      </h5>
    </div>
  );
};

export default Header;
