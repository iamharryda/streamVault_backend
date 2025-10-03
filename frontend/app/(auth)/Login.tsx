import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import styles from "./styles/LoginStyles";
import RandomImageBackground from "./components/ImageSelect";
import { login as apiLogin } from "@/src/api/serverRequests/authRequests";

const login = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isChecked, setIsChecked] = React.useState(false);

  const handleLogin = async () => {
    try {
      const loginData = await apiLogin(email, password);
      console.log("Login data:", loginData);
      router.push("/Account");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RandomImageBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={(text) => {
            setName(text);
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsChecked(!isChecked)}
          >
            <View
              style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            >
              {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Keep me signed in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text
              style={styles.forgotPassword}
              onPress={() => router.push("/ForgotPassword")}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Pressable onPress={() => router.push("./Register")}>
              <Text style={styles.registerLink}>Register</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </RandomImageBackground>
  );
};

export default login;
