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

const login = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isChecked, setIsChecked] = React.useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5008/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // explicitly tell backend this is JSON
          },
        }
      );
      router.push("/(tabs)/Account");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/jokerimage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    alignItems: "center",
    marginTop: "25%",
  },
  title: {
    color: "#FFC107",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    width: "80%",
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  checkmark: {
    color: "#FFC107",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxLabel: {
    color: "#000",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FFC107",
    fontSize: 16,
  },
  forgotPasswordContainer: {
    paddingLeft: 20,
    alignSelf: "flex-end",
  },
  forgotPassword: {
    color: "#000",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FFC107",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    width: "80%",
    padding: 12,
    marginTop: 50,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#FFC107",
    opacity: 0.8,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 15,
    width: "80%",
    alignItems: "center",
  },
  footerText: {
    color: "#FFC107",
    fontSize: 16,
  },
  registerLink: {
    color: "#FFC107",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
export default login;
