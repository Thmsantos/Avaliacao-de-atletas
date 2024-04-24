import "../../../componentes/TabComponent/tabs.css";
import React from "react";
import Atleta from "../Deletar/Atleta/index";
import Medico from "../Deletar/Medico/index";
import Medico_parceiro from "../Deletar/Medico_parceiro/index";
import Gestor from "../Deletar/Gestor/index";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const Deletar = () => {
  const [tela, setTela] = React.useState("Atleta");

  return (
    <div className="App">
      <div>
        <Form.Select
          name="Tela"
          id="Tela"
          onChange={(e) => setTela(e.target.value)}
        >
          <option value="Atleta">Atleta</option>
          <option value="Médico">Médico</option>
          <option value="Médico-Convidado">Médico-Convidado</option>
          <option value="Gestor">Gestor</option>
        </Form.Select><br/>

        <div className="Container_tab">
          {tela === "Atleta" && <Atleta cargo="Atleta" />}
          {tela === "Médico" && <Medico cargo="Médico"/>}
          {tela === "Médico-Convidado" && <Medico_parceiro cargo="Médico-Convidado"/>}
          {tela === "Gestor" && <Gestor cargo="Gestor"/>}
        </div>
      </div>
    </div>
  );
};

export default Deletar;
