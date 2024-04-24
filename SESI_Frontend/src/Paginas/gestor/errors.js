import React from "react";
//para a mensagem de erro
export default function ErrorWrapper({ msg }) {
  return <div className={msg ? "inline-errormsg" : "hidden"}>{msg}</div>;
}
