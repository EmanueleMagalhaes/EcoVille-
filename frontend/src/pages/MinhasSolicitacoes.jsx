import React, {useEffect, useState} from "react";
import { getSolicitacoes, cancelarSolicitacao } from "../services/solicitacoesService";
import CardSolicitacao from "../components/CardSolicitacao";
import MenuSuperior from "../components/MenuSuperior";
import ModalFeedback from "../components/ModalFeedback";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";


const MinhasSolicitacoes = () => {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadSolicitacoes();
    }, []);

    const loadSolicitacoes = async () => {
        try {
            const response = await getSolicitacoes();
            setSolicitacoes(response.data);
        } catch (error) {
            console.error("Erro ao carregar solicitações:", error);
        }
    };

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

    const handleFeedback = (solicitacao) => {
        setSelectedSolicitacao(solicitacao);
        setOpenModal(true);
    };

      const handleNovaSolicitacao = () => {
    navigate("/nova-solicitacao");
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
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleNovaSolicitacao}
                    sx={{
                    backgroundColor: "#5B4BFF",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    "&:hover": {
                        backgroundColor: "#483AE2",
                    },
                    }}
                >
                    Novo
                </Button>
                </Box>

                {/* Cards de solicitações */}
                <Grid container spacing={3}>
                {solicitacoes.length > 0 ? (
                    solicitacoes.map((solicitacao) => (
                    <Grid item xs={12} sm={6} md={4} key={solicitacao.id}>
                        <CardSolicitacao
                        solicitacao={solicitacao}
                        onCancelar={handleCancelar}
                        onEditar={handleEditar}
                        onFeedback={handleFeedback}
                        />
                    </Grid>
                    ))
                ) : (
                    <Typography color="text.secondary" sx={{ mt: 4 }}>
                    Você ainda não possui solicitações registradas.
                    </Typography>
                )}
                </Grid>

            <ModalFeedback
                open={openModal}
                handleClose={() => setOpenModal(false)}
                solicitacao={selectedSolicitacao}
            />
            </Container>
        </>
    );
};

export default MinhasSolicitacoes;