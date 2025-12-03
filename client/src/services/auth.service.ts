import api from './api';

export interface LoginDTO {
  email: string;
  password: string;
}

export const loginRequest = async (data: LoginDTO) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const registerRequest = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
