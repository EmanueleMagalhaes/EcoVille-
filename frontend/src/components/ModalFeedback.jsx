import React from 'react';
import {Modal, Box, Typography, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

const ModalFeedback = ({ open, handleClose, solicitacao }) => {
    if (!solicitacao) return null;

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">#{solicitacao.id}</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
            </Box>

        <Typography sx={{ mt: 2 }}>{solicitacao.feedback}</Typography>
      </Box>
    </Modal>
  );
};

export default ModalFeedback;