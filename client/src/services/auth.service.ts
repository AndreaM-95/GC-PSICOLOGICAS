import type { ILogin } from '../types/auth';
import api from './api';

export const loginRequest = async (data: ILogin) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const registerRequest = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
