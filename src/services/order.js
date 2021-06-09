import api from './api';

const get = () => api.get('/orders');

const getById = (orderId) => api.get(`/orders/${orderId}`);

const remove = (orderId) => api.delete(`/orders/${orderId}`);

const create = (body) => api.post('/orders', body);

const update = (body) => api.put(`/orders/${body.id}`, body);

export default {
  getById,
  get,
  remove,
  create,
  update,
};
