import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieSection from "@/src/components/MovieSection";
import MovieCard from "@/src/components/MovieCard";
import { getPopularMovies } from "@/src/api/tmdb";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
};

export default function HomePage() {
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

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
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 40,
          padding: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.33)',
          marginVertical: 20,
          width: '75%'
        }} onPress={() => router.push('./SearchScreen')}>
          <Ionicons name="search" size={20} color="#e6e8e9" style={{ marginRight: 16 }} />
          <Text style={{ color: '#fff' }}>Search</Text>
        </TouchableOpacity>

        <MovieSection sectionTitle="Popular on StreamVault" movies={popularMovies} />
      </ScrollView>
    </SafeAreaView>
  );
}
