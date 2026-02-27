import type { ILogin, ILoginResponse } from '../types/auth';
import api from './api';

/**
 * @description Endpoint de conexión con el backend para el inicio de sesión
 * @param data Tiene la interfaz del login para tipar cada dato
 * @returns la respuesta de la conexión
 */
export const loginRequest = async (data: ILogin): Promise<ILoginResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data as ILoginResponse;
};

export const registerRequest = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
