import React, { useState, useEffect } from 'react';
import './table.css';
import { Button, Table } from 'react-bootstrap';
import ExamesEnviados from '../ExamesEnviados';
import Axios from 'axios';

function AvalicacoesRecebidas({idMedico}) {

  let array_nomes = []
  let array_cpf = []
  let array_relacao = []
  let array_justificativa = []
  let array_id = []

  const [nomes, setNomes] = useState([])
  const [cpf, setCpf] = useState([])
  const [relacao, setRelacao] = useState([])
  const [justificativa, setJustificativa] = useState([])
  const [id, setId] = useState([])
  const [idTWO, setIdTWO] = useState('')
    
  const [validar, setValidar] = useState(false)

  useEffect(() => {
    Axios.get(`http://4.228.66.252:24/medico/solicited/${idMedico}`)
      .then((res) => {
        array_nomes = []
        array_id = []
        for (let x = 0; x < res.data.length; x++) {
          array_nomes.push(res['data'][x]['nome'])
          array_cpf.push(res['data'][x]['cpf'])
          array_relacao.push(res['data'][x]['situacao'])
          array_id.push(res['data'][x]['idatleta'])
        }
        setNomes(array_nomes)
        setCpf(array_cpf)
        setRelacao(array_relacao)
        setJustificativa(array_justificativa)
        setId(array_id)
      })
  }, [])


  
  return (
    <>
      {validar ? (<ExamesEnviados id={idTWO}/>) : (<>
        <Table responsive striped bordered hover >
          <thead>
            <tr className="bg-tabela text-white" >
              <th >Nome do Atleta:</th>
              <th>CPF:</th>
              <th>Relação:</th>
              <th>Justificativa:</th>
              <th>Exame:</th>
            </tr>
          </thead>
          <tbody>
           {nomes.map((n, index) => {
              return ( 
                <tr>
                  <td>{n}</td>
                  <td>{cpf[index]}</td>
                  <td>{relacao[index]}</td>
                  <td>{justificativa[index]}</td>
                  <td><Button variant="success" onClick={() => {
                    setValidar(true)
                    setIdTWO(`${id[index]}`)
                  }}>Visualizar</Button></td>
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

export default AvalicacoesRecebidas;