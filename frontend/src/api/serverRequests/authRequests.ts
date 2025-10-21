import { setUser } from "@/src/store/slices/userSlice";
import { store } from "@/src/store/store";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as storage from "@/src/utils/secureStoreUtil";

const API_URL = "http://localhost:5008/api/v1/auth";
// Public instance: no Authorization header added automatically
const publicAuthRequests = axios.create({
  baseURL: API_URL,
});

// Private instance: interceptor will add access token from SecureStore
const privateAuthRequests = axios.create({
  baseURL: API_URL,
});

privateAuthRequests.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ------------------ API FUNCTIONS ------------------

// Public endpoints (no token required)
export const registerInit = async (
  name: string,
  email: string,
  password: string,
  phoneNumber: string
) => {
  try {
    const response = await publicAuthRequests.post("/register/init", {
      name,
      email,
      password,
      phoneNumber,
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data || err.message;
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await publicAuthRequests.post("/register/verify", {
      email,
      otp,
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data || err.message;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await publicAuthRequests.post("/login", {
      email,
      password,
    });
    const loginData = response.data?.data;

    if (!loginData) {
      throw new Error("Login response missing data");
    }

    // Save tokens using platform-appropriate storage wrapper (localStorage on web, SecureStore on native)
    if (loginData.accessToken) {
      await storage.setItem("accessToken", loginData.accessToken);
    }
    if (loginData.user?.refreshToken) {
      await storage.setItem("refreshToken", loginData.user.refreshToken);
    }

    // update redux store for immediate UI updates
    store.dispatch(
      setUser({
        id: loginData.user.id,
        name: loginData.user.name,
        username: loginData.user.username,
        avatar: loginData.user.avatar,
        userStats: loginData.user.userStats,
        isLogined: true,
      })
    );

    return loginData;
  } catch (err: any) {
    // normalize error
    throw err?.response?.data ?? err?.message ?? err;
  }
};

// Protected endpoints (use private instance with interceptor)
export const getCurrentUser = async () => {
  try {
    const response = await privateAuthRequests.get("/me");
    return response.data;
  } catch (err: any) {
    throw err.response?.data || err.message;
  }
};
