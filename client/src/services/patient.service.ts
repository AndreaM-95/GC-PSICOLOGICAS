import type { IActualizarPersona, ICrearPaciente } from '@/types';
import api from './api';

// Crear paciente
export const createPatientRequest = async (data: ICrearPaciente) => {
  return api.post('/users/patient', data);
}

//Traer pacientes
export async function getPatients() {
  const response = await api.get('/users/patients');
  return response.data;
}

//Actualizar paciente
export const updatePatientRequest = async (idUser:number): Promise<IActualizarPersona> => {
    const response = await api.put<IActualizarPersona>(`/users/patient/${idUser}`);
    return response.data;
}
