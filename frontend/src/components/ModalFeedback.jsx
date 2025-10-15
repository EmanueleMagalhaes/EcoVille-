import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { enviarFeedback } from '../services/api'; 

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  width: { xs: "90%", sm: 400 },
};

const ModalFeedback = ({ open, handleClose, solicitacao, onFeedbackEnviado }) => {
  const [novoFeedback, setNovoFeedback] = useState('');

  if (!solicitacao) return null;

  const handleEnviar = async () => {
    try {
      await enviarFeedback(solicitacao.id, novoFeedback);
      onFeedbackEnviado(); 
      handleClose();
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">#{solicitacao.id}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography sx={{ mt: 2 }}>
          <strong>Feedback atual:</strong> {solicitacao.feedback || "Nenhum feedback ainda."}
        </Typography>

        <TextField
          label="Novo feedback"
          multiline
          rows={3}
          fullWidth
          sx={{ mt: 2 }}
          value={novoFeedback}
          onChange={(e) => setNovoFeedback(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleEnviar}
        >
          Enviar Feedback
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalFeedback;