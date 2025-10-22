import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getMovieDetails } from '@/src/api/tmdb';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import RatingBreakdown from '@/src/components/RatingBreakdown';

export default function MovieDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieDetails(Number(id));
                setMovie(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#FACC15" />
            </View>
        )
    }

    if (!movie) {
        return (
            <View style={styles.loader}>
                <Text style={{ color: '#FFF' }}>Movie not found.</Text>
            </View>
        )
    }

  return (
    <ScrollView style={styles.container}>
        {/* Movie Poster */}
        <View style={styles.header}>
            <Image 
                source={{
                    uri: movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=No+Image',
                }}
                style={styles.poster}
                resizeMode="cover"
            />
            <LinearGradient
                colors={["rgba(13, 40, 47, 0.8)", "#04191E"]}
                end={{ x: 0, y: 0.2 }}
                style={styles.posterGradient}
            />
        </View>

        {/* Movie Details */}
        <View style={styles.content}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.meta}>
                {movie.release_date?.split("-")[0]} • 
                {movie.genres?.map((g: any) => g.name).join(", ")} •
                {movie.runtime} min
            </Text>

            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="heart-outline" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="star-outline" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.watchNow}>
                    <Text style={{ color: '#04191E', fontWeight: 'bold' }}>Watch Now</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.title}>Summary</Text>
                <Text style={styles.overview}>{movie.overview}</Text>
            </View>

            {movie.credits?.cast?.length > 0 && (
                <>
                    <Text style={styles.title}>Top Cast</Text>
                    <FlatList 
                        data={movie.credits.cast.slice(0, 10)}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.castItem}>
                                <Image
                                    source={{
                                        uri: item.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                                            : 'https://via.placeholder.com/200x300?text=No+Image',
                                    }}
                                    style={styles.castImage}
                                />
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{item.name}</Text>
                                <Text style={{ color: '#aaa', fontSize: 12 }}>{item.character}</Text>
                            </View>
                        )}
                    />
                </>
            )}

            <RatingBreakdown
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
            />
        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#04191E',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#04191E',
    },
    header: {
        width: "100%",
        height: 300,
        position: "relative",
    },
    poster: {
        width: "100%",
        height: "100%",
    },
    posterGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 4,
    },
    meta: {
        color: "#aaa",
        marginBottom: 16,
    },
    content: {
        padding: 16,
        marginTop: -60,
    },
    actionBtn: {
        backgroundColor: "#1b263b",
        padding: 12,
        borderRadius: 50,
        marginHorizontal: 8,
    },
    watchNow: {
        flex: 10,
        backgroundColor: "#FFD60A",
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: "center",
    },
    overview: {
        color: "white",
        fontSize: 16,
        lineHeight: 22,
    },
        castItem: {
        alignItems: "center",
        marginRight: 16,
        width: 100,
    },
    castImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
});
