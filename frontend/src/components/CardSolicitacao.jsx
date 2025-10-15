import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink"; 
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"; 
import DescriptionIcon from "@mui/icons-material/Description"; 
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; 

const CardSolicitacao = ({ solicitacao, onCancelar, onEditar, onFeedback }) => {
  if (!solicitacao) return null;

  const {
    id,
    status = "AGUARDANDO",
    dataAgendada,
    dataSolicitacao,
    itensColeta = [],
  } = solicitacao;
    
  const formatarData = (data) => {
    if (!data) return "Data não informada";
    
    const [ano, mes, dia] = data.split("-");
    const dataLocal = new Date(ano, mes - 1, dia); 

    return dataLocal.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


  const calcularDiferencaDias = (data) => {
    if (!data) return "";
      
    const [ano, mes, dia] = data.split("-").map(Number); // extrai os números
    const coleta = new Date(ano, mes - 1, dia); // cria a data corretamente no fuso local
    coleta.setHours(0, 0, 0, 0); // zera horas

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // zera horas

    const diffMs = coleta - hoje;
    const diffDias = diffMs > 0
      ? Math.ceil(diffMs / (1000 * 60 * 60 * 24))
      : Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias === 0) return "Hoje";
    if (diffDias > 0) return `Daqui ${diffDias} dia${diffDias > 1 ? "s" : ""}`;
    return `Há ${Math.abs(diffDias)} dia${Math.abs(diffDias) > 1 ? "s" : ""}`;
  };



  const materiais = {
    PLASTICO: { label: "Plástico", icon: <LocalDrinkIcon sx={{ color: "#2196F3" }} /> },
    METAL: { label: "Metal", icon: <EmojiEventsIcon sx={{ color: "#FFD700" }} /> },
    VIDRO: { label: "Vidro", icon: <EmojiObjectsIcon sx={{ color: "#4CAF50" }} /> },
    PAPEL: { label: "Papel", icon: <DescriptionIcon sx={{ color: "#9C27B0" }} /> },
  };
    
  return (
    <Card sx={{ mb: 2, p: 2, boxShadow: 4, borderRadius: 3, backgroundColor: "#F9F9F9",}}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}>
        
          <Typography variant="h6" fontWeight="bold">Solicitação #{id}</Typography>

          <Typography variant="subtitle2"
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor:
                status === "AGUARDANDO"
                  ? "#FFF3CD"
                  : status === "COLETADA"
                  ? "#D4EDDA"
                  : "#F8D7DA",
              color:
                status === "AGUARDANDO"
                  ? "#856404"
                  : status === "COLETADA"
                  ? "#155724"
                  : "#721C24",
              fontWeight: 600,
            }}
          >
            {status}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1 }} />
        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
          {itensColeta.length > 0 ? (
            itensColeta.map((item) => {
              const tipo = materiais[item.tipo];
              return (
                <Box key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {tipo?.icon}
                  <Typography>
                    {item.quantEstimada || item.quantReal} kg de {tipo?.label?.toLowerCase()}
                  </Typography>
                </Box>
              );
            })
          ) : (
            <Typography color="text.secondary">Nenhum material informado</Typography>
          )}
        </Box>

        {/* Data */}
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {status === "AGUARDANDO"
            ? `Agendado para ${formatarData(dataAgendada)}`
            : status === "COLETADA"
            ? `Coletado em ${formatarData(dataAgendada)}`
            : `Solicitado em ${formatarData(dataSolicitacao)}`}
        </Typography>

          <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "#6c757d", mb: 2 }}
            >
              {calcularDiferencaDias(dataAgendada)}
          </Typography>
          

        {/* Botões */}
        <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {status === "AGUARDANDO" && (
            <>
              
<Button
                variant="contained"
                size="small"
                onClick={() => onCancelar?.(id)}
                sx={{
                  backgroundColor: "#AEC8A4",
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#96b48d",
                  },
                }}
              >
                Cancelar
              </Button>

              
              <Button
                variant="contained"
                size="small"
                onClick={() => onEditar?.(solicitacao)}
                sx={{
                  backgroundColor: "#E7EFC7",
                  color: "#3B3B1A",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#d4e3b0",
                  },
                }}
              >
                Editar
              </Button>
            </>
          )}


          {status === "COLETADA" && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onFeedback?.(solicitacao)}
              startIcon={<RecyclingIcon />}
            >
              Feedback do coletor
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardSolicitacao;