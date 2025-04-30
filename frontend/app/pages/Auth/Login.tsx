import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useFonts as useInterFonts, Inter_700Bold, Inter_600SemiBold } from "@expo-google-fonts/inter"; 
import { useFonts as useDmSansFonts, DMSans_400Regular, DMSans_500Medium } from "@expo-google-fonts/dm-sans";
import { MaterialIcons } from "@expo/vector-icons";


export default function Login() {
  const [interFontsLoaded] = useInterFonts({
    Inter_700Bold,
    Inter_600SemiBold
  });

  const [dmSansFontsLoaded] = useDmSansFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  return (
    /* Set background image */ 
    <ImageBackground source={require("../../../assets/placeholder.png")} 
      style={styles.wrapper}
      resizeMode="cover" 
    >

      <LinearGradient
      colors={["rgba(13, 40, 47, 0.8)", "#04191E"]}
      style={styles.wrapper}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Sign in</Text>

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

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setKeepSignedIn(!keepSignedIn)}
            >
              <View style={[styles.checkbox, keepSignedIn && styles.checkboxChecked]}>
                {keepSignedIn && (
                  <MaterialIcons name="check" size={16} color="#000" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Keep me signed in</Text>
            </TouchableOpacity>

              {/* Add logic for forgot password - Popup/page? */}
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text> 
            </TouchableOpacity> 
          </View>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUpRow}>
          <Text style={styles.signUpText}>Don’t have an account? </Text>
          <TouchableOpacity>
            <Link style={styles.signUpLink} href="./Register">Sign up</Link>
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
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: "inter_700Bold",
    color: "#fff",
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
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "#C3CDCF",
    marginRight: 8,
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#FACC15",
    borderColor: "#FACC15",
  },
  checkboxLabel: {
    color: "#C3CDCF",
    fontSize: 14,
    fontFamily: "dmsans_500Medium",
  },
  forgotPassword: {
    color: "#C3CDCF",
    fontSize: 14,
    fontFamily: "dmsans_500Medium",
    textDecorationLine: "underline",
  },
  signInButton: {
    backgroundColor: "#FACC15",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  signInText: {
    color: "#000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
  signUpRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
    marginBottom: 80,
  },
  signUpText: {
    color: "#C3CDCF",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  signUpLink: {
    color: "#FACC15",
    fontFamily: "DMSans_500Medium",
  },
});