export interface IUserProfile {
  name: string;
  username: string;
  avatar: string | null;
  userStats: {
    ratings: number;
    reviews: number;
    watchlist: number;
    favorites: number;
  };
}
