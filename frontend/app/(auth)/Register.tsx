import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
  Switch,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import styles from "./styles/RegisterStyles";

const register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  const handleRegister = async () => {
    if (!email) {
      console.log("Error: Email is required");
      return;
    }
    if (!username) {
      console.log("Error: Username is required");
      return;
    }
    if (username.length < 3) {
      console.log("Error: Username must be at least 3 characters long");
      return;
    }
    if (!password) {
      console.log("Error: Password is required");
      return;
    }
    if (password.length < 6) {
      console.log("Error: Password must be at least 6 characters long");
      return;
    }
    if (!isTermsAccepted) {
      console.log("Error: You must accept the Terms of Use");
      return;
    }
    if (!isPrivacyAccepted) {
      console.log("Error: You must accept the Privacy Policy");
      return;
    }

    try {
      console.log("Validation passed, attempting registration...");
      const response = await axios.post(
        "http://localhost:5008/api/v1/auth/register/init",
        {
          name,
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful:", response.data);
      router.push({
        pathname: "/RegisterVerification",
        params: { email }, // Pass email as a search param
      });
    } catch (err) {
      console.log("Registration error");
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/images/jokerimage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter a username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setName(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter a password"
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
          <Text style={styles.switchLabel}>
            I’m 16+ years old and accept{" "}
            <Text style={styles.link} onPress={() => router.push("./register")}>
              Terms of Use
            </Text>
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

          <Text style={styles.switchLabel}>
            I agree to the{" "}
            <Text style={styles.link} onPress={() => router.push("./Register")}>
              Privacy Policy
            </Text>{" "}
            and consent to the processing of my personal information
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register an account</Text>
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Pressable onPress={() => router.push("./Login")}>
              <Text style={styles.registerLink}>Sign in</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default register;
