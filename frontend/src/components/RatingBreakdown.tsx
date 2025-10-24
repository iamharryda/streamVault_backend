import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  vote_average: number;
  vote_count: number;
};

export default function RatingBreakdown({ vote_average, vote_count }: Props) {
  const stars = (vote_average / 2).toFixed(1);

  const distribution = {
    5: Math.round(vote_count * 0.5),
    4: Math.round(vote_count * 0.3),
    3: Math.round(vote_count * 0.15),
    2: Math.round(vote_count * 0.04),
    1: Math.round(vote_count * 0.01),
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.score}>{stars}</Text>
        <View style={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <FontAwesome
              key={i}
              name={i < Math.floor(Number(stars)) ? "star" : "star-o"}
              size={20}
              color="gold"
            />
          ))}
        </View>
        <Text style={styles.votes}>{vote_count} ratings</Text>
      </View>

      <View style={styles.right}>
        {Object.entries(distribution)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([star, count]) => {
            const percent = vote_count ? (count / vote_count) * 100 : 0;
            return (
              <View key={star} style={styles.row}>
                <Text style={styles.starLabel}>{star}★</Text>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: `${percent}%` }]} />
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
  },
  left: {
    alignItems: "center",
    marginRight: 16,
  },
  score: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  stars: {
    flexDirection: "row",
    marginVertical: 4,
  },
  votes: {
    color: "gray",
    fontSize: 12,
  },
  right: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  starLabel: {
    color: "white",
    width: 30,
  },
  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#333",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: 6,
    backgroundColor: "gold",
  },
});
