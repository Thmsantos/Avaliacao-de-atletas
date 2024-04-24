import React, { useState, useEffect } from "react";
import { Button, CloseButton, Table, Form, Modal } from "react-bootstrap";
import { saveAs } from "file-saver";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AvalicacoesPendentes() {
  const { email } = useParams();
  let arrayTipo = []
  let arrayIndex = []

  const [modal, setModal] = useState(false);
  const [modalPdf, setmodalPdf] = useState(false);
  const [dados, setDados] = useState([]);
  const [tipo, setTipo] = useState([])
  const [msgPdfAtleta, setmsgPdfAtleta] = useState("");
  const [idx, setIdx] = useState('')
  const [idexame, setIdexame] = useState([])
  const [id_do_exame, set_id_do_exame] = useState('')

  const [pdf, setPdf] = useState("");
  const [deletarurl, setDeletarurl] = useState(false);

  useEffect(() => {
    arrayTipo = []
    arrayIndex = []
    Axios.get(`http://4.228.66.252:24/atleta/verExamesSolicitados/${email}`)
      .then((res) => {
        setDados(res.data);
        for(let x = 0; x < res.data.length; x++){
          arrayTipo.push(res['data'][x]['tipo'])
          arrayIndex.push(res['data'][x]['idexame'])
        }
        setTipo(arrayTipo)
        setIdexame(arrayIndex)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (deletarurl === true) {
      Axios.put(`http://4.228.66.252:24/atleta/modificarPdf/${email}`, {
        decisao: false,
      })
        .then((res) => res)
        .catch((error) => {
          toast.error("Houve um erro!");
        });
      setDeletarurl(false);
    }
  }, [deletarurl]);

  async function ViewPdf() {
    await Axios.put(`http://4.228.66.252:24/atleta/modificarPdf/${email}`, {
      decisao: true,
    }).then((res) => {
      setPdf(res.data.msg);
    });
  }

  function enviarExame(id_exame) {
    let arquivo = document.getElementById("file").files[0];
    if(arquivo){
      var formData = new FormData();
    formData.append("pdfatleta", arquivo);
    formData.append("idexame", id_exame)
    Axios.put(`http://4.228.66.252:24/atleta/enviarPdf/${email}`, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      setmsgPdfAtleta(res.data.msg);
      setTimeout(() => {
        window.location.reload();
      }, "1000");
    })
    .catch((error) =>{
      toast.error(error.response.data.msg);
    })
    }
    else{
      toast.error("Nenhum arquivo selecionado");
    }
    
  }


  return (
    <div>
      {dados.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr className="titulo bg-tabela text-black" style={{'background-color':'white','color':'white'}}>
              <th>Guia do exame:</th>
              <th>Tipo:</th>
              <th>Enviar Exame:</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((dados, index) => {
              return (
                <tr>
                  <td>
                    {dados.pdfexame !== null ? (
                      <Button
                        onClick={() => {
                          ViewPdf();
                          setmodalPdf(true);
                        }}
                      >
                        Visualizar guia
                      </Button>
                    ) : (
                      "Não há exames no momento"
                    )}
                  </td>
                  <td>{tipo[index]}</td>
                  <td>
                      <Button variant="success" onClick={() => {
                        set_id_do_exame(idexame[index])
                        setIdx(index)
                        setModal(true)
                      }}>
                        Enviar
                      </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        "não há exames no momento"
      )}
      {/* ---------------------------- Modal ------------------------ */}

      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enviar exame solicitado: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h3 style={{ color: "green" }}>{msgPdfAtleta}</h3>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tipo do exame:</Form.Label>
              <Form.Control autoFocus disabled value={tipo[idx]} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enviar PDF do Exame:</Form.Label>
              <input type="file" accept="application/pdf" id="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              enviarExame(id_do_exame);
            }}
          >
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ---------------------------- Modal visualizar PDF ------------------------ */}

      <Modal show={modalPdf} onHide={() => setmodalPdf(false)}>
        <Modal.Header>
          <Modal.Title>Ver exame: </Modal.Title>
          <CloseButton
            onClick={() => {
              setDeletarurl(true);
              setmodalPdf(false);
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Descrição do exame:</Form.Label>
              <Form.Control
                as="textarea"
                autoFocus
                disabled
                style={{ resize: "none" }}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Médico:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                disabled

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Button
                variant="success"
                onClick={() => {
                  saveAs(pdf);
                }}
              >
                Baixar PDF do Exame
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default AvalicacoesPendentes;
