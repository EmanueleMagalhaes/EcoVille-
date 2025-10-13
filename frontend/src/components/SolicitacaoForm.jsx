import React, {useState} from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import { postSolicitacao } from "../services/solicitacoesService";
import { useNavigate } from "react-router-dom";

const materiaisReciclaveis = [
  { tipo: "PLASTICO", imagem: "/src/assets/plastico.png" },
  { tipo: "METAL", imagem: "/src/assets/metal.png" },
  { tipo: "PAPEL", imagem: "/src/assets/papel.png" },
  { tipo: "VIDRO", imagem: "/src/assets/vidro.png" },
];

const SolicitacaoForm =  () => {
  const navigate = useNavigate();

      const [materiais, setMateriais] = useState(
    materiaisReciclaveis.map((m) => ({
      ...m,
      quantidade: 1,
      estado: "",
    }))
  );
  const [dataColeta, setDataColeta] = useState("");
  const [observacao, setObservacao] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleQuantidade = (index, delta) => {
    setMateriais((prev) =>
      prev.map((m, i) =>
        i === index
          ? { ...m, quantidade: Math.max(1, m.quantidade + delta) }
          : m
      )
    );
  };

  const handleEstado = (index, value) => {
    setMateriais((prev) =>
      prev.map((m, i) => (i === index ? { ...m, estado: value } : m))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const materiaisSelecionados = materiais
      .filter((m) => m.estado !== "")
      .map((m) => ({
        tipo: m.tipo,
        quantEstimada: m.quantidade,
        quantReal: m.quantidade,
        estado: m.estado,
      }));

    if (!dataColeta || materiaisSelecionados.length === 0) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const novaSolicitacao = {
      dataAgendada: dataColeta,
      observacoes: observacao,
      itensColeta: materiaisSelecionados
    };

    console.log(novaSolicitacao);
    try {
      setEnviando(true);
      await postSolicitacao(novaSolicitacao);
      alert("Solicitação cadastrada com sucesso!");
      navigate("/solicitacoes");
      setDataColeta("");
      setObservacao("");
      setMateriais(
        materiaisReciclaveis.map((m) => ({
          ...m,
          quantidade: 1,
          estado: "",
        }))
      );
    } catch (error) {
      alert("Erro ao cadastrar solicitação!");
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Vamos iniciar a sua coleta?
      </Typography>

      <Grid container spacing={2}>
        {materiais.map((material, index) => (
          <Grid item xs={12} sm={6} md={6} key={material.tipo}>
            <Card sx={{ p: 2, boxShadow: 3, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">{material.tipo}</Typography>
                <Box
                  component="img"
                  src={material.imagem}
                  alt={material.tipo}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    my: 1,
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <IconButton
                    onClick={() => handleQuantidade(index, -1)}
                    sx={{
                      border: "1px solid #ccc",
                      color: "#3B3B1A",
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={`${material.quantidade} KG`}
                    size="small"
                    inputProps={{
                      readOnly: true,
                      style: { textAlign: "center", width: "70px" },
                    }}
                  />
                  <IconButton
                    onClick={() => handleQuantidade(index, +1)}
                    sx={{
                      border: "1px solid #ccc",
                      color: "#3B3B1A",
                    }}
                  >
                    <Add />
                  </IconButton>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  Estado dos materiais
                </Typography>
                <RadioGroup
                  row
                  value={material.estado}
                  onChange={(e) => handleEstado(index, e.target.value)}
                  sx={{ justifyContent: "center" }}
                >
                  
                  <FormControlLabel value="RUIM" control={<Radio />} label="Ruim" />
                  <FormControlLabel value="BOM" control={<Radio />} label="Bom" />
                  <FormControlLabel value="OTIMO" control={<Radio />} label="Ótimo" />

                </RadioGroup>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Qual melhor dia para irmos buscar?
      </Typography>

      <TextField
        label="Data"
        type="date"
        fullWidth
        value={dataColeta}
        onChange={(e) => setDataColeta(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
        InputProps={{
          sx: {
            backgroundColor: "#fff",
          },
        }}

      />

      <TextField
        label="Observação"
        multiline
        rows={3}
        fullWidth
        value={observacao}
        onChange={(e) => setObservacao(e.target.value)}
        InputProps={{
          sx: {
            backgroundColor: "#fff",
          },
        }}

      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#3B3B1A",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#8A784E" },
          alignSelf: "center",
          mt: 2,
          px: 4,
        }}
        disabled={enviando}
      >
        {enviando ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </Box>
  );
};

export default SolicitacaoForm;