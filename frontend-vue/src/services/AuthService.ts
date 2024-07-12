import type { ApiResponse, UserLoginPayload } from "@/types";
import axios from "axios";

const baseURL = "http://localhost:5000";
export const AuthService = {
  async login(user: UserLoginPayload): Promise<ApiResponse> {
    const response = await axios.post<ApiResponse>(
      `${baseURL}/api/auth/signin`,
      user
    );
    return response.data;
  },
};
