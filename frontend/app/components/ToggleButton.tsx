import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useFonts as useInterFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";

export default function ToggleButton() {
    const [selectedTab, setSelectedTab] = useState("Movies");
    const animation = useRef(new Animated.Value(0)).current;
    const [tabWidth, setTabWidth] = useState(0);

    useInterFonts({ Inter_600SemiBold });

    useEffect(() => {
        Animated.timing(animation, {
            toValue: selectedTab === 'Movies' ? 0 : 1,
            duration: 300,
            useNativeDriver: false, // For layout animation, must be false
        }).start();
    }, [selectedTab]);

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, tabWidth - 2], // slide underline
    });

    // Interpolate text color for Movies and TV Shows
    const moviesTextColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#04191E', '#B1B8B9'], // Active color for Movies, inactive color for TV Shows
    });

    const tvShowsTextColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#B1B8B9', '#04191E'], // Inactive color for Movies, active color for TV Shows
    });

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Animated.View style={[styles.slider, { transform: [{ translateX }] }]} />
                <TouchableOpacity
                    style={[styles.button, { flex: 1 }]}
                    onPress={() => setSelectedTab("Movies")}
                    onLayout={e => setTabWidth(e.nativeEvent.layout.width)}
                >
                    <Animated.Text style={[styles.text, { color: moviesTextColor }]}>
                        Movies
                    </Animated.Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { flex: 1 }]}
                    onPress={() => setSelectedTab("TV Shows")}
                >
                    <Animated.Text style={[styles.text, { color: tvShowsTextColor }]}>
                        TV Shows
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#B1B8B9',
        borderRadius: 6,
        overflow: 'hidden',
        padding: 2,
        width: '60%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        borderRadius: 4,
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        zIndex: 1,
    },
    slider: {
        position: 'absolute',
        height: '90%',
        width: '50%',
        backgroundColor: '#FACC15',
        zIndex: -1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        borderRadius: 4,
    },
});