import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Switch, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useFonts as useInterFonts, Inter_700Bold, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useFonts as useDmSansFonts, DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";

export default function Register() {
  const [interFontsLoaded] = useInterFonts({
    Inter_700Bold,
    Inter_600SemiBold,
  });

  const [dmSansFontsLoaded] = useDmSansFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  return (
        /* Set background image */ 
    <ImageBackground
      source={require("../../assets/placeholder.png")}
      style={styles.wrapper}
      resizeMode="cover"
    >
      <LinearGradient colors={["rgba(13, 40, 47, 0.8)", "#04191E"]} style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign up</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.switchRow}>
            <Switch
              value={isTermsAccepted}
              onValueChange={setIsTermsAccepted}
              trackColor={{ false: "#C3CDCF", true: "#FACC154D" }}
              thumbColor={isTermsAccepted ? "#FACC15" : "#888"}
              {...Platform.select({web: {
                activeThumbColor: "#FACC15"
            }})}
            />

                      {/* Set TOS routing */}
            <Text style={styles.switchLabel}>
              I’m 16+ years old and accept <Link href="./Register" style={styles.link}>Terms of Use</Link>
            </Text>
          </View>

          <View style={styles.switchRow}>
            <Switch
              value={isPrivacyAccepted}
              onValueChange={setIsPrivacyAccepted}
              trackColor={{ false: "#C3CDCF", true: "#FACC154D" }}
              thumbColor={isPrivacyAccepted ? "#FACC15" : "#888"}
              {...Platform.select({web: {
                activeThumbColor: "#FACC15"
            }})}
            />
                      {/* Set privacy policy routing */}
            <Text style={styles.switchLabel}>
              I agree to the <Link href="./Register" style={styles.link}>Privacy Policy</Link> and consent to the processing of my personal information
            </Text>
          </View>

          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.signInRow}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity>
              <Link style={styles.signInLink} href="./Login">Sign in</Link>
            </TouchableOpacity>
          </View>
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
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: "inter_700Bold",
    color: "#fff",
    marginTop: 72,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 14,
    fontFamily: "dmsans_500Medium",
    marginBottom: 20,
    marginTop: 16,
  },
  switchRow: {
    flexDirection: "row-reverse", // Align switch to the right
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    flex: 1,
    color: "#C3CDCF",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    marginRight: 10, // Add spacing between the switch and the text
    textAlign: "left", // Ensure text aligns to the left
  },
  link: {
    color: "white",
  },
  signUpButton: {
    backgroundColor: "#FACC15",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signInText: {
    color: "#C3CDCF",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  signInLink: {
    color: "#FACC15",
    fontFamily: "DMSans_500Medium",
  },
});