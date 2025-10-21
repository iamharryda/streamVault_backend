import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IMovie } from "../types/interfaces/IMovie";



export default function MovieCard({ poster_path, title, release_date, id }: IMovie) {
    return (
        <Link href={`../movies/${id}`} asChild>
            <TouchableOpacity style={styles.container}>
                <Image
                    source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : undefined }}
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
