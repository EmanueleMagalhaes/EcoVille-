
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MinhaSolicitacoes from '../pages/MinhasSolicitacoes';
import NovaSolicitacao from '../pages/NovaSolicitacao';
import Login from '../pages/Login';
import CriarConta from '../pages/CriarConta';
import SolicitacoesColetor from '../pages/SolicitacoesColetor';
import { useState } from 'react';
import SolicitacaoForm from '../components/SolicitacaoForm';





function AppRoutes() {

  const [usuario, setUsuario] = useState({});


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/solicitacoes" element={<MinhaSolicitacoes />} />
        <Route path="/nova-solicitacao" element={<NovaSolicitacao />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/solicitacoes-coletor" element={<SolicitacoesColetor />} />
        <Route path="/editar-solicitacao" element={<NovaSolicitacao />} />
        <Route path="/solicitacao" element={<SolicitacaoForm />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes