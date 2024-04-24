import React, { useState, useEffect } from "react";
import { Container, ToggleButton, ButtonGroup, Card } from "react-bootstrap";
import AvalicacoesPendentes from "./AvaliacoesPendentes";
import AvalicacoesRecebidas from "./AvalicacoesRecebidas";
import Header from "../../componentes/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const Medico = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const { email } = useParams();

  const [idMDC, setIdMDC] = useState('')
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('')

  const botoes = [
    { name: "Avalicações Pendentes", value: "tab1" },
    { name: "Avalicações Recebidas", value: "tab2" },
  ];
  
  useEffect(() => {
    axios.get(`http://4.228.66.252:24/medico/verMedico/${email}`)
    .then((response) => response.data)
    .then((response) => {
      setNome(response.nome)
      setCargo(response.cargo)
      setIdMDC(response.idmedico)
    })
  }, [])

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

      <Card className="mt-3">
        <Card.Body>
          {activeTab === "tab1" && <AvalicacoesPendentes idMedico={idMDC}/>}
          {activeTab === "tab2" && <AvalicacoesRecebidas idMedico={idMDC}/>}
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};
export default Medico;