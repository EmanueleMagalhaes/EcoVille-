import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const CardSolicitacao = ({ solicitacao, onCancelar, onEditar, onVerFeedback }) => {

  const calcularDiferencaDias = (data, status) => {
    if (!data) return "";

     if (status === "COLETADAS") return "";

    if (status === "FINALIZADA") return "";

    const dataLimpa = data.includes("T") ? data.split("T")[0] : data;
    const [ano, mes, dia] = dataLimpa.split("-").map(Number);

    const coleta = new Date(ano, mes - 1, dia);
    coleta.setHours(0, 0, 0, 0);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const diffMs = coleta - hoje;
    let diffDias =
      diffMs > 0
        ? Math.ceil(diffMs / (1000 * 60 * 60 * 24))
        : Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (status === "CANCELADA") {
      diffDias = Math.abs(diffDias);
      return `Há ${diffDias} dia${diffDias !== 1 ? "s" : ""}`;
    }

    if (status === "AGUARDANDO" && diffDias < 0) {
      return `Há ${Math.abs(diffDias)} dia${Math.abs(diffDias) !== 1 ? "s" : ""}`;
    }

    if (diffDias === 0) return "Hoje";
    if (diffDias > 0) return `Daqui ${diffDias} dia${diffDias > 1 ? "s" : ""}`;
    return `Há ${Math.abs(diffDias)} dia${Math.abs(diffDias) > 1 ? "s" : ""}`;
  };



  const diferencaDias = calcularDiferencaDias(
    solicitacao.dataAgendada || solicitacao.dataColeta,
    solicitacao.status
  );

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

        <Typography variant="h6" fontWeight="bold">
          Solicitação #{solicitacao.id}
        </Typography>


        {(solicitacao.dataAgendada || solicitacao.dataColeta) && (
          <Box mt={1}>
            <Typography variant="body2" color="text.primary">
              {solicitacao.status === "FINALIZADA"
                ? "Coletado em"
                : solicitacao.status === "CANCELADA"
                ? "Agendado para"
                : "Agendado para"}{" "}
              {new Date(
                solicitacao.dataAgendada || solicitacao.dataColeta
              ).toLocaleDateString("pt-BR")}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                textAlign: "right",
                mt: 0.5,
                fontStyle: "italic",
              }}
            >
              {diferencaDias}
            </Typography>
          </Box>
        )}

        <Box mt={2}>
          <Typography variant="subtitle2" fontWeight="bold">
            Itens da Coleta:
          </Typography>

          {solicitacao.itensColeta && solicitacao.itensColeta.length > 0 ? (
            solicitacao.itensColeta.map((item, index) => (
              <Typography key={index} variant="body2">
                • {item.quantEstimada || "?"} kg de{" "}
                {item.tipo?.toLowerCase() || "material"}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhum item informado.
            </Typography>
          )}
        </Box>

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
