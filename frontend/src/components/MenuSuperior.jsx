
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MenuSuperior = () => {
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const perfil = usuario?.perfil;

    const handleLogout = () => {
      localStorage.clear();
      navigate('/');
    };

    const navbar={
      backgroundColor: '#3B3B1A'
    }

    return (
    <AppBar position="static" elevation={2} sx={ navbar}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {perfil === "RESIDENCIAL" && (
            <Button color="inherit" onClick={() => navigate("/solicitacoes")}>
              Minhas Solicitações
            </Button>
          )}
          {perfil === "COLETOR" && (
            <Button color="inherit" onClick={() => navigate("/solicitacoes-coletor")}>
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
