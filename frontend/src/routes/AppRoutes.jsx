
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MinhaSolicitacoes from '../pages/MinhasSolicitacoes';
import Login from '../pages/Login';
import CriarConta from '../pages/CriarConta';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/solicitacoes" element={<MinhaSolicitacoes />} />
        <Route path="/criar-conta" element={<CriarConta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes