import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
    poster_path: string;
    title: string;
    release_date: string;
    id: number;
};

export default function MovieCard({ poster_path, title, release_date, id }: Props) {
    return (
        <Link href={`/movies/${id}` as any} asChild>
            <TouchableOpacity style={styles.container}>
                <Image
                    source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image' }}
                    style={styles.poster}
                    resizeMode="cover"
                />
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.date}>{release_date?.split("-")[0]}</Text>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 140,
        marginRight: 16,
    },
    poster: {
        width: "100%",
        height: 210,
        borderRadius: 12,
        marginBottom: 8,
    },
    title: {
        color: "white",
        fontWeight: "600",
    },
    date: {
        color: "#aaa",
        fontSize: 12,
    },
});
