import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import '../SolicitarExame/solicitarExame.css';

function SolicitarExame() {

  const options = [
    { value: 'exame1', label: 'Exame1' },
    { value: 'exame2', label: 'Exame2' },
    { value: 'exame3', label: 'Exame3' },
  ]

  return (
    <Container className='mt-5'>
      <Row className='justify-content-md-center '>
        <Form className='w-50 m-auto form '>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>CPF:</Form.Label>
            <Form.Control type="text" placeholder="" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Nome do Atleta:</Form.Label>
            <Form.Control type="text" placeholder="" disabled />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicCheckbox">
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Modalidade:</Form.Label>
            <Form.Control type="text" placeholder="" disabled />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicCheckbox">
          </Form.Group>
          <Form.Label>Tipo do Exame:</Form.Label>
          <Select
            placeholder="Clique para selecionar"
            isMulti
            options={options}
          />
          <div className='text-center'>
            <Button variant="success mt-4">Enviar</Button>
          </div>

        </Form>
      </Row>
    </Container>
  );
}

export default SolicitarExame;