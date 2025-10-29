import { setUser } from "@/src/store/slices/userSlice";
import { store } from "@/src/store/store";
import * as storage from "@/src/utils/secureStoreUtil";
import { publicReq, privateReq } from "@/src/utils/authClient";
import { getUserById } from "./profileRequests";

// Public endpoints (no token required)
export const registerInit = async (
  name: string,
  email: string,
  password: string,
  phoneNumber: string
) => {
  try {
    const response = await publicReq.post("/register/init", {
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
    const response = await publicReq.post("/register/verify", {
      email,
      otp,
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data || err.message;
  }
};

// Login: store tokens using storage wrapper and update redux user slice
export const login = async (email: string, password: string) => {
  try {
    const response = await publicReq.post("/login", {
      email,
      password,
    });

    const loginData = response.data?.data ?? response.data;

    if (!loginData) {
      throw new Error("Login response missing data");
    }

    // Save tokens using storage wrapper (SecureStore/localStorage)
    if (loginData.accessToken) {
      await storage.setItem("accessToken", loginData.accessToken);
    }
    if (loginData.user?.refreshToken) {
      await storage.setItem("refreshToken", loginData.user.refreshToken);
    }
    const userData = await getUserById(loginData.user._id)
    // update redux store
    store.dispatch(
      setUser({
        id: userData.data._id ?? null,
        name: userData.data.name ?? "User",
        username:
          userData.data.username ??
          (userData.data.email ? userData.data.email.split("@")[0] : "guest"),
        avatar: userData.data.profileImage ?? null,
        userStats:
          userData.data.userStats ?? { ratings: 0, reviews: 0, watchlist: 0, favorites: 0 },
        isLogined: true,
      })
    );

    return loginData;
  } catch (err: any) {
    throw err?.response?.data ?? err?.message ?? err;
  }
};

// Protected endpoint example uses privateReq (which will handle token injection and refresh)
export const getCurrentUser = async () => {
  try {
    const response = await privateReq.get("/me");
    return response.data;
  } catch (err: any) {
    throw err.response?.data || err.message;
  }
};

export { publicReq as publicAuthRequests, privateReq as privateAuthRequests };