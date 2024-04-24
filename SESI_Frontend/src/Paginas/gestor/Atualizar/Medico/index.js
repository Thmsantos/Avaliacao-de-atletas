import React, { useState } from "react";
import { Formulario } from "../../../../componentes/Style/Formularios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorWrapper from "../../errors";
import axios from "axios";
import { toast } from "react-toastify";

const Medico = (props) => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState([]);
  const [primeiro_nome, setPrimeiro_nome] = useState("");
  const [CRM, setCRM] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [disabled, setDisabled] = useState(true);

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
      setCRM(res.data.crm)
      setEmail(res.data.email)
      setSexo(res.data.sexo)
      setEspecialidade(res.data.especialidade)
      toast.info("Atualize os campos desejados!")
      setDisabled(false)
    })
    .catch((err) => {
      toast.error("Médico não encontrado!")
      setPrimeiro_nome("")
      setCRM("")
      setEmail("")
      setEspecialidade("")
      setDisabled(true)
    })
  }

  const alterar = () => {
    axios.put('http://4.228.66.252:24/alterar',{
      cargo: props.cargo,
      cpf: cpf,
      nome: primeiro_nome,
      sexo: sexo,
      crm: CRM,
      email: email,
      especialidade: especialidade
    })
    .then((res) => {
      toast.success('Médico atualizado com sucesso!')
    })
    .catch((err) => {
      toast.error('Não foi possível atualizar o Médico!')
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
            Escreva corretamente o cpf
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
        <Col>
          <Form.Label>Sexo:</Form.Label>
          <Form.Select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="M">M</option>
            <option value="F">F</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>E-mail:</Form.Label>
          <Form.Control
            tipo="text"
            autoComplete="off"
            name="email"
            className={
              hasError("email") ? "form-control is-invalid" : "form-control"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={hasError("email") ? "inline-errormsg" : "hidden"}>
            Escreva corretamente o e-mail
          </div>
        </Col>
        <Col>
          <Form.Label>CRM:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("CRM") ? "form-control is-invalid" : "form-control"
            }
            name="CRM"
            value={CRM}
            onChange={(e) => setCRM(e.target.value)}
          />
          <ErrorWrapper msg={hasError("CRM")?.value} />
        </Col>
        <Col>
          <Form.Label>Especialidade:</Form.Label>
          <Form.Control
            tipo="text"
            autoComplete="off"
            name="especialidade"
            className={
              hasError("especialidade")
                ? "form-control is-invalid"
                : "form-control"
            }
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
          />
          <div
            className={hasError("especialidade") ? "inline-errormsg" : "hidden"}
          >
            Escreva corretamente a especialidade
          </div>
        </Col>
      </Formulario>

      <Col>
        <div className="pt-4">
          <Button variant="success" size="sm" onClick={handleSubmit}>
            Buscar
          </Button>{" "}            
          <Button disabled={disabled} variant="success" size="sm" onClick={alterar}>
            Atualizar
          </Button>{" "}
        </div>
      </Col>
    </main>
  );
};
export default Medico;
