import api from './api';

export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

//Traer administrativos
export const getAdmins = async () => {
  const response = await api.get('/users/administrators');
  return response.data;
};

//Traer profesionales
export const getProfessionals = async () => {
  const response = await api.get('/users/professionals');
  return response.data;
};

//Traer pacientes
export const getPatients = async () => {
  const response = await api.get('/users/patients');
  return response.data;
};
