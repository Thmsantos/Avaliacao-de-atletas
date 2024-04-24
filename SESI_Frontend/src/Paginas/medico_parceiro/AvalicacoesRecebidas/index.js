import React, {useEffect, useState} from 'react';
import './table.css';
import { Button, Table } from 'react-bootstrap';
import ExamesEnviados from '../ExamesEnviados'
import axios from 'axios';

function AvalicacoesRecebidas({ atleta }) {

  const [validar, setValidar] = useState(false)
  
  const [nomes, setNomes] = useState([])
  const [cpf, setCpf] = useState([])
  const [situacao, setSituacao] = useState([])
  const [index, setIndex] = useState('')


  useEffect(() => {
    axios.post('http://4.228.66.252:24/medicoConv/verAtletas', {
      atletas : atleta
    })
    .then((response) => response.data)
    .then((response) => {
      console.log(response)
      setNomes(response['nomes'])
      setSituacao(response['relacao'])
      setCpf(response['cpf'])
    })
  },[atleta])

  return (
    <>
      {validar ? (<ExamesEnviados atleta={index}/>) : (<>
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
        {nomes.map((nomes, index) => {
          return(
            <tr>
              <td>{nomes}</td>
              <td>{cpf[index]}</td>
              <td>{situacao[index]}</td>
              <td></td>
              <td><Button onClick={() => {
                setIndex(atleta[index])
                setValidar(true)
              }} variant='success'>Ver Exame</Button></td>
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