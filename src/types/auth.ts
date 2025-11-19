export interface AuthRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  user: UserDTO | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authRequest: AuthRequest) => Promise<void>;
  logout: () => void;
}

export interface JwtPayload {
  sub: string;
  id: number;
  name: string;
}