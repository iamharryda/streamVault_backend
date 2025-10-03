export interface IUser {
  id: string | null;
  name: string;
  username: string;
  avatar: string | null;
  userStats: {
    ratings: number;
    reviews: number;
    watchlist: number;
    favorites: number;
  };
  isLogined: boolean;
}
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type IUserUpdate = DeepPartial<IUser>;
