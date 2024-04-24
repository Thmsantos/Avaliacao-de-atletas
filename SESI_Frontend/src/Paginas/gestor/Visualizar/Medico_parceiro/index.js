import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Card, Col, Button, Table } from "react-bootstrap";
import "../../../../componentes/TabComponent/tabs.css";

const Medico_parceiro = () => {

  const [medico, setMedico] = useState([]);

  let medicos = []
  useEffect(() => {
    axios.post("http://4.228.66.252:24/listar",{
      cargo: 'Médico-Convidado'
    })
    .then((res) => {
      for(let cont = 0; cont < res.data.length; cont++){
        medicos.push(res.data[cont])
      }
      setMedico(medicos)
    })
  }, [])

  

  return (
    <>
      <br/>
      <h3>Dados Pessoais:</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>CRM</th>
            <th>Sexo</th>
            <th>E-mail</th>
            <th>Especialidade</th>
          </tr>
        </thead>
        <tbody>
          {medico.map((med, idx) =>{
            return(
              <tr>
                <td>{med.nome}</td>
                <td>{med.cpf}</td>
                <td>{med.crm}</td>
                <td>{med.sexo}</td>
                <td>{med.email}</td>
                <td>{med.especialidade}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Medico_parceiro;
