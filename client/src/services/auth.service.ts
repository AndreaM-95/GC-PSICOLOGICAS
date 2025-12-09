import type { ILogin, ILoginResponse } from '../types/auth';
import api from './api';

export const loginRequest = async (data: ILogin): Promise<ILoginResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data as ILoginResponse;
};

export const registerRequest = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
