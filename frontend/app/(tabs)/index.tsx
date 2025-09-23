import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "dotenv/config";

export default function HomePage() {
  return (
    <SafeAreaView>
      <Text>Welcome to the Movie App</Text>
    </SafeAreaView>
  );
}
