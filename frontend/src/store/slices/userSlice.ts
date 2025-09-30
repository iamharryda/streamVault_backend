import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser} from "@/src/types/interfaces/iUser";

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
    setUser: (state, action: PayloadAction<IUser>) => {
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
