
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MenuSuperior = () => {
    const navigate = useNavigate();

    const perfil = localStorage.getItem('perfil'); // "Resid" ou "coletor"

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
    <AppBar position="static" sx={{ bgcolor: "#3B3B1A" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {perfil === "RESIDENCIAL" && (
            <Button color="inherit" onClick={() => navigate("/solicitacoes")}>
              Minhas Solicitações
            </Button>
          )}
          {perfil === "COLETOR" && (
            <Button color="inherit" onClick={() => navigate("/coletas")}>
              Solicitações
            </Button>
          )}
        </Box>

        <Button color="inherit" onClick={handleLogout}>
          Sair
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default MenuSuperior;
