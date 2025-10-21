import {
  View,
  Text,
  Pressable,
  TextInput,
  Switch,
  Platform,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import RandomImageBackground from "./components/ImageSelect";
import { StyleSheet } from "react-native";
import { registerInit, verifyOtp as apiVerifyOtp, login as apiLogin } from "@/src/api/serverRequests/authRequests"

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !name) {
      console.log("Error: All fields are required");
      return;
    }
    if (password.length < 6) {
      console.log("Error: Password must be at least 6 characters long");
      return;
    }
    if (!isTermsAccepted || !isPrivacyAccepted) {
      console.log("Error: Accept terms and privacy policy");
      return;
    }

    try {
      await registerInit(name, email, password, "1234567890");

      setOtpModalVisible(true);
    } catch (err: any) {
      console.log("Registration error:", err?.response?.data || err?.message || err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const verifyResponse = await apiVerifyOtp(email, otp);
      console.log("OTP verified:", verifyResponse);

      const loginData = await apiLogin(email, password);

      console.log("Login data:", loginData);

      setOtpModalVisible(false);
      router.push("/Account");
    } catch (err: any) {
      console.log("OTP verification error:", err?.response?.data || err?.message || err);
    }
  };

  return (
    <RandomImageBackground>
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
          placeholder="Enter your name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
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
            <Text style={styles.link} onPress={() => router.push("./Register")}>
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

        {/*  Попап для OTP */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={otpModalVisible}
          onRequestClose={() => setOtpModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Enter OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP code"
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
                onPress={handleVerifyOtp}
              >
                <Text style={styles.buttonText}>Verify</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </RandomImageBackground>
  );
};

export default Register;

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
    color: "#F5F6F5",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF8E1",
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
    color: "#FFF8E1",
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
    backgroundColor: "#FFCA28",
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
    color: "#141412ff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 15,
    width: "80%",
    alignItems: "center",
  },
  footerText: {
    color: "#FFF8E1",
    fontSize: 16,
  },
  registerLink: {
    color: "#FFC107",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF8E1",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
