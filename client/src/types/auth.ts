export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user?: {
    id: number;
    email: string;
    nombres: string;
  };
}