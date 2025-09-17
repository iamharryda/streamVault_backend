import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Switch, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { auth } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  const handleSignUp = async () => {
    try {
      const user =await createUserWithEmailAndPassword(auth, email, password);
      router.push("../MovieSearch");
    } catch (error: any) {
      console.error("Error signing up:", error);
      alert("Sign up failed: " + error.message);
    }
  };

  return (
        /* SET BACKGROUND IMAGE */
    <ImageBackground
    source={require("../assets/placeholder.png")}
      style={styles.wrapper}
      resizeMode="cover"
    >
      <LinearGradient colors={["rgba(13, 40, 47, 0.8)", "#04191E"]} style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.content}>
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
                {...Platform.select({ web: { activeThumbColor: "#FACC15" } })}
              />
              
              {/* Point to privacy policy page? */}
              <Text style={styles.switchLabel}>
                I’m 16+ years old and accept <Text style={styles.link} onPress={() => router.push("./Register")}>Terms of Use</Text>
              </Text>
            </View>

            <View style={styles.switchRow}>
              <Switch
                value={isPrivacyAccepted}
                onValueChange={setIsPrivacyAccepted}
                trackColor={{ false: "#C3CDCF", true: "#FACC154D" }}
                thumbColor={isPrivacyAccepted ? "#FACC15" : "#888"}
                {...Platform.select({ web: { activeThumbColor: "#FACC15" } })}
              />
              {/* Point to privacy policy page? */}
              <Text style={styles.switchLabel}>
                I agree to the <Text style={styles.link} onPress={() => router.push("./Register")}>Privacy Policy</Text> and consent to the processing of my personal information
              </Text>
            </View>

              {/* Add logic to sign up the user */}
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={!(isTermsAccepted && isPrivacyAccepted && email && password)}>
              <Text style={styles.signUpButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signInRow}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("./Login")}>
              <Text style={styles.signInLink}>Sign in</Text>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "inter_700Bold",
    color: "#fff",
    marginTop: 142,
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
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    flex: 1,
    color: "#C3CDCF",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    marginRight: 10,
    textAlign: "left",
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
    marginBottom: 80,
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