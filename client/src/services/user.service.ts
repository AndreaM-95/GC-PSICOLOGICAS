import type { ICrearAdmin, ICrearPaciente, ICrearProfesional, IPaciente, IProfesional } from '../types';
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
export async function getPatients(): Promise<IPaciente[]> {
  const response = await api.get<IPaciente[]>('/users/patients');
  return response.data;
}

// Crear administrativo
export const createAdminRequest = async (data: ICrearAdmin) => {
  return api.post('/users/admin', data);
}

// Crear profesional
export const createProfessionalRequest = async (data: ICrearProfesional) => {
  return api.post('/users/professional', data);
}

// Crear paciente
export const createPatientRequest = async (data: ICrearPaciente) => {
  return api.post('/users/patient', data);
}