import React, { useState, useEffect } from "react";
import "./table.css";
import { Button, Table, Form } from "react-bootstrap";
import SolicitarExame from "../SolicitarExame";
import Axios from "axios"

let array_nomes = []
let array_cpf = []

function AvalicacoesPendentes({idMedico}) {


  const [listaNomes, setListaNomes] = useState([])
  const [listaCpf, setListaCpf] = useState([])

  const [cpfSolicited, setCpfSolicited] = useState('')

  const [solicitar, setSoliticar] = useState(false)

  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")

  useEffect(() => {
    Axios.get(`http://4.228.66.252:24/medico/pending/${idMedico}`)
      .then((res) => {
        array_nomes = []
        array_cpf = []
        for (let x = 0; x < res.data.length; x++) {
          array_nomes.push(res['data'][x]['nome'])
          array_cpf.push(res['data'][x]['cpf'])
        }
        setListaNomes(array_nomes)
        setListaCpf(array_cpf)
      })

  }, [idMedico])

  const [aparecerBusca, setAparecerBusca] = useState('none')


  const [buscar_cpf, setBuscarcpf] = useState("")

  function chamar_nome(){
    let found_cpf = array_cpf.find(element => element === buscar_cpf);
    setCpf(found_cpf)
    let found_nome = array_cpf.indexOf(found_cpf);
    setNome(array_nomes[found_nome])
    setAparecerBusca('')
  }

  return (
    <>
      {solicitar ? (<SolicitarExame cpfSolicited={cpfSolicited}/>) : (<>
        <Form.Group className="w-25 form mb-3" controlId="formBasicEmail">
          <Form.Label>Nome:</Form.Label>
          <div className="d-flex">
            <Form.Control className="buscar mx-1" type="text" placeholder="" onChange={(e) => setBuscarcpf(e.target.value)} />
            <Button variant="success" size="sm" onClick={chamar_nome}>Buscar</Button>
          </div>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Table striped bordered hover>
          <thead>
            <tr className="bg-tabela text-white">
              <th>CPF:</th>
              <th>Nome do Atleta:</th>
              <th>Solicitar:</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ display: aparecerBusca}}>
              <td>{cpf}</td>
              <td>{nome}</td>
              <td>
              <Button style={{ display: aparecerBusca}} variant="success" size="sm" onClick={setSoliticar}>
                Solicitar
              </Button>
              </td>
            </tr>
            {listaNomes.map((n, index) => {
              return (
                <tr>
                  <td>{listaCpf[index]}</td>
                  <td>{n}</td>
                  <td>
                    <Button cpf={listaCpf[index]} variant="success" size="sm" onClick={() => {
                      setCpfSolicited(listaCpf[index])
                      setSoliticar(true)
                    }}>
                      Solicitar
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </>)
      }
    </>
  );
}

export default AvalicacoesPendentes;