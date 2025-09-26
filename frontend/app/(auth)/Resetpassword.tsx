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

const resetpassword = () => {
  const router = useRouter();

  const [newPassword, setPassword] = useState<string>("");
  const { email } = useLocalSearchParams();

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5008/api/v1/auth/reset-password", // change to correct one, add email through local memory, make everything prettier
        { newPassword, email },
        {
          headers: {
            "Content-Type": "application/json", // explicitly tell backend this is JSON
          },
        }
      );
      router.push("/Login");
      console.log("Password succesfully reset: ", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RandomImageBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Enter new password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a password"
          placeholderTextColor="#888"
          value={newPassword}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handlePasswordReset}
        >
          <Text style={styles.buttonText}>Set new password</Text>
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

export default resetpassword;
