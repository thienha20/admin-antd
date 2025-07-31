export interface User {
  userId?: bigint;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export interface Login {
  email: string;
  password: string;
}