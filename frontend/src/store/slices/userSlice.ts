import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/src/types/interfaces/iUser";

const initialState: IUser = {
  id: null,
  name: "Guest",
  username: "guest",
  avatar: null,
  userStats: {
    ratings: 0,
    reviews: 0,
    watchlist: 0,
    favorites: 0,
  },
  isLogined: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set the user state with partial data
    setUser: (state, action: PayloadAction<Partial<IUser>>) => {
      Object.assign(state, action.payload);
    },

    // Update a specific field of the user
    updateUserField: <K extends keyof IUser>(
      state: IUser,
      action: PayloadAction<{ field: K; value: IUser[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    // Log in the user
    login: (state) => {
      state.isLogined = true;
    },
    // Log out and reset to initial state
    logout: () => initialState,
  },
});

export const { setUser, updateUserField, login, logout } = userSlice.actions;
export default userSlice.reducer;
