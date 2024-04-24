import React, { useState } from "react";
import Solicitar from "../AllTabs/Solicitar";
import Cadastro from "../AllTabs/Cadastro";
import Deletar from "../AllTabs/Deletar";
import Alterar from "../AllTabs/Alterar";

import AvalicacoesPendentes from "../../Paginas/medico/AvaliacoesPendentes";
import AvalicacoesRecebidas from "../../Paginas/medico/AvalicacoesRecebidas";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTab1 = () => {
    setActiveTab("tab1");
  };

  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <div className="Tabs">
      <h4 className="fw-normal text-start">Serviços</h4>
      <ul className="nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          Avalicações Pendentes
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          Avalicações Recebidas
        </li>
      </ul>
      <div className="box">
        {activeTab === "tab1" ? <AvalicacoesRecebidas /> : ""}
        {activeTab === "tab2" ? <AvalicacoesPendentes /> : ""}
      </div>
    </div>
  );
};
export default Tabs;
