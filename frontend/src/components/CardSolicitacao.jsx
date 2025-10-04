import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const CardSolicitacao = ({ solicitacao, onCancelar, onEditar, onFeedback }) => {
    const { id, quantidade_plastico, quantidade_metal, data_coleta, status } = solicitacao;
    
    return (
        <Card sx={{ mb: 2, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">#{id}</Typography>

        <Typography> {quantidade_plastico} kg de plástico</Typography>
        <Typography> {quantidade_metal} kg de metal</Typography>

        {status === "AGUARDANDO" && (
          <Typography color="text.secondary">
            Agendado para {new Date(data_coleta).toLocaleDateString()}
          </Typography>
        )}

        {status === "COLETADA" && (
          <Typography color="text.secondary">
            Coletado em {new Date(data_coleta).toLocaleDateString()}
          </Typography>
        )}

        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {status === "AGUARDANDO" && (
            <>
              <Button variant="contained" color="error" onClick={() => onCancelar(id)}>
                Cancelar
              </Button>
              <Button variant="contained" color="secondary" onClick={() => onEditar(id)}>
                Editar
              </Button>
            </>
          )}

          {status === "COLETADA" && (
            <Button variant="contained" color="primary" onClick={() => onFeedback(solicitacao)}>
              Feedback do coletor
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
export default CardSolicitacao;