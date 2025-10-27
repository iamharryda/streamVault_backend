import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import styles from "./styles/VerificationStyles";
import RandomImageBackground from "./components/ImageSelect";

const fverification = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const { email } = useLocalSearchParams();
  const ForgotVerification = async () => {
    console.log(otp, email);
    try {
      const response = await axios.post(
        "http://localhost:5008/api/v1/auth/verify-code",
        {
          otp,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json", // explicitly tell backend this is JSON
          },
        }
      );
      router.push({
        pathname: "/Resetpassword",
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
        <Text style={styles.title}>Enter your code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your code"
          keyboardType="number-pad"
          placeholderTextColor="#888"
          value={otp}
          onChangeText={setOtp}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={ForgotVerification}
        >
          <Text style={styles.buttonText}>Verify Reset</Text>
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

export default fverification;
