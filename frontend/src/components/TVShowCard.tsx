import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ITvShow } from "../types/interfaces/ITvShow";

export default function TVShowCard({ poster_path, name, first_air_date, id }: ITvShow) {
    return (
        <Link href={`/tv/${id}`} asChild>
            <TouchableOpacity style={styles.container}>
                <Image
                    source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : undefined }}
                    style={styles.image}
                />
                <Text style={styles.title}>{name || "Untitled TV Show"}</Text>
                <Text style={styles.date}>{first_air_date ? first_air_date.slice(0, 4) : "—"}</Text>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: 'white',
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
});
