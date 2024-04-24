import React, { useEffect, useState } from "react";
import { Formulario } from "../../../componentes/Style/Formularios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { toast } from "react-toastify";
import axios from "axios";
import './style.css'

const Solicitar = () => {

  const [cpf, setCpf] = useState("");
  const [error, setError] = useState([]);
  const [cpfValue, setCpfvalue] = useState();
  const [idMedico, setIdMedico] = useState();

  const [nome, setNome] = useState('');
  const [relacao, setRelacao] = useState("");
  const [soli, setSoli] = useState("");
  const [esporte, setEsporte] = useState("");
  const [justi, setJusti] = useState("");
  const [medico, setMedico] = useState(""); 
  const [medicoValue, setMedicoValue] = useState(""); 
  const [check, setCheck] = useState(true);
  const [medicoInput, setMedicoInput] = useState([])

  function hasError(key) {
    return error.find((o) => o.key === key);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //validação
    var errors = [];

    //cpf
    const validarCpf = /^\d{11}$/;
    var validCpf = validarCpf.test(Number(cpf));

    if (!validCpf) {
      errors.push({ key: "cpf", value: "CPF INVÁLIDO" });
    }

    setError(errors);

    if (errors.length > 0) {
      return false;
    } 
    else {
      buscarAtleta()
    }
  };

  const buscarAtleta = () => {
    Axios.post("http://4.228.66.252:24/listarAtleta",{
      cpf: cpf,
    })
    .then((res) => {
      setNome(res.data.nome)
      setRelacao(res.data.situacao)
      setSoli(res.data.solicitacao)
      setEsporte(res.data.modalidade)
      setCheck(false)
      toast.info("Clique em: 'Solicitar avaliação'")
    })
    .catch((err) => {
      toast.error("Atleta não encontrado!")
      setCheck(true)
      setNome("")
      setRelacao("")
      setSoli("")
      setEsporte("")
      setMedico("")
    })
  }

  const solicitarMedico = () => {
    axios.post('http://4.228.66.252:24/solicitarMedico',{
      nome: medicoValue,
    })
    .then((res) => {
      solicited(res.data.idmedico)
    })
    .catch((res) => {
      toast.info('Informe o médico!')
    })
  }

  let nomeMedico = [];
  let idsMedico = [];
  useEffect(() => {
    axios.get('http://4.228.66.252:24/listarMedico')
    .then((res) => {
      for(let cont = 0; cont < res.data.length; cont++){
        nomeMedico.push(res.data[cont].nome);
        idsMedico.push(res.data[cont].idmedico);
      }
      setMedicoInput(nomeMedico)
      setIdMedico(idsMedico)
    })
  }, [])

  const solicited = (id) => {
    axios.put("http://4.228.66.252:24/solicitarAtleta",{
      cpf: cpf,
      idmedico: id
    })
    .then((res) => toast.success("Solicitação enviada!"))
  }

  return (
    <main>
      <Formulario action="">
        <Col>
          <Form.Label>CPF:</Form.Label>
          <Form.Control
            type="number"
            autoComplete="off"
            name="cpf"
            className={
              hasError("cpf") ? "form-control is-invalid" : "form-control"
            }
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <div className={hasError("cpf") ? "inline-errormsg" : "hidden"}>
            CPF inválido!
          </div>
        </Col>
        <Col>
          <Form.Label>Nome:</Form.Label>
          <Form.Control readOnly type="text" className="input-views" name="Nome" value={nome} />
        </Col>
        <Col>
          <Form.Label>Relação:</Form.Label>
          <Form.Control readOnly type="text" className="input-views" name="Relação" value={relacao} />
        </Col>
        <Col>
          <Form.Label>Solicitação de exame:</Form.Label>
          <Form.Control
            className="input-views"
            readOnly
            type="text"
            placeholder=""
            name="Solicitação de exame"
            value={soli}
          />
        </Col>
        <Col>
          <Form.Label>Esporte:</Form.Label>
          <Form.Control readOnly type="text" className="input-views" placeholder="" name="Esporte" value={esporte} />
        </Col>
        <Col>
          <Form.Label>Justificativa:</Form.Label>
          <Form.Control readOnly type="text" className="input-views" name="Justificativa" />
        </Col>
        <Col>
          <Form.Label>Médico:</Form.Label>
          <Form.Select
          name="Tela"
          id="Tela"
          onChange={(e) => setMedicoValue(e.target.value)}
          >
          <option selected disabled value="">Selecione uma opção</option>
          {medicoInput.map((medico, idx) => {  
            return(
              <option value={medico}>{medico}</option>
            );
          })}
        </Form.Select>
        </Col>
      </Formulario>
      <Col>
        <div className="pt-4">
          <Button variant="success m-2" size="sm" onClick={buscarAtleta}>
            Buscar
          </Button>
          <Button variant="success" disabled={check} size="sm" onClick={solicitarMedico}>
            Solicitar avaliação
          </Button>
        </div>
      </Col>
    </main>
  );
};

export default Solicitar;
