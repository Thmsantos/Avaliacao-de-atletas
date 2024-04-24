import React, { useState, useEffect } from 'react';
import './table.css';
import { Button, Table, Modal, Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import {saveAs} from 'file-saver';


function Tabela({id}) {

  console.log(id)
  useEffect(() => {
      Axios.get(`http://4.228.66.252:24/medico/verExameEnviado/${id}`)
      .then((response) => response.data)
      .then((response) => {
        setDownload(response.msg)
        setIdExame(response.id)
      })
  }, []) 

  const [show, setShow] = useState(false);
  const [telaSim, setTelaSim] = useState('nao');
  const [tipo, setTipo] = useState('')
  const [situacao, setSituacao] = useState('')
  const [download,setDownload] = useState([])
  const [id_exame, setIdExame] = useState([])


  function validar() {
    setShow(true)
  }

  const [nomeMDC, setNomeMDC] = useState('')

  function enviar_exame(){


    if (telaSim === 'sim'){
      console.log(id_exame)
        Axios.post(`http://4.228.66.252:24/medico/nome_medico_cov`,{
          nome: nomeMDC,
          idexame: id_exame
     })}
    else{
      Axios.put('http://4.228.66.252:24/medico/att_stiuacao',{
        idatleta: id,
        situacao: situacao
      }).then((res) => console.log(res))
    }
  }

  function downloadFile(id_exame){
    saveAs(download[id_exame]);
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
                  <Button variant="success" className="ms-3" onClick={() => setSituacao('APROVADO')}>Aprovado</Button>
                  <Button variant="danger" className="ms-3" onClick={() => setSituacao('REPROVADO')}>Reprovado</Button>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Justificativa:</Form.Label>
                <Form.Control className='textArea'
                  as="textarea"
                  row={3}
                  placeholder=""
                  // value={preco}
                  onChange={(e) => {setTipo(e.target.value);}}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Avaliação do médico paceiro necessária?</Form.Label>
                <Form.Select className='select' onChange={(e) => setTelaSim(e.target.value)}>
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </Form.Select>
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
                    <Form.Label >Nome do médico parceiro:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      required
                      autoFocus
                      onChange={(e) => setNomeMDC(e.target.value)}
                    />

                  </Form.Group>
                </>
              ) : ''}
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Fechar
                </Button>
                <Button type="submit" variant="success" onClick={enviar_exame}>
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