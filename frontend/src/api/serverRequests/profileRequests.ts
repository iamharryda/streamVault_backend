import { IUserUpdate } from "@/src/types/interfaces/iUser";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const API_URL = "http://localhost:5008/api/v1/user";

const serverRequests = axios.create({
  baseURL: API_URL,
});

serverRequests.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ------------------ API ------------------
export const getUserById = async (id: string) => {
  const response = await serverRequests.get(`/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: IUserUpdate) => {
  try {
    const response = await serverRequests.put(`/${id}`, data);
    return response.statusText;
  } catch (error) {
    return error || "Error";
  }
};
export const uploadAvatar = async (id: string, avatar: string) => {
  try {
    const response = await serverRequests.post(`/upload-avatar/${id}`, avatar);
    return response.statusText;
  } catch (error) {
    return error || "Error";
  }
};

export const updateAvatar = async (id: string, avatar: string) => {
  try {
    const response = await serverRequests.put(`/upload-avatar/${id}`, avatar);
    return response.statusText;
  } catch (error) {
    return error || "Error";
  }
};

export const deleteAvatar = async (id: string) => {
  try {
    const response = await serverRequests.delete(`/upload-avatar/${id}`);
    return response.statusText;
  } catch (error) {
    return error || "Error";
  }
};
