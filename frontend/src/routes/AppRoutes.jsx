
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MinhaSolicitacoes from '../pages/MinhasSolicitacoes';
import NovaSolicitacao from '../pages/NovaSolicitacao';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/solicitacoes" element={<MinhaSolicitacoes />} />
        <Route path="/nova-solicitacao" element={<NovaSolicitacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes