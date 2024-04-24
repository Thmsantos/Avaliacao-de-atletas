import React, { useState } from "react";
import { Formulario } from "../Style/Formularios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Deletar = () => {
  return (
    <main>
      del
      <Formulario action="">
        <Col>
          <Form.Select defaultValue="Atleta">
            <option>Atleta</option>
            <option>Medico</option>
            <option>Sla</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control
            tipo="text"
            label="Cpf do Atleta"
            placeholder="Insira seu Cpf"
            name="usuario"
          />
        </Col>
        <Col>
          <Form.Control
            tipo="text"
            label="Nome do Atleta"
            placeholder="Insira seu nome"
            name="usuario"
          />
        </Col>
        <Col>
          <Form.Control
            tipo="text"
            label="Relação"
            placeholder="Relação"
            name="Relação"
          />
        </Col>
        <Col>
          <Form.Control
            tipo="text"
            label="Solicitação de exame"
            placeholder="Solicitação de exame"
            name="Solicitação de exame"
          />
        </Col>
        <Col>
          <Form.Control
            tipo="text"
            label="Esporte"
            placeholder="Esporte"
            name="Esporte"
          />
        </Col>
        <Col>
          <Form.Control
            tipo="text"
            label="Justificativa"
            placeholder="Justificativa"
            name="Justificativa"
          />
        </Col>
        <Col>
          <Form.Control
            tipo="text"
            label="Medico"
            placeholder="Medico"
            name="Medico"
          />
        </Col>
      </Formulario>
      <Col>
        <div class="pt-4">
          <Button variant="success" size="sm">
            Buscar
          </Button>{" "}
          <Button variant="success" size="sm">
            Solicitar
          </Button>
        </div>
      </Col>
    </main>
  );
};

export default Deletar;
