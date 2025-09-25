import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { getTrendingMovies, getNowPlayingMovies } from "@/src/api/tmdb";
import { useEffect, useState } from "react";
import MovieSection from "@/src/components/MovieSection";
import SearchButton from "@/src/components/SearchButton";
import { IMovie } from "@/src/types/interfaces/IMovie";


export default function Discover() {
  const [trendingMovies, setTrendingMovies] = useState<IMovie[]>([]);
  const [latestMovie, setLatestMovie] = useState<IMovie[]>([]);

  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = async () => {
    const trending = await getTrendingMovies();
    setTrendingMovies(trending);
    const latest = await getNowPlayingMovies();
    setLatestMovie(latest);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#04191E" }}>
      <ScrollView>
        <SearchButton></SearchButton>

        <MovieSection
          sectionTitle="Trending this week"
          movies={trendingMovies}
        />

        <MovieSection sectionTitle="New Releases" movies={latestMovie} />
      </ScrollView>
    </SafeAreaView>
  );
}
