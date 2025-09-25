import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { getTrendingMovies, getNowPlayingMovies } from "@/src/api/tmdb";
import { useEffect, useState } from "react";
import MovieSection from "@/src/components/MovieSection";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
};

export default function Discover() {
  const router = useRouter();
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
        <TouchableOpacity onPress={() => router.push('./SearchScreen')} style={{ borderRadius: 8, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingVertical: 12, marginBottom: 20, width: '75%', backgroundColor: '#0d282f' }}>
          <Ionicons name="search" size={20} color="#e6e8e9" style={{ marginHorizontal: 10}} />
          <Text style={{ color: '#e6e8e9', marginLeft: 10 }}>Search</Text>
        </TouchableOpacity>

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
     