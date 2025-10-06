import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import CriarConta from "../pages/CriarConta";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-conta" element={<CriarConta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
