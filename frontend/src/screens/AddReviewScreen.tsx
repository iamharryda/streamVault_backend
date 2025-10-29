import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";


export default function AddReviewScreen() {
    const [rating, setRating] = useState(0);
    const [rememberDate, setRememberDate] = useState(false);
    const [review, setReview] = useState("");
    const [spoilers, setSpoilers] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const { id, type, title, poster_path, release_date, director } = useLocalSearchParams<{
        id: string;
        type: "movie" | "tv";
        title: string;
        poster_path: string;
        release_date: string;
        director: string;
    }>();

    const handleAddTag = () => {
        if (tagInput.trim().length > 0 && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleSubmit = () => {
        console.log({
            rating,
            rememberDate,
            review,
            spoilers,
            tags,
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
            {/* Movie/Show Info */}
            <View style={styles.infoContainer}>
                <Image
                    source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : undefined }}
                    style={styles.poster}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={{ color: "white" }}>{release_date}</Text>
                    <Text style={{ color: "white" }}>Director: {director}</Text>
                </View>
            </View>
            {/* Rating */}
            <Text style={styles.label}>Your Rating</Text>
            <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Ionicons
                            name={rating >= star ? "star" : "star-outline"}
                            size={32}
                            color={rating >= star ? "#FFD60A" : "#555"}
                            style={{ marginRight: 6 }}
                        />
                    </TouchableOpacity>
                ))}
                <Text style={styles.ratingText}>{rating.toFixed(1)}/5</Text>
            </View>

            {/* Date Watched */}
            <Text style={styles.label}>Date Watched</Text>
            <TouchableOpacity style={styles.dateButton}>
                <Ionicons name="calendar-outline" size={18} color="#ccc" />
                <Text style={styles.dateText}>Select a date</Text>
            </TouchableOpacity>
            <View style={styles.switchRow}>
                <Switch
                    value={rememberDate}
                    onValueChange={setRememberDate}
                    thumbColor={rememberDate ? "#FFD60A" : "#ccc"}
                    trackColor={{ true: "#4a4a4a", false: "#2c2c2c" }}
                />
                <Text style={styles.switchLabel}>I don’t remember</Text>
            </View>

            {/* Review */}
            <Text style={styles.label}>Your Review</Text>
            <Text style={styles.charCount}>{review.length}/1000</Text>
            <TextInput
                style={styles.textArea}
                multiline
                maxLength={1000}
                placeholder="What did you think of the movie/show?"
                placeholderTextColor="#6b7280"
                value={review}
                onChangeText={setReview}
            />

            {/* Spoiler toggle */}
            <View style={styles.switchRow}>
                <Switch
                    value={spoilers}
                    onValueChange={setSpoilers}
                    thumbColor={spoilers ? "#FFD60A" : "#ccc"}
                    trackColor={{ true: "#4a4a4a", false: "#2c2c2c" }}
                />
                <Text style={styles.switchLabel}>Contains spoilers</Text>
            </View>

            {/* Tags */}
            <Text style={styles.label}>Add Tags</Text>
            <View style={styles.tagInputRow}>
                <TextInput
                    style={styles.tagInput}
                    placeholder="+mind-blowing, +twist ending, +psycho"
                    placeholderTextColor="#6b7280"
                    value={tagInput}
                    onChangeText={setTagInput}
                />
                <TouchableOpacity onPress={handleAddTag} style={styles.addButton}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Tag List */}
            <View style={styles.tagList}>
                {tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>+{tag}</Text>
                    </View>
                ))}
            </View>

            {/* Submit */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#04191E",
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 10,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    label: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 20,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    ratingText: {
        color: "white",
        marginLeft: 8,
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0b2c33",
        padding: 12,
        borderRadius: 10,
        marginTop: 8,
    },
    dateText: {
        color: "#ccc",
        marginLeft: 8,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    switchLabel: {
        color: "white",
        marginLeft: 10,
    },
    textArea: {
        backgroundColor: "#0b2c33",
        color: "white",
        borderRadius: 10,
        padding: 12,
        height: 120,
        textAlignVertical: "top",
        marginTop: 8,
    },
    charCount: {
        alignSelf: "flex-end",
        color: "#6b7280",
        fontSize: 12,
        marginTop: 4,
    },
    tagInputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    tagInput: {
        flex: 1,
        backgroundColor: "#0b2c33",
        color: "white",
        borderRadius: 10,
        padding: 10,
    },
    addButton: {
        marginLeft: 8,
        backgroundColor: "#1b263b",
        padding: 10,
        borderRadius: 10,
    },
    tagList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },
    tag: {
        backgroundColor: "#09323a",
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        color: "#FFD60A",
        fontWeight: "500",
    },
    submitButton: {
        backgroundColor: "#FFD60A",
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 24,
    },
    submitText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#04191E",
    },
});
