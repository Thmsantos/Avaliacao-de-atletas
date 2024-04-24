import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Modal } from "react-bootstrap";
import "./atleta.css";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


function AlterarPerfil() {

  useEffect(() => {
    Axios.get(`http://4.228.66.252:24/atleta/${email}`)
      .then((res) => {
        setCpf(res.data[0].cpf)
        setModalidade(res.data[0].modalidade)
        setSituacao(res.data[0].situacao)
        setAtletaNum(res.data[1].num_tel_atl)
        setNome(res.data[0].nome)
        setDdd(res.data[1].ddd)
        setAtletatipo(res.data[1].tipo_tel_atl)
      })
      .catch((error) =>{
        console.error(error)
      })
  }, [])

  // States que salvam as informações do atleta
  const [ddd, setDdd] = useState('');
  const [cpf, setCpf] = useState('');
  
  const { email } = useParams();

  const [modalidade, setModalidade] = useState('')
  const [nome, setNome] = useState('')
  const [situacao, setSituacao] = useState('')
  const [atletaNum, setAtletaNum] = useState('')
  const [atletatipo, setAtletatipo] = useState('')


  // CONTROLE DE MODAIS
  const [modalTel, setmodalTel] = useState(false);
  const [modalSenha, setmodalSenha] = useState(false);

  // Salvando as informações de telefone - Modal Tel
  const [tipotel, setTipotel] = useState('');
  const [numero, setNumero] = useState("");

  // Salvando as informações de senha - - Modal Senha
  const [senha, setSenha] = useState("");
  const [senha_nova, setSenha_nova] = useState("");

  // variavel que guarda a resposta do servidor
  const [msgsenha, setMsgsenha] = useState("")
  const [msgtel, setMsgtel] = useState("")

  function verificarDDD() {
    let ddds = [
      "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22",
      "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41",
      "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54",
      "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71",
      "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86",
      "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98",
      "99",
    ];

    var verific = false;

    for (let verify = 0; verify < ddds.length; verify++) {
      if (numero.substr(0, 2) === ddds[verify]) {
        verific = true;
      }
    }
    if (verific === false || numero.length < 11 || tipotel === '') {
      toast.error("Houve um erro!");
    }
    else{
      Axios.put("http://4.228.66.252:24/atleta/atualizarAtleta", {
        email: email,
        tipo_tel: tipotel,
        telefone: numero
      })
      .then((res) => {
        setMsgtel(res.data.msg)
        setTimeout(() => {
          window.location.reload();
        },'1000')
      })
    }
    verific = false;
  }



  function AlterarSenha() {
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;

    if (password === confirm_password) {
      Axios.put("http://4.228.66.252:24/atleta/atualizarAtleta", {
        email: email,
        senha: senha,
        senha_nova: senha_nova
      })
      .then((res) => {
        setMsgsenha(res.data.msg)

      })
      setTimeout(() => {
        window.location.reload();
      },'1000')
    }
    else {
      alert("Confirmação de senha inválida");
    }
  }

  return (
    <Container className="mt-5">
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>CPF do Atleta:</Form.Label>
              <Form.Control type="text" placeholder="" disabled value={cpf} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Nome do Atleta:</Form.Label>
              <Form.Control type="text" placeholder="" disabled value={nome} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Esporte:</Form.Label>
              <Form.Control type="text" placeholder="" disabled value={modalidade} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Situação:</Form.Label>
              <Form.Control type="text" placeholder="" disabled value={situacao} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Número de Telefone:</Form.Label>
              <Form.Control type="tel" placeholder="" disabled value={ddd + atletaNum} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tipo do telefone:</Form.Label>
              <Form.Control type="tel" placeholder="" disabled value={atletatipo} />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button
            style={{ margin: 10 }}
            variant="primary"
            onClick={() => setmodalTel(true)}
          >
            Alterar Telefone
          </Button>
          <Button variant="primary" onClick={() => setmodalSenha(true)}>
            Alterar Senha
          </Button>
        </div>
      </Form>

      {/* ---------------------------- Modal ------------------------ */}

      <Modal show={modalTel} onHide={() => setmodalTel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Numero de telefone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h3 style={{color:'green'}}>{msgtel}</h3>
            <Form.Group className="mb-3" >
              {numero.length === 1 && numero === "0" ? setNumero("") : ""}
              <Form.Label>Insira seu numero com ddd:</Form.Label>
              <Form.Control
                onChange={(e) => {
                  const limit = 11;
                  setNumero(e.target.value.slice(0, limit));
                }}
                value={numero}
                type="number"
                placeholder="(xx) x xxxxxxxx"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Insira seu tipo de numero:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setTipotel(e.target.value)}
              >
                <option value="tipo" defaultValue='d'>Selecione o tipo</option>
                <option value="Comercial">Comercial</option>
                <option value="Celular">Celular</option>
                <option value="Residencial">Residencial</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={verificarDDD}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ---------------------------- Modal ------------------------ */}

      <Modal show={modalSenha} onHide={() => setmodalSenha(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Altere sua senha:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h3>{msgsenha}</h3>
            <Form.Group className="mb-3" >
              <Form.Label>insira sua senha antiga:</Form.Label>
              <Form.Control
                id='senha_antiga'
                onChange={(e) => setSenha(e.target.value)}
                type="text"
                placeholder="old password"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Insira uma nova senha:</Form.Label>
              <Form.Control
                id="password"
                type="text"
                placeholder="ex: password123"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>confirme sua senha:</Form.Label>
              <Form.Control
                id="confirm_password"
                type="text"
                placeholder="repeat password123"
                onChange={(e) => setSenha_nova(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={AlterarSenha}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AlterarPerfil;
