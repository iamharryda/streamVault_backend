import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

const forgotpassword = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <ImageBackground
      source={require("../../assets/images/jokerimage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Enter your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={() => router.push("./Resetpassword")}
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
export default forgotpassword;
