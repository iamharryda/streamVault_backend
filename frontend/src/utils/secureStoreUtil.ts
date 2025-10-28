// src/utils/secureStoreUtil
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

/**
 * Universal storage wrapper for Expo:
 * - native (iOS/Android): expo-secure-store
 * - web: window.localStorage
 * - fallback: in-memory Map
 */

const inMemory = new Map<string, string>();

function isWeb(): boolean {
  return Platform.OS === "web";
}

export async function setItem(key: string, value: string): Promise<void> {
  try {
    if (isWeb()) {
      if (typeof window !== "undefined" && window.localStorage) {
        // localStorage is synchronous — wrap in a Promise for a consistent async API
        window.localStorage.setItem(key, value);
        return;
      } else {
        // fallback to in-memory storage
        inMemory.set(key, value);
        return;
      }
    } else {
      // native (expo-secure-store)
      await SecureStore.setItemAsync(key, value);
      return;
    }
  } catch (err) {
    console.warn(`[storage] setItem failed for key=${key}`, err);
    throw err;
  }
}

export async function getItem(key: string): Promise<string | null> {
  try {
    if (isWeb()) {
      if (typeof window !== "undefined" && window.localStorage) {
        const v = window.localStorage.getItem(key);
        return v;
      } else {
        return inMemory.has(key) ? (inMemory.get(key) as string) : null;
      }
    } else {
      const value = await SecureStore.getItemAsync(key);
      return value;
    }
  } catch (err) {
    console.warn(`[storage] getItem failed for key=${key}`, err);
    throw err;
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    if (isWeb()) {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      } else {
        inMemory.delete(key);
        return;
      }
    } else {
      await SecureStore.deleteItemAsync(key);
      return;
    }
  } catch (err) {
    console.warn(`[storage] removeItem failed for key=${key}`, err);
    throw err;
  }
}

/** Clear everything (note: on web this will clear the entire localStorage) */
export async function clear(): Promise<void> {
  try {
    if (isWeb()) {
      if (typeof window !== "undefined" && window.localStorage) {
        // if you store other data in localStorage, avoid calling clear()
        window.localStorage.clear();
        return;
      } else {
        inMemory.clear();
        return;
      }
    } else {
      // there is no direct clear equivalent in SecureStore — if you need to remove multiple keys implement it separately; here we noop
      console.warn("[storage] clear() not implemented for native SecureStore");
      return;
    }
  } catch (err) {
    console.warn("[storage] clear failed", err);
    throw err;
  }
}
