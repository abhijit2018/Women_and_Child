import authApi from "./api/authApi";
import { ENDPOINTS } from "../../api/endpoints";

import {
  LoginRequest,
  LoginResponse,
} from "./authTypes";

class AuthService {
  async login(
    payload: LoginRequest
  ): Promise<LoginResponse> {
    const response = await authApi.post(
      ENDPOINTS.LOGIN,
      payload
    );

    return response.data;
  }
}

export default new AuthService();