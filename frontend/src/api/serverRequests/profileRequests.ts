// src/api/userApi.ts
import { IUserUpdate } from "@/src/types/interfaces/iUser";
import authClient from "@/src/utils/authClient";

const { privateReq } = authClient;

const API_URL = "http://localhost:5008/api/v1/user";

// ------------------ API ------------------
export const getUserById = async (id: string) => {
  const response = await privateReq.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: IUserUpdate) => {
  try {
    const response = await privateReq.put(`${API_URL}/${id}`, data);
    return response.data
  } catch (error) {
    console.error("updateUser error:", error);
    throw error;
  }
};

export const uploadAvatar = async (userId: string, formData: FormData) => {
  try {
    const response = await privateReq.post(`${API_URL}/upload-avatar/${userId}`, formData);
    return response.data.profileImage;
  } catch (error) {
    console.error("updateAvatar error:", error);
    throw error;
  }
};

export const updateAvatar = async (id: string, formData: FormData) => {
  try {
    const response = await privateReq.put(`${API_URL}/upload-avatar/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("updateAvatar error:", error);
    throw error;
  }
};

export const deleteAvatar = async (id: string) => {
  try {
    const response = await privateReq.delete(`${API_URL}/upload-avatar/${id}`);
    return response.data
  } catch (error) {
    console.error("deleteAvatar error:", error);
    throw error;
  }
};
