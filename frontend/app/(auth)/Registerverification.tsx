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

const rverification = () => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5008/api/v1/auth/register/verify",
        {
          code,
        },
        {
          headers: {
            "Content-Type": "application/json", // explicitly tell backend this is JSON
          },
        }
      );
      router.push("/Login");
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
        <Text style={styles.title}>Verifify your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your code"
          keyboardType="number-pad"
          placeholderTextColor="#888"
          value={code}
          onChangeText={setCode}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleVerification}
        >
          <Text style={styles.buttonText}>Verify email</Text>
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Return to register?{" "}
            <Pressable onPress={() => router.push("./Register")}>
              <Text style={styles.registerLink}>Return</Text>
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
export default rverification;
