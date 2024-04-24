import React, { useState } from "react";
import { Container, Card, Button, Modal, Form, Input } from "react-bootstrap";
function App() {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [telaSim, setTelaSim] = useState('nao');
  
  
  const validar = () => {
    if (email === "atleta@gmail.com") {
      return (setShow(true))
    } else {
      return ( window.alert('CPF inválido! Verifique suas credenciais!')) ;
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-5">
        <Card.Body>
          <Form className="d-flex justify-content-center">
            <div className="form">
              <Form.Group className="mb-3 " controlId="formBasicEmail" >
                <Form.Label>Email:</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              
              <Button
                variant="success"
                type="button"
                className="btn"
                onClick={validar}
              >
                Redefinir
              </Button>


             
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title >Redefinir Senha</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={{}}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                
                <Form.Label>Token:</Form.Label>
                <Form.Control required placeholder="" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Senha:</Form.Label>
                <Form.Control type="password" required placeholder="" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Confirmar senha:</Form.Label>
                <Form.Control type="password" required placeholder="" />
              </Form.Group>
              
              
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Fechar
                </Button>
                <Button type="submit" variant="success">
                  Enviar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
    </Container>
  );
}

export default App;
