import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile } from "@/src/types/interfaces/iUser";

const initialState: IUserProfile = {
  name: "Guest",
  username: "guest",
  avatar: null,
  userStats: {
    ratings: 0,
    reviews: 0,
    watchlist: 0,
    favorites: 0,
  },
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserProfile>) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
    clearUser: (state) => {
      state.name = "Guest";
      state.avatar = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
