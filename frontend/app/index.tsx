import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="./pages/Auth/Login">Login</Link>
      <Link href="/pages/Auth/Register">Register</Link>
    </View>
  );
}
