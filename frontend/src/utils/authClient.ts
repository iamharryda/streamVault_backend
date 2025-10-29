// Compact auth client that manages axios instances and refreshes token only on 401 errors.

import axios from "axios";
import * as storage from "@/src/utils/secureStoreUtil";
import { store } from "@/src/store/store";
import { setUser } from "@/src/store/slices/userSlice";

// Base URLs
const API_BASE = "http://localhost:5008/api/v1/auth";
const REFRESH_PATH = "/refresh-access-token"; 

export const publicReq = axios.create({ baseURL: API_BASE });
export const privateReq = axios.create({ baseURL: API_BASE });

// --- Refresh logic with simple concurrency lock ---
let isRefreshing = false;
let waitQueue: Array<(token: string | null, err?: any) => void> = [];

const enqueue = () =>
  new Promise<string | null>((res, rej) =>
    waitQueue.push((tok, err) => (err ? rej(err) : res(tok)))
  );

const flushQueue = (token: string | null, err?: any) => {
  waitQueue.forEach((cb) => cb(token, err));
  waitQueue = [];
};

// --- doRefresh(): calls backend refresh endpoint and saves new tokens ---
const doRefresh = async (): Promise<string> => {
  const refreshToken = await storage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  // backend expects refreshToken in body
  const resp = await publicReq.post(REFRESH_PATH, { refreshToken });
  const access = resp.data?.accessToken ?? resp.data?.token;
  const newRefresh = resp.data?.refreshToken;

  if (!access) throw new Error("Refresh response missing access token");

  await storage.setItem("accessToken", access);
  if (newRefresh) await storage.setItem("refreshToken", newRefresh);

  return access;
};

export const refreshToken = async (): Promise<string | null> => {
  if (isRefreshing) return enqueue();
  isRefreshing = true;

  try {
    const token = await doRefresh();
    flushQueue(token, null);
    return token;
  } catch (err) {
    flushQueue(null, err);
    // If refresh fails: clear stored tokens and reset Redux user state
    await storage.removeItem("accessToken");
    await storage.removeItem("refreshToken");
    store.dispatch(
      setUser({
        id: null,
        name: "Guest",
        username: "guest",
        avatar: null,
        userStats: { ratings: 0, reviews: 0, watchlist: 0, favorites: 0 },
        isLogined: false,
      })
    );
    throw err;
  } finally {
    isRefreshing = false;
  }
};

// --- Request interceptor: adds Authorization header if accessToken exists ---
privateReq.interceptors.request.use(
  async (cfg) => {
    try {
      const token = await storage.getItem("accessToken");
      if (token && cfg.headers) {
        cfg.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // do nothing on error to avoid blocking requests
    }
    return cfg;
  },
  (error) => Promise.reject(error)
);

// --- Response interceptor: if 401 -> try to refresh once, then retry original request ---
privateReq.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (!original) return Promise.reject(err);

    const status = err.response?.status;
    if (status === 401 && !original._retry) {
      original._retry = true;
      try {
        const token = await refreshToken();
        if (token) {
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${token}`;
        }
        return privateReq(original);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default {
  publicReq,
  privateReq,
  refreshToken,
};
