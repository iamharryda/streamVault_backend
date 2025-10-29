import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getTVShowDetails } from '@/src/api/tmdb';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import RatingBreakdown from '@/src/components/RatingBreakdown';

export default function TVShowDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [tvShow, setTVShow] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTVShowDetails = async () => {
            try {
                const data = await getTVShowDetails(Number(id));
                setTVShow(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTVShowDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#FACC15" />
            </View>
        );
    }

    if (!tvShow) {
        return (
            <View style={styles.loader}>
                <Text style={{ color: '#FFF' }}>TV Show not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`,
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


            <View style={styles.content}>
                <Text style={styles.title}>{tvShow.name}</Text>
                <Text style={styles.meta}>
                    {tvShow.first_air_date?.slice(0, 4)} •{" "}
                    {tvShow.genres.map((g: any) => g.name).join(", ")} •{" "}
                    {tvShow.episode_run_time?.[0] || "?"}m
                </Text>

                <Text style={styles.networks}>
                    {tvShow.networks?.map((n: any) => n.name).join(", ")}
                </Text>

                <View style={styles.stats}>
                    <Text style={styles.statItem}>
                        Seasons: {tvShow.number_of_seasons}
                    </Text>
                    <Text style={styles.statItem}>
                        Episodes: {tvShow.number_of_episodes}
                    </Text>
                    <Text style={styles.statItem}>Status: {tvShow.status}</Text>
                </View>

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

                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.overview}>{tvShow.overview}</Text>

                <Text style={styles.sectionTitle}>Top Cast</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {tvShow.credits?.cast.slice(0, 10).map((actor: any) => (
                        <View key={actor.id} style={styles.actorCard}>
                            <Image
                                source={{
                                    uri: actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : "https://via.placeholder.com/100x150?text=No+Image",
                                }}
                                style={styles.actorImage}
                            />
                            <Text style={styles.actorName} numberOfLines={1}>
                                {actor.name}
                            </Text>
                            <Text style={styles.character} numberOfLines={1}>
                                {actor.character}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Ratings</Text>
                <RatingBreakdown
                    voteAverage={tvShow.vote_average}
                    voteCount={tvShow.vote_count}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#04191E"
    },
    header: {
        width: "100%",
        height: 300,
        position: "relative",
    },
    posterGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    poster: {
        width: "100%",
        height: 400
    },
    content: {
        padding: 16
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 6
    },
    meta: {
        color: "gray",
        marginBottom: 8
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
    networks: {
        color: "#FFD700",
        fontWeight: "500",
        marginBottom: 10
    },
    stats: {
        marginBottom: 16
    },
    statItem: {
        color: "white",
        fontSize: 14,
        marginBottom: 4
    },
    sectionTitle: {
        color: "white",
        fontSize: 18,
        marginVertical: 8
    },
    overview: {
        color: "#C0C0C0",
        fontSize: 15,
        marginBottom: 16
    },
    actorCard: {
        marginRight: 12,
        alignItems: "center",
        width: 100
    },
    actorImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
        marginBottom: 6
    },
    actorName: {
        color: "white",
        fontSize: 13,
        textAlign: "center"
    },
    character: {
        color: "gray",
        fontSize: 12,
        textAlign: "center"
    },
});
