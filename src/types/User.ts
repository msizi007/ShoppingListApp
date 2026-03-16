export interface User {
  id?: string;
  name: string;
  surname: string;
  cellNumber: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
