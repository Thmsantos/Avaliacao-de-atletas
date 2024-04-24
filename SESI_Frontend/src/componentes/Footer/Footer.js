import React from "react";
import "./Footer.css";

export default function Header(props) {
  return (
    <div className="footer">
      <h1>{props.footer}</h1>
    </div>
  );
}
