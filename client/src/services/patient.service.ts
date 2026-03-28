import type { IActualizarPersona, ICrearPaciente } from '@/types';
import api from './api';

// Crear paciente
export const createPatientRequest = async (data: ICrearPaciente) => {
  console.log(data);
  return api.post('/users/patient', data);
}

//Traer pacientes
export async function getPatients() {
  const response = await api.get('/users/patients');
  return response.data;
}

//Actualizar paciente
export const updatePatientRequest = async (idPersona: number,data: IActualizarPersona ) => {
  return api.put(`/users/patient/${idPersona}`, data);
};