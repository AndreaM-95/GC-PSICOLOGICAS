import type { IPaciente, IProfesional } from '../types';
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
export async function getProfessionals(): Promise<IProfesional[]> {
  const response = await api.get<IProfesional[]>('/users/professionals');
  return response.data;
};

//Traer pacientes
//IPaciente
export async function getPatients(): Promise<IPaciente[]> {
  const response = await api.get<IPaciente[]>('/users/patients');
  return response.data;
}

