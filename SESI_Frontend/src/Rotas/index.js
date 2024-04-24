import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Paginas/login";
import Redefinir from "../Paginas/login/Redefinir";
import PageNotFound from "../Paginas/404";
import Medico from "../Paginas/medico";
import Gestor from "../Paginas/gestor";
import MedicoParceiro from "../Paginas/medico_parceiro";
import Telas from '../Paginas/atleta/Telas/telas'

const Rotas = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/atleta/:email" element={<Telas />} />
      <Route exact path="/redefinir" element={<Redefinir />} />
      <Route path="*" element={<PageNotFound />} />
      <Route exact path="/medico/:email" element={<Medico />} />
      <Route exact path="/gestor/:email" element={<Gestor />} />
      <Route exact path="/medico-convidado/:email" element={<MedicoParceiro />} />
    </Routes>
  </BrowserRouter>
);

export default Rotas;
