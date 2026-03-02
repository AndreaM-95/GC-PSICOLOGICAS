import type { ICrearAdmin, ICrearProfesional, IProfesional } from '@/types';
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

// Crear administrativo
export const createAdminRequest = async (data: ICrearAdmin) => {
  return api.post('/users/admin', data);
}

// Crear profesional
export const createProfessionalRequest = async (data: ICrearProfesional) => {
  return api.post('/users/professional', data);
}

//Desactivar a un usuario
export const deactivateUserRequest = async (idUser: number) => {
    return api.patch(`/users/patient/${idUser}`);
};