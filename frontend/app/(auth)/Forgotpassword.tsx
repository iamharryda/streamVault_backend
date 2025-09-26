import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import styles from "./styles/VerificationStyles";
import RandomImageBackground from "./components/ImageSelect";

const forgotpassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5008/api/v1/auth/forget-password",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json", // explicitly tell backend this is JSON
          },
        }
      );
      router.push({
        pathname: "/ForgotVerification",
        params: { email }, // Pass email as a search param
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RandomImageBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Enter your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleForgotPassword}
        >
          <Text style={styles.buttonText}>Send code</Text>
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Return to login?{" "}
            <Pressable onPress={() => router.push("./Login")}>
              <Text style={styles.registerLink}>Return</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </RandomImageBackground>
  );
};

export default forgotpassword;
