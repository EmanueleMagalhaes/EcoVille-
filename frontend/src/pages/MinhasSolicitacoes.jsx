import React, { useEffect, useState } from "react";
import { getSolicitacoes, cancelarSolicitacao } from "../services/solicitacoesService";
import CardSolicitacao from "../components/CardSolicitacao";
import MenuSuperior from "../components/MenuSuperior";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalVerFeedback from "../components/ModalVerFeedback";

const MinhasSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadSolicitacoes();
  }, []);

  const loadSolicitacoes = async () => {
    try {
      const response = await getSolicitacoes();
      setSolicitacoes(invertLista(response.data));
    } catch (error) {
      console.error("Erro ao carregar solicitações:", error);
    }
  };

  function invertLista(lista){
    let array = [];
    for(let i = lista.length-1;i>-1;i=i-1){
      array.push(lista[i]);
    }

    return array;
  }

  const handleCancelar = async (id) => {
    try {
      await cancelarSolicitacao(id);
      loadSolicitacoes();
    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
    }
  };

  const handleEditar = (solicitacao) => {
    navigate("/solicitacao", { state: { solicitacao } });
  };

  const handleNovaSolicitacao = () => {
    navigate("/nova-solicitacao");
  };

  const handleVerFeedback = (solicitacao) => {
    setSelectedFeedback(solicitacao);
    setOpenModalFeedback(true);
  };

  const handleFecharFeedback = () => {
    setOpenModalFeedback(false);
    setSelectedFeedback(null);
  };

  return (
    <>
      <MenuSuperior />

      <Container sx={{ mt: 4, mb: 6 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={3}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            Minhas Solicitações
          </Typography>

          <Button
            onClick={handleNovaSolicitacao}
            sx={{
              flex: 1,
              padding: "8px 16px",
              maxWidth: { xs: "100%", sm: "150px" },
              display: "flex",
              border: "1px solid #8A784E",
              borderRadius: "26px",
              fontSize: "14px",
              color: "#E7EFC7",
              backgroundColor: "#8A784E",
              cursor: "pointer",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#6f623f",
              },
            }}
          >
            Novo
          </Button>
        </Box>

        <Grid container spacing={3}>
          {solicitacoes.length > 0 ? (
            solicitacoes.map((solicitacao) => (
              <Grid item xs={12} sm={6} md={4} key={solicitacao.id}>
                <CardSolicitacao
                solicitacao={solicitacao}
                onCancelar={handleCancelar}
                onEditar={handleEditar}
                onVerFeedback={handleVerFeedback} 
                />
              </Grid>
            ))
          ) : (
            <Typography color="text.secondary" sx={{ mt: 4 }}>
              Você ainda não possui solicitações registradas.
            </Typography>
          )}
        </Grid>

        {openModalFeedback && selectedFeedback && (
          <ModalVerFeedback
            open={openModalFeedback}
            handleClose={handleFecharFeedback}
            solicitacao={selectedFeedback}
          />
        )}
      </Container>
    </>
  );
};

export default MinhasSolicitacoes;
