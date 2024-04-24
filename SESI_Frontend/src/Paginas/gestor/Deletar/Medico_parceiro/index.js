import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorWrapper from "../../errors";
import { Formulario } from "../../../../componentes/Style/Formularios";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Medico_parceiro(props) {
  const [primeiro_nome, setPrimeiro_nome] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState([]);
  const [disabled, setDisabled] = useState(true);

  function hasError(key) {
    return error.find((o) => o.key === key);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //VALIDATE
    var errors = [];

    //cpf
    const validarCpf = /^\d{11}$/;
    var validCpf = validarCpf.test(Number(cpf));

    if (!validCpf) {
      errors.push({ key: "cpf", value: "Cpf invalido" });
    }

    setError(errors);

    if (errors.length > 0) {
      return false;
    } else {
      buscar()
    }
  };

  const buscar = () => {
    axios.post("http://4.228.66.252:24/listarTodos",{
      cargo: props.cargo,
      cpf: cpf,
    })
    .then((res) => {
      setPrimeiro_nome(res.data.nome)
      toast.success("Médico-Convidado encontrado!")
      setDisabled(false)
    })
    .catch((err) => {
      toast.error("Médico-Convidado não encontrado!")
      setPrimeiro_nome("")
      setDisabled(true)
    })
  }

  const deletar = () =>{
    axios.post('http://4.228.66.252:24/deletar', {
      cargo: props.cargo,
      cpf: cpf
    })
    .then((res) => {
      toast.success('Médico-Convidado Deletado com sucesso!')
    })
    .catch((err) => {
      toast.error('Não foi possível deletar o Médico-Convidado!')
    })
  }

  return (
    <main>
      <Formulario action="">
        <Col>
          <Form.Label>CPF:</Form.Label>
          <Form.Control
            tipo="text"
            autoComplete="off"
            name="cpf"
            className={
              hasError("cpf") ? "form-control is-invalid" : "form-control"
            }
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <div className={hasError("cpf") ? "inline-errormsg" : "hidden"}>
            Escreva corretamente seu cpf
          </div>
        </Col>
        <Col>
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("primeiro_nome")
                ? "form-control is-invalid"
                : "form-control"
            }
            name="primeiro_nome"
            value={primeiro_nome}
            onChange={(e) => setPrimeiro_nome(e.target.value)}
          />
          <ErrorWrapper msg={hasError("primeiro_nome")?.value} />
        </Col>
      </Formulario>

      <Col>
        <div class="pt-4">
          <Button variant="success m-2" size="sm" onClick={handleSubmit}>
            Buscar
          </Button>
          <Button disabled={disabled} variant="success m-2" size="sm" onClick={deletar}>
            Deletar
          </Button>
        </div>
      </Col>
    </main>
  );
}
export default Medico_parceiro;
