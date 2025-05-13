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
        <Text style={styles.titleText}>Welcome To{"\n"}StreamVault</Text>

          <Text style={styles.bottomText}>
          Lorem ipsum dolor sit amet consectetur. Pellentesque vitae ac habitasse risus lobortis scelerisque maecenas varius.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push("./pages/Welcome")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

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
    paddingBottom: 72,
  },
  button: {
    backgroundColor: "#FACC15",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    marginTop: 16,
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
    marginTop: 12,
    paddingHorizontal: 16,
    lineHeight: 22,
    marginBottom: -8,
  },
  titleText: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 40,
  },
});