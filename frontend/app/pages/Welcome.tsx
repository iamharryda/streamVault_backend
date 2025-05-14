import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  return (
    /* SET BACKGROUND IMAGE */
    <ImageBackground
      source={require("../assets/placeholder.png")}
      style={styles.wrapper}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(13, 40, 47, 0.25)", "rgba(13, 40, 47, 0.8)", "rgba(13, 40, 47, 100)"]}
        style={styles.wrapper}
      >
        <View style={styles.bottomGroup}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("./Auth/Login")}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push("./Auth/Register")}>
          <Text style={styles.buttonText}>Create an account</Text>
          </TouchableOpacity>

            {/* Missing logic */}
          <Text style={styles.skipText} onPress={() => router.push("./Welcome")}>SKIP & BROWSE</Text>

          <Text style={styles.bottomText}>
            Lorem ipsum dolor sit amet consectetur.{"\n"} Bibendum eu turpis diam amet mauris laoreet
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bottomGroup: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 24,
  },
  button: {
    backgroundColor: "#FACC15",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
  bottomText: {
    color: "#C3CDCF",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  skipText: {
    color: "#FACC15",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 8,
  }
});