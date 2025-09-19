import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";

const register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  const [isChecked, setIsChecked] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const checkForm = (
    username: string,
    email: string,
    password: string,
    isTermsAccepted: boolean,
    isPrivacyAccepted: boolean
  ): void => {
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.length >= 8 &&
      isTermsAccepted &&
      isPrivacyAccepted
    ) {
      console.log("Success: Form is valid and all conditions are met");
      router.push("/Registerverification");
    } else {
      if (username.trim() === "") {
        console.log("Error: Username is required");
      }
      if (email.trim() === "") {
        console.log("Error: Email is required");
      }
      if (password.length < 8) {
        console.log("Error: Password must be at least 8 characters long");
      }
      if (!isTermsAccepted) {
        console.log("Error: You must accept the Terms of Use");
      }
      if (!isPrivacyAccepted) {
        console.log("Error: You must agree to the Privacy Policy");
      }
    }
  };

  const handleSubmit = () => {
    try {
      checkForm(username, email, password, isTermsAccepted, isPrivacyAccepted);
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  };
  return (
    <ImageBackground
      source={require("./jokerimage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
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
          onChangeText={setUsername}
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
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleSubmit}
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
  switchRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 20,
  },
  switchLabel: {
    flex: 1,
    color: "#FFC107",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    marginRight: 20,
    marginLeft: 20,
    textAlign: "left",
  },
  link: {
    color: "white",
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
export default register;
