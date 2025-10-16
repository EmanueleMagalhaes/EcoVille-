import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ModalVerFeedback = ({ open, handleClose, solicitacao }) => {
  if (!solicitacao) return null;

  const nomeColetor = solicitacao.coletor?.nomeUsuario || "Coletor não identificado";
  const dataFinalizacao = solicitacao.dataAgendada
    ? new Date(solicitacao.dataAgendada).toLocaleDateString("pt-BR")
    : "Data não informada";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Feedback da Coleta #{solicitacao.id}
        </Typography>

        <Typography variant="body2" mb={1}>
          <strong>Coletor:</strong> {nomeColetor}
        </Typography>

        <Typography variant="body2" mb={2}>
          <strong>Data da coleta:</strong> {dataFinalizacao}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-line",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            p: 2,
            minHeight: "100px",
            border: "1px solid #ddd",
          }}
        >
          {solicitacao.feedback?.trim()
            ? solicitacao.feedback
            : "Nenhum feedback disponível."}
        </Typography>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#8A784E",
              "&:hover": { backgroundColor: "#6f623f" },
            }}
          >
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalVerFeedback;
