import api from './api';

const get = () => api.get('/environments');

const getById = (environmentId) => api.get(`/environments/${environmentId}`);

const remove = (environmentId) => api.delete(`/environments/${environmentId}`);

const create = (body) => api.post('/environments', body);

const update = (body) => api.put(`/environments/${body.id}`, body);

export default {
  getById,
  get,
  remove,
  create,
  update,
};
