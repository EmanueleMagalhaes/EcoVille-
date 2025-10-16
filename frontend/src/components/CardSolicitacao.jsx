import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const CardSolicitacao = ({ solicitacao, onCancelar, onEditar, onVerFeedback }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <Card
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Solicitação #{solicitacao.id}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            backgroundColor:
              solicitacao.status === "FINALIZADA"
                ? "#d4edda"
                : solicitacao.status === "CANCELADA"
                ? "#f8d7da"
                : "#fff3cd",
            color:
              solicitacao.status === "FINALIZADA"
                ? "#155724"
                : solicitacao.status === "CANCELADA"
                ? "#721c24"
                : "#856404",
            borderRadius: "8px",
            px: 1,
            py: 0.3,
            fontWeight: "bold",
            ml: 1,
          }}
        >
          {solicitacao.status}
        </Typography>

        <Typography variant="body2" mt={2}>
          🏆 {solicitacao.itensColeta?.[0]?.quantEstimada || "?"} kg de{" "}
          {solicitacao.itensColeta?.[0]?.tipo?.toLowerCase() || "material"}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Solicitado em{" "}
          {solicitacao.dataSolicitacao
            ? new Date(solicitacao.dataSolicitacao).toLocaleDateString("pt-BR")
            : "Data inválida"}
        </Typography>

        <Box mt={2} display="flex" flexDirection="column" gap={1}>

          {solicitacao.status === "AGUARDANDO" && (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8A784E",
                  "&:hover": { backgroundColor: "#6f623f" },
                }}
                onClick={() => onEditar(solicitacao)}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onCancelar(solicitacao.id)}
              >
                Cancelar
              </Button>
            </>
          )}

          {solicitacao.status === "FINALIZADA" &&
            solicitacao.feedback &&
            solicitacao.feedback.trim() !== "" && (
              <Button
                variant="outlined"
                onClick={() => onVerFeedback(solicitacao)}
                sx={{
                  borderColor: "#8A784E",
                  color: "#8A784E",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#f5f3eb" },
                }}
              >
                Ver Feedback
              </Button>
            )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardSolicitacao;
