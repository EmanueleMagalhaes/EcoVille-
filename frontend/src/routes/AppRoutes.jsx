
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MinhaSolicitacoes from '../pages/MinhasSolicitacoes';
import Login from '../pages/Login';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/solicitacoes" element={<MinhaSolicitacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes