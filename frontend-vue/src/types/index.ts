export interface UserRegisterPayload {
  name: string;
  username: string;
  password: string;
}

export interface UserLoginPayload {
  username: string;
  password: string;
}
export interface ApiResponse {
  success: boolean;
  data: {
    user: UserResponse;
    token: string;
  };
}

export interface UserResponse {
  id: string;
  name: string;
  username: string;
}
