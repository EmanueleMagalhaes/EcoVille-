import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/solicitacoes',
});

export const getSolicitacoes = () => {
  return api.get('/solicitacoes');
};

export const cancelarSolicitacao = (id) => {
  return api.put(`/solicitacoes/${id}/cancelar`);
};

export const editarSolicitacao = (id, data) => {
  return api.put(`/solicitacoes/${id}`, data);
};