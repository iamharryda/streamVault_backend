import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function SearchButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("./SearchScreen")}
      style={{
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        paddingVertical: 12,
        marginBottom: 20,
        width: "75%",
        backgroundColor: "#0d282f",
        gap: 20,
        marginTop: 20,
      }}
    >
      <Ionicons
        name="search"
        size={20}
        color="#e6e8e9"
        style={{ marginHorizontal: 10 }}
      />
      <Text style={{ color: "#e6e8e9", marginLeft: 10 }}>Search</Text>
    </TouchableOpacity>
  );
}
