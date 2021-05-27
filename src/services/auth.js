import api from './api';

const login = async (cpf, password) => {
  const { data } = await api.post('/login', { cpf, password });

  const { token, user } = data;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  api.defaults.headers['x-access-token'] = token;

  const response = {
    auth: data.auth,
    user: data.user,
  };
  return response;
};

export default {
  login,
};
