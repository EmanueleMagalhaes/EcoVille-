import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});
// Busca as solicitações do usuário
export const getSolicitacoes = () => {
  return api.get('/solicitacoes');
};

// Cria uma nova solicitação
export const postSolicitacao = (data) => {
  return api.post("/solicitacoes", data);
};

// cancela uma solicitação existente
export const cancelarSolicitacao = (id) => {
  return api.put(`/solicitacoes/${id}/cancelar`);
};

export const editarSolicitacao = (id, data) => {
  return api.put(`/solicitacoes/${id}`, data);
};

export default api;