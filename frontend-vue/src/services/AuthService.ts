import type {
  ApiResponse,
  UserLoginPayload,
  UserRegisterPayload,
} from "@/types";
import axios from "axios";

const baseURL = "http://localhost:5000";
export const AuthService = {
  async register(user: UserRegisterPayload) {
    const response = await axios.post(`${baseURL}/api/auth/signup`, user);
    return response.data;
  },
  async login(user: UserLoginPayload): Promise<ApiResponse> {
    const response = await axios.post<ApiResponse>(
      `${baseURL}/api/auth/signin`,
      user
    );
    return response.data;
  },
};
