export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: string[];
  permissions?: string[];
}

export interface Token {
  [prop: string]: any;

  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
  exp?: number;
  refreshToken?: string;
}
