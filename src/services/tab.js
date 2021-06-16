import api from './api';

const get = () => api.get('/tabs');

const getById = (orderId) => api.get(`/tabs/${orderId}`);

const remove = (orderId) => api.delete(`/tabs/${orderId}`);

const create = (body) => api.post('/tabs', body);

const update = (body) => api.put(`/tabs/${body.id}`, body);

export default {
  getById,
  get,
  remove,
  create,
  update,
};
