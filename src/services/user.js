import api from './api';

const getById = (userId) => api.get(`/user/${userId}`);

export default {
  getById,
};
