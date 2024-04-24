import "../../../componentes/TabComponent/tabs.css";
import React from "react";
import Atleta from "../Visualizar/Atleta/index";
import Medico from "../Visualizar/Medico/index";
import Medico_parceiro from "../Visualizar/Medico_parceiro/index";
import Gestor from "../Visualizar/Gestor/index";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const Visualizar = () => {
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
        </Form.Select>

        <div className="outlet">
          {tela === "Atleta" && <Atleta />}
          {tela === "Médico" && <Medico />}
          {tela === "Médico-Convidado" && <Medico_parceiro />}
          {tela === "Gestor" && <Gestor />}
        </div>
      </div>
    </div>
  );
};

export default Visualizar;
