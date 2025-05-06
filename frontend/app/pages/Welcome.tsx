import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts as useInterFonts, Inter_700Bold, Inter_600SemiBold, Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts as useDmSansFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { Link } from "expo-router";

export default function Welcome() {
  useInterFonts({ Inter_700Bold, Inter_600SemiBold, Inter_500Medium });
  useDmSansFonts({ DMSans_400Regular });

  return (
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
          <TouchableOpacity style={styles.button}>
            <Link href="/pages/Auth/Login" style={styles.buttonText}>Log in</Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
          <Link href="/pages/Auth/Register" style={styles.buttonText}>Create an account</Link>
          </TouchableOpacity>

            {/* Missing logic */}
          <Link href="./Welcome" style={styles.skipText}>SKIP & BROWSE</Link>

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