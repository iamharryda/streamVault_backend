import { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { searchMovies } from '@/src/api/tmdb';
import MovieCard from '@/components/MovieCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const handleTimeout = setTimeout(async () => {
        if (query.length > 1) {
            const movies = await searchMovies(query);
            setResults(movies);
        } else {
            setResults([]);
        }
  }, 500); // Debounce for 500ms

  return () => clearTimeout(handleTimeout);
  }, [query]);
  
      return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="#aaa"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            poster_path={item.poster_path}
            title={item.title}
            release_date={item.release_date}
            id={item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04191E",
    padding: 16,
  },
  input: {
    backgroundColor: "#1b263b",
    color: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
});
