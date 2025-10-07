import React from 'react';
import MenuSuperior from '../components/MenuSuperior';
import SolicitacaoForm from '../components/SolicitacaoForm';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B3B1A", // Verde escuro EcoVille
    },
    secondary: {
      main: "#C242F2", // Roxo EcoVille
    },
    background: {
      default: "#F5F5F5",
    },
    text: {
      primary: "#333",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: {
      fontWeight: 600,
      color: "#3B3B1A",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: "bold",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
});
const NovaSolicitacao = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <MenuSuperior />
        <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
          <SolicitacaoForm />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default NovaSolicitacao;