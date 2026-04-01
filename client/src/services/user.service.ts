import type { IActualizarAdmin, IActualizarProfesional, ICrearAdmin, ICrearProfesional, IProfesional } from '@/types';
import api from './api';

// Obtener perfil del usuario autenticado
export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// ----- CRUD ADMINISTRATIVO -----
// Crear
export const createAdminRequest = async (data: ICrearAdmin) => {
  return api.post('/users/admin', data);
}

// Listar
export const getAdmins = async () => {
  const response = await api.get('/users/administrators');
  return response.data;
};

// Editar
export const updateAdminRequest = async (idUser: number, data: IActualizarAdmin) => {
  return api.put(`/users/admin/${idUser}`, data);
};

// ----- CRUD PROFESIONAL -----
// Crear
export const createProfessionalRequest = async (data: ICrearProfesional) => {
  return api.post('/users/professional', data);
}

// Listar
export async function getProfessionals(): Promise<IProfesional[]> {
  const response = await api.get<IProfesional[]>('/users/professionals');
  return response.data;
};

// Editar
export const updateProfessionalRequest = async (idUser: number, data: IActualizarProfesional) => {
  return api.put(`/users/professional/${idUser}`, data);
}

// ----- Desactivar administrativo o profesional ----
export const deactivateUserRequest = async (idUser: number) => {
    return api.patch(`/users/user/${idUser}`);
};