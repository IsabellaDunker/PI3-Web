import api from './api';

const get = () => api.get('/users');

const getById = (userId) => api.get(`/users/${userId}`);

export default {
  getById,
  get,
};
