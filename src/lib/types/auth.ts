export interface User {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export interface ExtendedUser extends User {
  password?: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}