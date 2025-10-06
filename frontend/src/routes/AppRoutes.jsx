
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MinhaSolicitacoes from '../pages/MinhasSolicitacoes';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/solicitacoes" element={<MinhaSolicitacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes