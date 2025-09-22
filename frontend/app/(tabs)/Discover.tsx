import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { getTrendingMovies, getNowPlayingMovies } from "@/src/api/tmdb";
import { useEffect, useState } from "react";
import MovieSection from "@/src/components/MovieSection";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
};

export default function Discover() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [latestMovie, setLatestMovie] = useState<Movie[]>([]);

  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = async () => {
    const trending = await getTrendingMovies();
    setTrendingMovies(trending);
    const latest = await getNowPlayingMovies();
    setLatestMovie(latest);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#04191E' }}>
      <ScrollView style={{ gap: 20, marginTop: 20 }}>

        <MovieSection
          sectionTitle="Trending this week"
          movies={trendingMovies}
        />

        <MovieSection 
          sectionTitle="New Releases" 
          movies={latestMovie} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}
     