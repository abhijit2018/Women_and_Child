import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getStoredToken,
  verifyTokenApi,
  resultTokenApi,
} from "./api/splashApi";

import {
  InitializeAppResponse,
  VerifyTokenRequest,
} from "./splashTypes";

const API_URL = "OV55730246152698500000";
const API_KEY = "OV553694200126157895642258966622555";

class SplashService {
  /**
   * Initialize Application
   */
  async initialize(): Promise<InitializeAppResponse> {
    try {
      /**
       * Get token from AsyncStorage
       */
      const token = await getStoredToken();

      if (!token) {
        return {
          isAuthenticated: false,
          user: null,
        };
      }

      /**
       * Verify Token
       */
      const verifyPayload: VerifyTokenRequest = {
        api_url: API_URL,
        api_key: API_KEY,
        tok_one: token,
      };

      const verifyResponse =
        await verifyTokenApi(verifyPayload);

      if (!verifyResponse.success) {
        await AsyncStorage.removeItem("token");

        return {
          isAuthenticated: false,
          user: null,
        };
      }

      /**
       * Result Token
       */
      const resultResponse =
        await resultTokenApi(
          {
            collection_name:
              verifyResponse.collection_name,
          },
          verifyResponse.token
        );

      return {
        isAuthenticated: true,
        user: resultResponse.data,
      };
    } catch (error) {
      console.log(
        "SplashService Error:",
        error
      );

      await AsyncStorage.removeItem("token");

      return {
        isAuthenticated: false,
        user: null,
      };
    }
  }

  /**
   * Logout
   */
  async logout() {
    await AsyncStorage.removeItem("token");
  }
}

export default new SplashService();