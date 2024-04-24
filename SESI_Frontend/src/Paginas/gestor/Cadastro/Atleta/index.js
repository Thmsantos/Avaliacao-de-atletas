import React, { useState } from "react";
import { Formulario } from "../../../../componentes/Style/Formularios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorWrapper from "../../errors";
import axios from "axios";
import { toast } from "react-toastify";

const Atleta = (props) => {
  const [cpf, setCpf] = useState();
  const [error, setError] = useState([]);
  const [primeiro_nome, setPrimeiro_nome] = useState("");
  const [nascimento, setNascimento] = useState(""); 
  const [categoria, setCategoria] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [posição, setPosição] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [sexo, setSexo] = useState("");

  const cadastro = () =>{
    axios.post("http://4.228.66.252:24/cadastro", {
      cpf: parseInt(cpf),
      nome: primeiro_nome,
      senha: senha,
      email: email,
      d_nasc: nascimento,
      sexo: sexo,
      categoria: categoria,
      posicao: posição,
      cargo: "Atleta",
      modalidade: modalidade,  
    })
    .then((res) =>{
      toast.success("Atleta cadastrado com sucesso!")
    })
    .catch((err) => {
      toast.error("Houve um erro!")
      toast.info("Verifique se esse CPF já foi cadastrado")
    })
  }

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
        value: "Escreva o nome corretamente"
      });
    }

    //categoria
    if (categoria === "") {
      errors.push({
        key: "categoria",
        value: "Escreva a categoria corretamente"
      });
    }
    //modalidade
    if (modalidade === "") {
      errors.push({
        key: "modalidade",
        value: "Escreva a modalidade corretamente"
      });
    }
    //senha
    if (senha <= 0) {
      errors.push({
        key: "senha",
        value: "Escreva a senha corretamente"
      });
    }
    //modalidade
    if (posição === "") {
      errors.push({
        key: "posição",
        value: "Escreva a posição corretamente"
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

  return (
    <main>
      <Formulario action="">
        <Col>
          <Form.Label>CPF:</Form.Label>
          <Form.Control
            type ="number"
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
          <Form.Label>Categoria:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("categoria") ? "form-control is-invalid" : "form-control"
            }
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
          <ErrorWrapper msg={hasError("categoria")?.value} />
        </Col>
        <Col>
          <Form.Label name="nome" >Nome:</Form.Label>
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
          <Form.Label name="data_nasc">Data de nascimento:</Form.Label>
          <Form.Control
            tipo="text"
            label="Data de nascimento"
            name="Data de nascimento"
            onChange={(e) => setNascimento(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Label name="modalidade">Modalidade:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("modalidade")
                ? "form-control is-invalid"
                : "form-control"
            }
            name="modalidade"
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value)}
          />
          <ErrorWrapper msg={hasError("modalidade")?.value} />
        </Col>
        <Col>
          <Form.Label name="sexo">Sexo:</Form.Label>
          <Form.Select onChange={(e) => setSexo(e.target.value)}>
            <option selected disabled>Selecione uma opção</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label name="posicao">Posição:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("posição") ? "form-control is-invalid" : "form-control"
            }
            name="posição"
            value={posição}
            onChange={(e) => setPosição(e.target.value)}
          />
          <ErrorWrapper msg={hasError("posição")?.value} />
        </Col>
        <Col>
          <Form.Label name="email">E-mail:</Form.Label>
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
            Escreva corretamente seu e-mail
          </div>
        </Col>
        <Col>
          <Form.Label name="senha">Senha:</Form.Label>
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
            Escreva corretamente sua senha
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

export default Atleta;