import React, { useEffect, useState } from "react";
import { Container, ToggleButton, ButtonGroup, Card } from "react-bootstrap";
import Solicitar from "./Solicitar/Solicitar"
import Visualizar from "./Visualizar/Visualizar";
import Cadastrar from "./Cadastro/Cadastrar";
import Atualizar from "./Atualizar/Atualizar";
import Deletar from "./Deletar/Deletar";
import Header from "../../componentes/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const Medico = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const { email } = useParams()

  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')

  const botoes = [
    { name: "Solicitar", value: "tab1" },
    { name: "Visualizar", value: "tab2" },
    { name: "Cadastrar", value: "tab3" },
    { name: "Atualizar", value: "tab4" },
    { name: "Deletar", value: "tab5" },
  ];

  useEffect(() => {
    axios.get(`http://4.228.66.252:24/verGestor/${email}`)
    .then((response) => response.data)
    .then((response) => {
      setNome(response.nome)
      setCargo(response.cargo)
    })
  }, [] )

  return (
    <>
      <Header nome={nome} cargo={cargo}/>
      <Container className="mt-5">
        <h6 className="fw-normal text-start">Serviços:</h6>
        <ButtonGroup className="w-25">
          {botoes.map((botao, id) => (
            <ToggleButton
              key={id}
              className="rounded-0 me-2"
              size="sm"
              variant="outline-secondary"
              active={activeTab === botao.value}
              value={botao.value}
              onClick={() => {
                setActiveTab(botao.value);
              }}
            >
              {botao.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <Card className="mt-3 mb-5">
          <Card.Body>
            {activeTab === "tab1" && <Solicitar />}
            {activeTab === "tab2" && <Visualizar />}
            {activeTab === "tab3" && <Cadastrar />}
            {activeTab === "tab4" && <Atualizar />}
            {activeTab === "tab5" && <Deletar />}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default Medico;