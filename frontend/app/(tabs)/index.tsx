import { getPopularMovies } from "@/src/api/tmdb";
import MovieSection from "@/src/components/MovieSection";
import SearchButton from "@/src/components/SearchButton";
import { IMovie } from "@/src/types/interfaces/IMovie";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const popular = async () => {
      const movies = await getPopularMovies();
      setPopularMovies(movies);
    };

    popular();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#04191E' }}>
      <ScrollView>
        {/* Search Bar */}
        <SearchButton></SearchButton>

        <MovieSection sectionTitle="Popular on StreamVault" movies={popularMovies} />
      </ScrollView>
    </SafeAreaView>
  );
}
