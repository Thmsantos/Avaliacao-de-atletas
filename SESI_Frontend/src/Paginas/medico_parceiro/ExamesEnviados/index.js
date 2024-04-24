import React, { useState, useEffect } from 'react';
import './table.css';
import { Button, Table, Modal, Form, Container } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import Axios from 'axios'

function Tabela({ atleta }) {


  useEffect(() => {
    Axios.get(`http://4.228.66.252:24/medico/verExameEnviado/${atleta}`)
      .then((response) => response.data)
      .then((response) => {
        console.log(response)
        setDownload(response.msg)
        setIdExame(response.id)
      })
  }, [])


  const [show, setShow] = useState(false);
  const [telaSim, setTelaSim] = useState('nao');
  const [situacao, setSituacao] = useState('');
  const [idexame, setIdExame] = useState([])



  const [download, setDownload] = useState([])



  function clica() {

    window.alert(download)

  }
  function downloadFile(index) {

    saveAs(download[index]);

  }

  function validar() {
    setShow(true)
  }

  function avaliar() {

    Axios.put(`http://4.228.66.252:24/medico/avaliarExame/${idexame}`, {
      situacao : situacao
    }).then((response) => console.log(response))
    .then((response) => alert(response.msg))
  }

  return (
    <Container>
      <div className='m-5'>
        <Table responsive striped bordered hover >
          <thead>
            <tr class="bg-tabela text-white" >
              <th >Nome do Arquivo</th>
              <th>Validar Exames</th>
            </tr>
          </thead>
          <tbody>
            {download.map((download, index) => {
              return(
              download == 'Exame não enviado' ?  (
                <tr>
                  <td>{download}</td>
                  <td>{download}</td>
                </tr>
              ) : 
              (              
                <tr>
                  <td><Button variant="success" size="sm" onClick={() => downloadFile(index)}>Mark.pdf</Button></td>
                  <td><Button variant="success" size="sm" onClick={validar}>Validar</Button></td>
                </tr>
              )
              
              )
            })}
          </tbody>
        </Table>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title >Validar Exame</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={{}}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Registre sua avaliação:</Form.Label>
                <div className='divButtons'>
                  <Button variant="success" className="ms-3"
                    onClick={() => setSituacao("APROVADO")}>Aprovado</Button>
                  <Button variant="danger" className="ms-3"
                    onClick={() => setSituacao("REPROVADO")}>Reprovado</Button>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Justificativa:</Form.Label>
                <Form.Control className='textArea'
                  as="textarea"
                  row={3}
                  placeholder=""
                  // value={preco}
                  // onChange={(e) => {setPreco(e.target.value);}}
                  required
                  autoFocus
                />
              </Form.Group>
              {telaSim === 'sim' ? (
                <>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Especialidade:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      required
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nome do médico parceiro:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      required
                      autoFocus
                    />
                  </Form.Group>
                </>
              ) : ''}
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Fechar
                </Button>
                <Button onClick={avaliar} type="submit" variant="success">
                  Enviar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
}

export default Tabela;