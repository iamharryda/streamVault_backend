import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  return (
    /* SET BACKGROUND IMAGE */
    <ImageBackground
      source={require("../../assets/placeholder.png")}
      style={styles.wrapper}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(13, 40, 47, 0.25)", "rgba(13, 40, 47, 0)", "rgba(13, 40, 47, 100)"]}
        style={styles.wrapper}
      >
        <View style={styles.bottomGroup}>

            <Text style={styles.title}>Reset password</Text>
            

            {/* Missing logic, like requiring a email format (x@x.xx) */}
            <TextInput
              style={styles.input}
              placeholder="xyz@example.com"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
            
            {/* Missing logic */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reset Now!</Text>
          </TouchableOpacity>
          
            <Text style={styles.bottomText}>
                <Text style={styles.highlightText} onPress={() => router.push("./Login")}>Sign in</Text> Instead
            </Text>

            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.bottomText}>OR</Text>
                <View style={styles.line} />
            </View>

            {/* Missing logic */}
          <Text style={styles.highlightText} onPress={() => router.push("./ForgotPassword")}>Browse</Text>

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
    paddingBottom: 16,
  },
  button: {
    backgroundColor: "#FACC15",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    marginBottom: 24,
  },
  buttonText: {
    color: "#000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  bottomText: {
    color: "#C3CDCF",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
    lineHeight: 20,
    letterSpacing: 0,
  },
  highlightText: {
    color: "#FACC15",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 14,
    fontFamily: "dmsans_500Medium",
    marginBottom: 32,
    marginTop: 16,
    width: "90%",
  },
  title: {
    fontSize: 32,
    fontFamily: "inter_700Bold",
    color: "#fff",
    marginTop: 142,
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: 0,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center", 
    width: "90%",
  },
  line: {
    flex: 0.1, // Length
    height: 1, // Thickness
    backgroundColor: "#C3CDCF", 
    opacity: 0.5,
  },
});