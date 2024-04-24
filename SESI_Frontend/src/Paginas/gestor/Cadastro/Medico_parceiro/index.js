import React, { useState } from "react";
import { Formulario } from "../../../../componentes/Style/Formularios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorWrapper from "../../errors";
import axios from "axios";
import { toast } from "react-toastify";

const Medico_parceiro = () => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState([]);
  const [primeiro_nome, setPrimeiro_nome] = useState("");
  const [CRM, setCRM] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [sexo, setSexo] = useState("");

  function hasError(key) {
    return error.find((o) => o.key === key);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //validação
    var errors = [];

    //primeiro_nome
    if (primeiro_nome === "") {
      errors.push({
        key: "primeiro_nome",
        value: "Escreva seu nome corretamente"
      });
    }
    //especialidade
    if (especialidade === "") {
      errors.push({
        key: "especialidade",
        value: "Escreva sua especialidade"
      });
    }
    //CRM
    if (CRM === "") {
      errors.push({
        key: "CRM",
        value: "Escreva seu CRM corretamente"
      });
    }
    //senha
    if (senha <= 0) {
      errors.push({
        key: "senha",
        value: "Escreva sua senha corretamente"
      });
    }
    //cpf
    const validarCpf = /^\d{11}$/;
    var validCpf = validarCpf.test(Number(cpf));

    if (!validCpf) {
      errors.push({ key: "cpf", value: "Cpf invalido" });
    }
    //email
    const validarEmail = /\S+@\S+\./;
    var validEmail = validarEmail.test(String(email));

    if (!validEmail) {
      errors.push({ key: "email", value: "Email invalido" });
    }

    setError(errors);

    if (errors.length > 0) {
      return false;
    } else {
      cadastro()
    }
  };

  const cadastro = () =>{
    axios.post("http://4.228.66.252:24/cadastro", {
      cargo: "Médico-Convidado",
      nome: primeiro_nome,
      cpf: parseInt(cpf),
      crm: CRM,
      sexo: sexo,
      senha: senha,
      email: email,
      especialidade: especialidade 
    })
    .then((res) =>{
      toast.success("Médico Convidado cadastrado com sucesso!")
    })
    .catch((err) => {
      console.log(err)
      toast.error("Houve um erro!")
      toast.info("Verifique se esse CPF já foi cadastrado, ou se todos os campo foram preenchidos")
    })
  }

  return (
    <main>
      <Formulario action="">
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
          <Form.Select onChange={(e) => setSexo(e.target.value)}>
            <option selected disabled>Selecione uma opção</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </Form.Select>
        </Col>
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

        <Col>
          <Form.Label>Senha:</Form.Label>
          <Form.Control
            tipo="text"
            autoComplete="off"
            name="senha"
            className={
              hasError("senha") ? "form-control is-invalid" : "form-control"
            }
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className={hasError("senha") ? "inline-errormsg" : "hidden"}>
            Escreva corretamente a senha
          </div>
        </Col>
      </Formulario>

      <Col>
        <div className="pt-4">
          <Button variant="success" size="sm" onClick={handleSubmit}>
            Cadastrar
          </Button>{" "}
        </div>
      </Col>
    </main>
  );
};
export default Medico_parceiro;
