import React, { useState } from "react";
import { Formulario } from "../../../../componentes/Style/Formularios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import ErrorWrapper from "../../errors";
import { toast } from "react-toastify";

const Atleta = (props) => {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [cargo, setCargo] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [posição, setPosição] = useState("");
  const [email, setEmail] = useState("");
  
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [sexo, setSexo] = useState('');
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
    axios.post("http://4.228.66.252:24/listarAtleta",{
      cpf: cpf,
    })
    .then((res) => {
      setNome(res.data.nome)
      setModalidade(res.data.modalidade)
      setCargo(res.data.cargo)
      setCategoria(res.data.categoria)
      setEmail(res.data.email)
      setPosição(res.data.posicao)
      setNascimento(res.data.d_nasc)
      setSexo(res.data.sexo)
      toast.info("Atualize os campos desejados!")
      setDisabled(false)
    })
    .catch((err) => {
      toast.error("Atleta não encontrado!")
      setNome("")
      setModalidade("")
      setCargo("")
      setCategoria("")
      setEmail("")
      setPosição("")
      setNascimento("")
      setSexo("")
      setDisabled(true)
    })
  }

  const alterar = () => {
    axios.put('http://4.228.66.252:24/alterar',{
      cpf: cpf,
      nome: nome,
      modalidade: modalidade,
      cargo: cargo,
      categoria: categoria,
      email: email,
      posicao: posição,
      d_nasc: nascimento,
      sexo: sexo
    })
    .then((res) => {
      toast.success('Atleta atualizado com sucesso!')
    })
    .catch((err) => {
      toast.error('Não foi possível atualizar o atleta!')
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
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("nome")
                ? "form-control is-invalid"
                : "form-control"
            }
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <ErrorWrapper msg={hasError("nome")?.value} />
        </Col>
        <Col>
          <Form.Label>Cargo:</Form.Label>
          <Form.Control
            autoComplete="off"
            className={
              hasError("cargo") ? "form-control is-invalid" : "form-control"
            }
            name="cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
          <ErrorWrapper msg={hasError("cargo")?.value} />
        </Col>
        <Col>
          <Form.Label>Data de nascimento:</Form.Label>
          <Form.Control
            tipo="text"
            label="Data de nascimento"
            name="Data de nascimento"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Label>Modalidade:</Form.Label>
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
          <Form.Label>Sexo:</Form.Label>
          <Form.Select 
            name="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option selected disabled value="">Selecione uma opção</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>Posição:</Form.Label>
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
            Escreva corretamente seu e-mail
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

export default Atleta;
