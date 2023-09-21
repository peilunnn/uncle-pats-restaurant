import React from "react";

function Header() {
  return (
    <header
      style={{
        padding: "20px 0",
        textAlign: "center",
        borderBottom: "1px solid #555",
        backgroundColor: "#333",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "2rem",
          fontWeight: 500,
          color: "#eee",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Uncle Pat's Restaurant
      </h1>
    </header>
  );
}

export default Header;
