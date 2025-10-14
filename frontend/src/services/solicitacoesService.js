import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/coletas',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Busca as solicitações do usuário
export const getSolicitacoes = () => {
  const usuarioData = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuarioData.id;

  return api.get(`/minhas`, {
    params: { usuarioId }
  });

};

// Cria uma nova solicitação
export const postSolicitacao = (data) => {
  
const usuarioData = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuarioData.id;

  return api.post('', data, {
    params: { usuarioId }
  });

};

// cancela uma solicitação existente
export const cancelarSolicitacao = (id) => {
  const usuarioData = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuarioData.id;

  return api.patch(`/${id}/cancelar`, null, {
    params: { usuarioId }
  });

};

export const editarSolicitacao = (id, data) => {
  
const usuarioData = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuarioData.id;

  return api.put(`/minhas`, {...data, id }, {
    params: { usuarioId }
  });

};

export default api;