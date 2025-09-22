import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
};

type Props = {
  sectionTitle: string;
  movies: Movie[];
};

export default function MovieSection({ sectionTitle, movies }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{sectionTitle}</Text>
        <TouchableOpacity onPress={() => { /* Handle "See all" action */ }}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal list */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard
            poster_path={item.poster_path}
            title={item.title}
            release_date={item.release_date}
            id={item.id}
          />
        )}
        contentContainerStyle={{ paddingLeft: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  seeAll: {
    color: "#aaa",
    fontSize: 14,
  },
});
