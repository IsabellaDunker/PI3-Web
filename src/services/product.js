import api from './api';

const get = () => api.get('/products');

const getById = (productId) => api.get(`/products/${productId}`);

const remove = (productId) => api.delete(`/products/${productId}`);

const create = (body) => api.post('/products', body);

const update = (body) => api.put(`/products/${body.id}`, body);

export default {
  getById,
  get,
  remove,
  create,
  update,
};
