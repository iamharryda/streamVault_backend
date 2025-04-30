import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Welcome = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style = {styles.button}>
                    Log In
                </Text>
                <Text style = {styles.button}>
                    Create an account
                </Text>
                <Text style = {styles.skipButton}>
                    SKIP & BROWS
                </Text>
            </TouchableOpacity>
            <Text style = {styles.text}>Lorem ipsum dolor sit amet consectetur. Bibendum eu turpis diam amet mauris laoreet</Text>
        </View>

    )
}

export default Welcome

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },  
    button: {
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#FACC15',
        fontSize: 15, fontWeight: '600',
        borderRadius: 8,
        width: 250,
        marginLeft: 10, marginRight: 10, marginTop: 8, marginBottom: 8,
        paddingTop: 10, paddingBottom: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 8, marginBottom: 8,
    },
    skipButton: {
        color: "#FACC15",
        fontSize: 16,
        fontFamily: "Inter",
        textAlign: 'center',
        lineHeight: 40,
      },
})