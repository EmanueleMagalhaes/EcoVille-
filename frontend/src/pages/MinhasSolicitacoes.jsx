import React, {useEffect, useState} from "react";
import { getSolicitacoes, cancelarSolicitacao } from "../services/solicitacoesService";
import CardSolicitacao from "../components/CardSolicitacao";
import MenuSuperior from "../components/MenuSuperior";
import ModalFeedback from "../components/ModalFeedback";
import { Container, Typography } from "@mui/material";


const MinhasSolicitacoes = () => {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);

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

    const handleEditar = (id) => {
        alert(`Editar solicitação ${id}`);
    };

    const handleFeedback = (solicitacao) => {
        setSelectedSolicitacao(solicitacao);
        setOpenModal(true);
    };

    return (
        <>
            <MenuSuperior />

            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Minhas Solicitações
                </Typography>
                {solicitacoes.map((solicitacao) => (
                    <CardSolicitacao
                        key={solicitacao.id}
                        solicitacao={solicitacao}
                        onCancelar={handleCancelar}
                        onEditar={handleEditar}
                        onFeedback={handleFeedback}
                    />
                ))}

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