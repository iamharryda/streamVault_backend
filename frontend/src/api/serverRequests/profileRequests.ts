import { IUserUpdate } from "@/src/types/interfaces/iUser";
import axios from "axios";
import * as storage from "@/src/utils/secureStoreUtil"; 

const API_URL = "http://localhost:5008/api/v1/user";

// Create axios instance
const serverRequests = axios.create({
  baseURL: API_URL,
});

// --- Attach access token automatically from storage ---
serverRequests.interceptors.request.use(async (config) => {
  try {
    const accessToken = await storage.getItem("accessToken"); 
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (err) {
    console.warn("[profileRequests] failed to load access token", err);
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
    console.warn("[updateUser] failed", error);
    return error || "Error";
  }
};

export const uploadAvatar = async (id: string, avatar: string) => {
  try {
    const response = await serverRequests.post(`/upload-avatar/${id}`, avatar);
    return response.statusText;
  } catch (error) {
    console.warn("[uploadAvatar] failed", error);
    return error || "Error";
  }
};

export const updateAvatar = async (id: string, avatar: string) => {
  try {
    const response = await serverRequests.put(`/upload-avatar/${id}`, avatar);
    return response.statusText;
  } catch (error) {
    console.warn("[updateAvatar] failed", error);
    return error || "Error";
  }
};

export const deleteAvatar = async (id: string) => {
  try {
    const response = await serverRequests.delete(`/upload-avatar/${id}`);
    return response.statusText;
  } catch (error) {
    console.warn("[deleteAvatar] failed", error);
    return error || "Error";
  }
};
